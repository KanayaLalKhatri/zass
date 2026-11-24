"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut, Plus, Pencil, Trash2, Star, Upload, X, Loader2, ImagePlus, ArrowLeft, Database } from "lucide-react";
import { ZassMark } from "@/components/Sections";
import { brands, formatPKR, laptops as samples, type Laptop } from "@/data/shop";
import { backendReady, supabase, fromRow, toRow, uploadImage, deleteImage } from "@/lib/backend";

const blank: Laptop = {
  name: "",
  brand: "Apple",
  condition: "New",
  price: 0,
  cpu: "",
  ram: "",
  storage: "",
  display: "",
  gpu: "",
  highlights: [],
  warranty: "",
  featured: false,
  sold: false,
  images: [],
};

const input = "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
const btn = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl">{children}</div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
    setBusy(false);
  };
  return (
    <Shell>
      <form onSubmit={submit} className="mx-auto mt-16 max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <ZassMark size={44} />
          <div>
            <p className="text-xl font-extrabold">Zass Admin</p>
            <p className="text-xs text-muted">Manage laptops & photos</p>
          </div>
        </div>
        <label className="text-xs text-muted">Email</label>
        <input className={`${input} mb-3 mt-1`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        <label className="text-xs text-muted">Password</label>
        <input className={`${input} mb-4 mt-1`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        {err && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}
        <button disabled={busy} className={`${btn} w-full bg-accent text-white hover:bg-accent-2`}>
          {busy && <Loader2 size={16} className="animate-spin" />} Sign in
        </button>
        <a href="../" className="mt-4 block text-center text-xs text-muted hover:text-accent">← Back to website</a>
      </form>
    </Shell>
  );
}

function Editor({ value, onClose, onSaved }: { value: Laptop; onClose: () => void; onSaved: () => void }) {
  const [l, setL] = useState<Laptop>(value);
  const [highlights, setHighlights] = useState((value.highlights ?? []).join("\n"));
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const set = <K extends keyof Laptop>(k: K, v: Laptop[K]) => setL((p) => ({ ...p, [k]: v }));

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setErr("");
    setUploading((n) => n + files.length);
    for (const f of Array.from(files)) {
      try {
        const url = await uploadImage(f);
        setL((p) => ({ ...p, images: [...(p.images ?? []), url] }));
      } catch (e) {
        setErr(`Upload failed: ${(e as Error).message}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
  };

  const removeImage = async (url: string) => {
    setL((p) => ({ ...p, images: (p.images ?? []).filter((u) => u !== url) }));
    if (!(value.images ?? []).includes(url)) await deleteImage(url);
  };

  const makeCover = (url: string) => setL((p) => ({ ...p, images: [url, ...(p.images ?? []).filter((u) => u !== url)] }));

  const save = async () => {
    if (!l.name.trim() || !l.price) {
      setErr("Name and price are required.");
      return;
    }
    setSaving(true);
    setErr("");
    const row = toRow({ ...l, highlights: highlights.split("\n").map((h) => h.trim()).filter(Boolean) });
    const res = l.id ? await supabase!.from("laptops").update(row).eq("id", l.id) : await supabase!.from("laptops").insert(row);
    setSaving(false);
    if (res.error) return setErr(res.error.message);
    const removed = (value.images ?? []).filter((u) => !(l.images ?? []).includes(u));
    await Promise.all(removed.map(deleteImage));
    onSaved();
  };

  const field = (label: string, k: keyof Laptop, placeholder = "", type = "text") => (
    <label className="block">
      <span className="text-xs text-muted">{label}</span>
      <input
        className={`${input} mt-1`}
        type={type}
        placeholder={placeholder}
        value={(l[k] as string | number | undefined) ?? ""}
        onChange={(e) => set(k, (type === "number" ? (e.target.value === "" ? undefined : Number(e.target.value)) : e.target.value) as never)}
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <div className="my-6 w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">{l.id ? "Edit laptop" : "Add laptop"}</h2>
          <button onClick={onClose} className="rounded-full border border-border p-1.5 text-muted hover:text-accent"><X size={18} /></button>
        </div>

        <div className="mb-5">
          <span className="text-xs text-muted">Photos (auto-compressed — first one is the cover)</span>
          <div className="mt-2 flex flex-wrap gap-3">
            {(l.images ?? []).map((u, i) => (
              <div key={u} className="group relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u} alt="" className="h-full w-full object-cover" />
                {i === 0 && <span className="absolute left-1 top-1 rounded bg-accent px-1.5 text-[10px] font-bold text-white">Cover</span>}
                <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {i !== 0 ? <button onClick={() => makeCover(u)} title="Make cover" className="text-white"><Star size={14} /></button> : <span />}
                  <button onClick={() => removeImage(u)} title="Remove" className="text-white"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {Array.from({ length: uploading }).map((_, i) => (
              <div key={i} className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-border bg-white">
                <Loader2 className="animate-spin text-accent" />
              </div>
            ))}
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-accent/60 bg-white text-xs text-accent hover:bg-accent/5">
              <ImagePlus size={22} /> Add
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            </label>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {field("Laptop name *", "name", "e.g. MacBook Air 13\" M3")}
          <label className="block">
            <span className="text-xs text-muted">Brand</span>
            <input className={`${input} mt-1`} list="brand-list" value={l.brand} onChange={(e) => set("brand", e.target.value)} />
            <datalist id="brand-list">{brands.map((b) => <option key={b} value={b} />)}</datalist>
          </label>
          <label className="block">
            <span className="text-xs text-muted">Condition</span>
            <select className={`${input} mt-1`} value={l.condition} onChange={(e) => set("condition", e.target.value as Laptop["condition"])}>
              <option>New</option>
              <option>Used</option>
            </select>
          </label>
          {field("Warranty", "warranty", "e.g. 1 month shop warranty")}
          {field("Price (Rs) *", "price", "e.g. 139000", "number")}
          {field("Old price (Rs, optional — shown struck through)", "oldPrice", "", "number")}
          {field("Processor", "cpu", "e.g. Intel Core i5 (11th Gen)")}
          {field("RAM", "ram", "e.g. 16 GB")}
          {field("Storage", "storage", "e.g. 512 GB SSD")}
          {field("Display", "display", "e.g. 14\" FHD")}
          {field("Graphics (optional)", "gpu", "e.g. NVIDIA RTX 3050")}
          <div className="flex items-end gap-6 pb-2">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(l.featured)} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-[#e8742a]" /> Featured (hero)</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(l.sold)} onChange={(e) => set("sold", e.target.checked)} className="h-4 w-4 accent-[#e8742a]" /> Sold</label>
          </div>
        </div>
        <label className="mt-4 block">
          <span className="text-xs text-muted">Highlights (one per line)</span>
          <textarea className={`${input} mt-1 h-24`} value={highlights} onChange={(e) => setHighlights(e.target.value)} placeholder={"Battery health 87%\nBacklit keyboard"} />
        </label>

        {err && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className={`${btn} border border-border bg-white`}>Cancel</button>
          <button onClick={save} disabled={saving || uploading > 0} className={`${btn} bg-accent text-white hover:bg-accent-2`}>
            {(saving || uploading > 0) && <Loader2 size={16} className="animate-spin" />} {uploading > 0 ? "Uploading…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Laptop | null>(null);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase!.from("laptops").select("*").order("created_at", { ascending: false });
    if (error) setMsg(error.message);
    else setRows((data ?? []).map(fromRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patch = async (l: Laptop, change: Partial<Laptop>) => {
    const { error } = await supabase!.from("laptops").update(toRow({ ...l, ...change })).eq("id", l.id!);
    if (error) setMsg(error.message);
    else setRows((rs) => rs.map((r) => (r.id === l.id ? { ...r, ...change } : r)));
  };

  const remove = async (l: Laptop) => {
    if (!confirm(`Delete "${l.name}"? This also deletes its photos.`)) return;
    const { error } = await supabase!.from("laptops").delete().eq("id", l.id!);
    if (error) return setMsg(error.message);
    await Promise.all((l.images ?? []).map(deleteImage));
    setRows((rs) => rs.filter((r) => r.id !== l.id));
  };

  const importSamples = async () => {
    if (!confirm("Add the 12 sample laptops to the database? You can edit or delete them afterwards.")) return;
    const { error } = await supabase!.from("laptops").insert(samples.map(toRow));
    if (error) setMsg(error.message);
    load();
  };

  return (
    <Shell>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow">
        <div className="flex items-center gap-3">
          <ZassMark size={40} />
          <div>
            <p className="text-lg font-extrabold">Zass Admin</p>
            <p className="text-xs text-muted">{session.user.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="../" className={`${btn} border border-border bg-white`}><ArrowLeft size={16} /> Website</a>
          <button onClick={() => setEditing({ ...blank })} className={`${btn} bg-accent text-white hover:bg-accent-2`}><Plus size={16} /> Add laptop</button>
          <button onClick={() => supabase!.auth.signOut()} className={`${btn} border border-border bg-white`}><LogOut size={16} /> Sign out</button>
        </div>
      </header>

      {msg && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{msg}</p>}

      <div className="rounded-2xl border border-border bg-card shadow">
        <div className="flex items-center justify-between border-b border-border px-5 py-3 text-sm">
          <span className="font-semibold">{rows.length} laptops</span>
          <span className="text-xs text-muted">{rows.filter((r) => r.sold).length} sold · {rows.filter((r) => r.featured).length} featured</span>
        </div>
        {loading ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-accent" /></div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-muted">No laptops yet.</p>
            <div className="mt-4 flex justify-center gap-3">
              <button onClick={() => setEditing({ ...blank })} className={`${btn} bg-accent text-white`}><Upload size={16} /> Add the first laptop</button>
              <button onClick={importSamples} className={`${btn} border border-border bg-white`}><Database size={16} /> Import 12 sample laptops</button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center gap-4 px-5 py-3">
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[#2f2c29]">
                  {l.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.images[0]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-[10px] text-white/60">No photo</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{l.name}</p>
                  <p className="text-xs text-muted">
                    {l.brand} · {l.condition} · <span className="font-semibold text-accent-2">{formatPKR(l.price)}</span> · {l.images?.length ?? 0} photos
                  </p>
                </div>
                <button onClick={() => patch(l, { featured: !l.featured })} title="Featured" className={`rounded-full border px-3 py-1 text-xs ${l.featured ? "border-accent bg-accent text-white" : "border-border"}`}>
                  <Star size={12} className="inline" /> Featured
                </button>
                <button onClick={() => patch(l, { sold: !l.sold })} className={`rounded-full border px-3 py-1 text-xs ${l.sold ? "border-red-600 bg-red-600 text-white" : "border-border"}`}>
                  {l.sold ? "Sold" : "In stock"}
                </button>
                <button onClick={() => setEditing(l)} title="Edit" className="rounded-lg border border-border p-2 hover:text-accent"><Pencil size={15} /></button>
                <button onClick={() => remove(l)} title="Delete" className="rounded-lg border border-border p-2 hover:text-red-600"><Trash2 size={15} /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing && (
        <Editor
          value={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </Shell>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!backendReady)
    return (
      <Shell>
        <div className="mx-auto mt-16 max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <ZassMark size={48} />
          <p className="mt-4 text-lg font-bold">Admin not connected yet</p>
          <p className="mt-2 text-sm text-muted">The Supabase project URL and anon key still need to be added to the website build.</p>
        </div>
      </Shell>
    );
  if (!ready) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-accent" /></div>;
  return session ? <Dashboard session={session} /> : <Login />;
}
