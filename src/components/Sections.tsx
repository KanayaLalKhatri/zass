"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Wallet, Wrench, Phone, Mail, MapPin, Clock, type LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import LaptopArt from "./LaptopArt";
import { shop, brands, laptops, reasons, brandColors, formatPKR } from "@/data/shop";

const wa = `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(shop.whatsappMessage)}`;

export function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 text-lg font-extrabold">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-lg text-background">
        Z
      </span>
      <span>
        {shop.name}
        <span className="ml-1.5 hidden font-mono text-[11px] font-normal text-muted sm:inline">by {shop.owner}</span>
      </span>
    </a>
  );
}

const links = [
  { href: "#laptops", label: "Laptops" },
  { href: "#brands", label: "Brands" },
  { href: "#why", label: "Why Zazz" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : ""}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-muted hover:text-accent">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-sm font-semibold text-white">
          <FaWhatsapp size={16} /> <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </nav>
    </header>
  );
}

export function Hero() {
  const picks = (["Apple", "Dell", "ASUS"] as const).map((b) => laptops.find((l) => l.featured && l.brand === b)!);
  return (
    <section className="glow-bg relative flex min-h-screen items-center px-6 pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-5 inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted">
            Apple · HP · Dell · Lenovo · ASUS · Acer
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Every <span className="gradient-text">laptop</span>.<br />
            <span className="gradient-text">New</span> & <span className="gradient-text">used</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{shop.intro}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#laptops" className="rounded-md bg-accent px-7 py-3 font-semibold text-background">Browse Laptops</a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-7 py-3 hover:border-accent hover:text-accent">
              <FaWhatsapp size={18} /> Ask for a price
            </a>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-8">
            {shop.stats.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold gradient-text sm:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative h-[380px] sm:h-[440px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(124,131,255,0.35),transparent_65%)] blur-3xl" />
          {picks.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{ opacity: { delay: 0.3 + i * 0.15 }, y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i } }}
              className={`absolute w-[56%] ${["left-0 top-0 z-10 -rotate-6", "right-0 top-[22%] z-20 rotate-3", "left-[14%] bottom-0 z-30"][i]}`}
            >
              <div className="rounded-2xl border border-border bg-card/80 p-3 shadow-2xl backdrop-blur">
                <LaptopArt laptop={l} className="w-full" />
                <div className="flex items-center justify-between px-1 pt-1 text-xs">
                  <span className="font-semibold text-foreground">{l.name}</span>
                  <span className="font-mono" style={{ color: brandColors[l.brand][0] }}>{formatPKR(l.price)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Brands() {
  return (
    <section id="brands" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">All major brands under one roof</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {brands.map((b) => (
            <span key={b} className="text-2xl font-extrabold tracking-tight opacity-80 transition-opacity hover:opacity-100" style={{ color: brandColors[b][0] }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const icons: Record<string, LucideIcon> = { BadgeCheck, ShieldCheck, Wallet, Wrench };

export function WhyUs() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="03" title="Why Zazz" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => {
          const Icon = icons[r.icon];
          return (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="project-card h-full rounded-2xl border border-border bg-card p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={24} />
                </span>
                <h3 className="font-bold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="01" title={`About ${shop.name}`} />
      <Reveal>
        <div className="grid gap-6 leading-relaxed text-muted md:grid-cols-2">
          {shop.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function Contact() {
  const rows = [
    { icon: Phone, label: "Call", value: shop.phone, href: `tel:${shop.phone.replace(/\s/g, "")}` },
    { icon: FaWhatsapp, label: "WhatsApp", value: shop.phone, href: wa },
    { icon: Mail, label: "Email", value: shop.email, href: `mailto:${shop.email}` },
    { icon: MapPin, label: "Visit", value: shop.address },
    { icon: Clock, label: "Hours", value: shop.hours },
  ];
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading index="04" title="Contact" />
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <h3 className="text-3xl font-bold">
            Looking for a laptop? <span className="gradient-text">Let&apos;s find yours.</span>
          </h3>
          <p className="mt-4 text-muted">
            Tell us your budget and what you&apos;ll use it for — study, office, design, coding or gaming — and {shop.owner} will suggest the right machine, new or used.
          </p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-7 py-3 font-semibold text-white">
            <FaWhatsapp size={20} /> Chat on WhatsApp
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{shop.owner}</p>
            <div className="mt-4 space-y-4">
              {rows.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={17} />
                  </span>
                  <div>
                    <p className="text-xs text-muted">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-foreground hover:text-accent">{value}</a>
                    ) : (
                      <p className="text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <Logo />
        <p className="text-center">
          © {new Date().getFullYear()} {shop.name} · {shop.owner}. All rights reserved.
        </p>
        <p className="font-mono text-xs">{shop.tagline}</p>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
