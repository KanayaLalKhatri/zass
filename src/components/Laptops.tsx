"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, MemoryStick, HardDrive, Monitor, X, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import LaptopArt from "./LaptopArt";
import { laptops, brands, brandColors, formatPKR, shop, type Laptop } from "@/data/shop";

const conditions = ["All", "New", "Used"] as const;

const waLink = (l: Laptop) =>
  `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(`Hi Zass! Is the ${l.name} (${l.condition}, ${formatPKR(l.price)}) available?`)}`;

function Spec({ icon: Icon, text }: { icon: typeof Cpu; text: string }) {
  return (
    <span className="flex items-center gap-2 text-xs text-muted">
      <Icon size={14} className="shrink-0 text-accent" />
      {text}
    </span>
  );
}

export default function Laptops() {
  const [cond, setCond] = useState<(typeof conditions)[number]>("All");
  const [brand, setBrand] = useState<string>("All");
  const [active, setActive] = useState<Laptop | null>(null);

  const list = laptops.filter(
    (l) => (cond === "All" || l.condition === cond) && (brand === "All" || l.brand === brand)
  );

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition-colors ${
      on ? "border-accent bg-accent text-white" : "border-border bg-card/85 text-foreground hover:border-accent hover:text-accent"
    }`;

  return (
    <section id="laptops" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="02" title="Laptops in Stock" />

      <div className="mb-4 flex flex-wrap gap-2">
        {conditions.map((c) => (
          <button key={c} className={chip(cond === c)} onClick={() => setCond(c)}>
            {c === "All" ? "New & Used" : c}
          </button>
        ))}
      </div>
      <div className="mb-10 flex flex-wrap gap-2">
        {["All", ...brands].map((b) => (
          <button key={b} className={chip(brand === b)} onClick={() => setBrand(b)}>
            {b === "All" ? "All brands" : b}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((l) => {
            const [from] = brandColors[l.brand];
            return (
              <motion.button
                layout
                key={l.name}
                type="button"
                onClick={() => setActive(l)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="project-card group flex flex-col rounded-2xl border border-border bg-card text-left"
              >
                <div
                  className="relative flex h-48 items-center justify-center overflow-hidden rounded-t-2xl px-6"
                  style={{ background: `radial-gradient(120% 100% at 50% 0%, ${from}33, transparent 65%), #2f2c29` }}
                >
                  <span
                    className={`absolute left-4 top-4 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold ${
                      l.condition === "New" ? "bg-accent text-white" : "bg-amber-400 text-black"
                    }`}
                  >
                    {l.condition}
                  </span>
                  <LaptopArt laptop={l} className="w-full max-w-[240px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs" style={{ color: from }}>{l.brand}</p>
                  <h3 className="mt-1 text-lg font-bold text-foreground">{l.name}</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Spec icon={Cpu} text={l.cpu.split("(")[0].trim()} />
                    <Spec icon={MemoryStick} text={l.ram} />
                    <Spec icon={HardDrive} text={l.storage} />
                    <Spec icon={Monitor} text={l.display.split(" ")[0]} />
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <div>
                      {l.oldPrice && <p className="text-xs text-muted line-through">{formatPKR(l.oldPrice)}</p>}
                      <p className="text-xl font-extrabold gradient-text">{formatPKR(l.price)}</p>
                    </div>
                    <span className="font-mono text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Details →
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="py-10 text-center text-muted">No laptops match this filter right now — ask us on WhatsApp.</p>}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActive(null)} />
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
              >
                <X size={18} />
              </button>
              <div className="grid items-center gap-6 md:grid-cols-2">
                <div
                  className="flex items-center justify-center rounded-xl p-6"
                  style={{ background: `radial-gradient(110% 90% at 50% 0%, ${brandColors[active.brand][0]}33, transparent 65%), #2f2c29` }}
                >
                  <LaptopArt laptop={active} className="w-full" />
                </div>
                <div>
                  <p className="font-mono text-xs text-accent">{active.brand} · {active.condition}</p>
                  <h3 className="mt-1 text-2xl font-bold">{active.name}</h3>
                  {active.oldPrice && <p className="mt-2 text-sm text-muted line-through">{formatPKR(active.oldPrice)}</p>}
                  <p className="text-3xl font-extrabold gradient-text">{formatPKR(active.price)}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    {[["Processor", active.cpu], ["Memory", active.ram], ["Storage", active.storage], ["Display", active.display], ...(active.gpu ? [["Graphics", active.gpu]] : []), ["Warranty", active.warranty]].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-border pb-1.5">
                        <span className="text-muted">{k}</span>
                        <span className="text-right text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {active.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-muted">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" /> {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(active)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 font-semibold text-white"
                  >
                    <FaWhatsapp size={20} /> Ask on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
