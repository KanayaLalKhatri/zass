import { useId } from "react";
import { brandColors, type Laptop } from "@/data/shop";

export default function LaptopArt({ laptop, className = "" }: { laptop: Laptop; className?: string }) {
  const [from, to] = brandColors[laptop.brand];
  const id = useId().replace(/[^a-z0-9]/gi, "");
  const silver = laptop.brand === "Apple";
  return (
    <svg viewBox="0 0 320 210" className={className} role="img" aria-label={laptop.name}>
      <defs>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={silver ? "#e5e7eb" : "#3a3f4b"} />
          <stop offset="1" stopColor={silver ? "#9ca3af" : "#1c1f27"} />
        </linearGradient>
        <radialGradient id={`g${id}`} cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="200" rx="140" ry="7" fill="#000" opacity="0.35" />
      <rect x="48" y="14" width="224" height="148" rx="10" fill={silver ? "#d1d5db" : "#20232b"} />
      <rect x="56" y="22" width="208" height="130" rx="4" fill={`url(#s${id})`} />
      <rect x="56" y="22" width="208" height="130" rx="4" fill={`url(#g${id})`} />
      <circle cx="160" cy="18" r="1.6" fill="#0b0b0f" opacity="0.6" />
      <text x="160" y="84" textAnchor="middle" fontSize="22" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">
        {laptop.brand}
      </text>
      <text x="160" y="106" textAnchor="middle" fontSize="10" fill="#fff" opacity="0.85" fontFamily="system-ui, sans-serif">
        {laptop.cpu.split("(")[0].trim()}
      </text>
      <path d="M20 166 H300 L288 186 Q286 190 280 190 H40 Q34 190 32 186 Z" fill={`url(#b${id})`} />
      <rect x="130" y="166" width="60" height="5" rx="2.5" fill="#000" opacity="0.25" />
    </svg>
  );
}
