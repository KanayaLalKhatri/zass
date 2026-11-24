"use client";

import { useEffect, useState } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { laptops as sampleLaptops, type Laptop } from "@/data/shop";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const backendReady = Boolean(url && key);
export const supabase: SupabaseClient | null = backendReady ? createClient(url, key) : null;
export const BUCKET = "laptops";

type Row = {
  id: string;
  name: string;
  brand: string;
  condition: "New" | "Used";
  price: number;
  old_price: number | null;
  cpu: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string | null;
  highlights: string[] | null;
  warranty: string;
  featured: boolean;
  sold: boolean;
  images: string[] | null;
};

export const fromRow = (r: Row): Laptop => ({
  id: r.id,
  name: r.name,
  brand: r.brand,
  condition: r.condition,
  price: r.price,
  oldPrice: r.old_price ?? undefined,
  cpu: r.cpu,
  ram: r.ram,
  storage: r.storage,
  display: r.display,
  gpu: r.gpu ?? undefined,
  highlights: r.highlights ?? [],
  warranty: r.warranty,
  featured: r.featured,
  sold: r.sold,
  images: r.images ?? [],
});

export const toRow = (l: Laptop) => ({
  name: l.name,
  brand: l.brand,
  condition: l.condition,
  price: l.price,
  old_price: l.oldPrice ?? null,
  cpu: l.cpu,
  ram: l.ram,
  storage: l.storage,
  display: l.display,
  gpu: l.gpu || null,
  highlights: l.highlights,
  warranty: l.warranty,
  featured: Boolean(l.featured),
  sold: Boolean(l.sold),
  images: l.images ?? [],
});

export async function fetchLaptops(): Promise<Laptop[]> {
  if (!supabase) return sampleLaptops;
  const { data, error } = await supabase.from("laptops").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(fromRow);
}

export function useLaptops() {
  const [list, setList] = useState<Laptop[]>(backendReady ? [] : sampleLaptops);
  const [loading, setLoading] = useState(backendReady);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!backendReady) return;
    fetchLaptops()
      .then(setList)
      .catch((e) => setError(e.message ?? String(e)))
      .finally(() => setLoading(false));
  }, []);
  return { list, loading, error };
}

export async function compressImage(file: File, maxSide = 1600, quality = 0.8): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
  const encode = (type: string) => new Promise<Blob | null>((res) => canvas.toBlob(res, type, quality));
  const webp = await encode("image/webp");
  if (webp && webp.type === "image/webp") return webp;
  return (await encode("image/jpeg"))!;
}

export async function uploadImage(file: File): Promise<string> {
  if (!supabase) throw new Error("Backend not configured");
  const blob = await compressImage(file);
  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: blob.type, cacheControl: "31536000" });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function deleteImage(publicUrl: string) {
  if (!supabase) return;
  const marker = `/object/public/${BUCKET}/`;
  const i = publicUrl.indexOf(marker);
  if (i >= 0) await supabase.storage.from(BUCKET).remove([publicUrl.slice(i + marker.length)]);
}
