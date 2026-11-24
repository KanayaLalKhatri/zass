// ─────────────────────────────────────────────────────────────
// Zass — all shop content. Edit here to update the website.
// Prices are in PKR and are SAMPLE values — update with real stock.
// ─────────────────────────────────────────────────────────────

export const shop = {
  name: "Zass",
  owner: "Jimmy Laptop Traders",
  tagline: "Every brand. New & used. Tested and trusted.",
  intro:
    "Zass by Jimmy Laptop Traders brings every major laptop brand under one roof — Apple MacBook, HP, Dell, Lenovo, ASUS and Acer. Brand-new sealed pieces and carefully tested used laptops, at honest prices, with warranty and after-sale support.",
  about: [
    "Jimmy Laptop Traders has been helping students, freelancers, professionals and businesses find the right laptop at the right price. Zass is our showroom for every budget — from fresh, box-packed machines to premium used laptops.",
    "Every used laptop goes through a full check — battery health, keyboard, screen, ports, charging and a clean OS install — before it reaches our shelves. Bulk orders for offices and institutes are welcome.",
  ],
  contactPerson: "Muhammad Ali Brohi",
  mobile: "0321-2021809",
  landline: "021-32270823",
  whatsapp: "923212021809",
  whatsappMessage: "Hi Zass! I'm interested in a laptop.",
  address: "GE-25-27, Ground Floor, Techno City Mall, Hasrat Mohani Road, Karachi-74000",
  stats: [
    { value: "6+", label: "Brands in stock" },
    { value: "New & Used", label: "Every budget" },
    { value: "Warranty", label: "Shop & brand warranty" },
    { value: "Tested", label: "Every used piece" },
  ],
};

export const brands = ["Apple", "HP", "Dell", "Lenovo", "ASUS", "Acer"] as const;
export type Brand = (typeof brands)[number];

export type Laptop = {
  name: string;
  brand: Brand;
  condition: "New" | "Used";
  price: number;
  oldPrice?: number;
  cpu: string;
  ram: string;
  storage: string;
  display: string;
  gpu?: string;
  highlights: string[];
  warranty: string;
  featured?: boolean;
};

export const laptops: Laptop[] = [
  {
    name: "MacBook Air 13\" M3",
    brand: "Apple",
    condition: "New",
    price: 329000,
    cpu: "Apple M3 (8-core CPU)",
    ram: "8 GB Unified",
    storage: "256 GB SSD",
    display: "13.6\" Liquid Retina",
    gpu: "8-core GPU",
    highlights: ["Up to 18 hrs battery", "Fanless & silent", "Touch ID, MagSafe"],
    warranty: "1 year Apple warranty",
    featured: true,
  },
  {
    name: "MacBook Pro 14\" M3 Pro",
    brand: "Apple",
    condition: "New",
    price: 589000,
    cpu: "Apple M3 Pro (11-core CPU)",
    ram: "18 GB Unified",
    storage: "512 GB SSD",
    display: "14.2\" Liquid Retina XDR",
    gpu: "14-core GPU",
    highlights: ["Pro-level video & dev work", "120Hz ProMotion", "HDMI + SD card"],
    warranty: "1 year Apple warranty",
    featured: true,
  },
  {
    name: "MacBook Pro 13\" (2020, Intel i5)",
    brand: "Apple",
    condition: "Used",
    price: 139000,
    oldPrice: 165000,
    cpu: "Intel Core i5 (10th Gen)",
    ram: "16 GB",
    storage: "512 GB SSD",
    display: "13.3\" Retina",
    highlights: ["Battery health 87%", "Touch Bar", "Box-like condition"],
    warranty: "1 month shop warranty",
  },
  {
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    condition: "New",
    price: 389000,
    cpu: "Intel Core i7-1360P",
    ram: "16 GB LPDDR5",
    storage: "512 GB SSD",
    display: "13.4\" 3.5K OLED Touch",
    highlights: ["Ultra-thin premium build", "Edge-to-edge keyboard", "Windows 11"],
    warranty: "1 year Dell warranty",
    featured: true,
  },
  {
    name: "Dell Latitude 7420",
    brand: "Dell",
    condition: "Used",
    price: 99000,
    oldPrice: 115000,
    cpu: "Intel Core i7 (11th Gen)",
    ram: "16 GB",
    storage: "256 GB SSD",
    display: "14\" FHD",
    highlights: ["Business-grade build", "Backlit keyboard", "Fingerprint reader"],
    warranty: "1 month shop warranty",
  },
  {
    name: "HP EliteBook 840 G8",
    brand: "HP",
    condition: "Used",
    price: 92000,
    oldPrice: 108000,
    cpu: "Intel Core i5 (11th Gen)",
    ram: "16 GB",
    storage: "512 GB SSD",
    display: "14\" FHD IPS",
    highlights: ["Aluminium chassis", "Great for office & study", "Battery 85%+"],
    warranty: "1 month shop warranty",
  },
  {
    name: "HP Pavilion 15",
    brand: "HP",
    condition: "New",
    price: 179000,
    cpu: "Intel Core i5-1335U",
    ram: "8 GB",
    storage: "512 GB SSD",
    display: "15.6\" FHD",
    highlights: ["Everyday all-rounder", "B&O speakers", "Fast charge"],
    warranty: "1 year HP warranty",
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "Lenovo",
    condition: "New",
    price: 449000,
    cpu: "Intel Core i7-1355U",
    ram: "16 GB",
    storage: "1 TB SSD",
    display: "14\" WUXGA",
    highlights: ["Just 1.12 kg", "Legendary keyboard", "MIL-SPEC tested"],
    warranty: "1 year Lenovo warranty",
    featured: true,
  },
  {
    name: "Lenovo ThinkPad T480",
    brand: "Lenovo",
    condition: "Used",
    price: 54000,
    oldPrice: 62000,
    cpu: "Intel Core i5 (8th Gen)",
    ram: "8 GB",
    storage: "256 GB SSD",
    display: "14\" FHD",
    highlights: ["Best value for students", "Dual battery", "Tested & cleaned"],
    warranty: "1 month shop warranty",
  },
  {
    name: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    condition: "New",
    price: 199000,
    cpu: "AMD Ryzen 7 7730U",
    ram: "16 GB",
    storage: "512 GB SSD",
    display: "15.6\" FHD IPS",
    highlights: ["Slim & light", "Long battery life", "Backlit keyboard"],
    warranty: "1 year Lenovo warranty",
  },
  {
    name: "ASUS ROG Zephyrus G14",
    brand: "ASUS",
    condition: "New",
    price: 469000,
    cpu: "AMD Ryzen 9 7940HS",
    ram: "16 GB DDR5",
    storage: "1 TB SSD",
    display: "14\" 2.5K 165Hz",
    gpu: "NVIDIA RTX 4060",
    highlights: ["Gaming & creator powerhouse", "165Hz display", "Compact 14\" body"],
    warranty: "1 year ASUS warranty",
    featured: true,
  },
  {
    name: "Acer Aspire 7",
    brand: "Acer",
    condition: "Used",
    price: 119000,
    oldPrice: 135000,
    cpu: "Intel Core i5 (12th Gen)",
    ram: "16 GB",
    storage: "512 GB SSD",
    display: "15.6\" FHD 144Hz",
    gpu: "NVIDIA RTX 3050",
    highlights: ["Budget gaming", "144Hz screen", "Upgradeable RAM"],
    warranty: "1 month shop warranty",
  },
];

export const reasons = [
  { icon: "BadgeCheck", title: "Tested before sale", text: "Battery, screen, keyboard, ports and charging checked on every used laptop." },
  { icon: "ShieldCheck", title: "Warranty", text: "Brand warranty on new laptops and shop warranty on used ones." },
  { icon: "Wallet", title: "Honest prices", text: "Fair market rates, exchange offers and best deals for bulk orders." },
  { icon: "Wrench", title: "After-sale support", text: "OS install, upgrades (RAM/SSD) and repairs at the shop." },
];

export const brandColors: Record<Brand, [string, string]> = {
  Apple: ["#6b7280", "#1f2937"],
  HP: ["#38bdf8", "#0369a1"],
  Dell: ["#3b82f6", "#1e3a8a"],
  Lenovo: ["#f87171", "#991b1b"],
  ASUS: ["#a78bfa", "#4c1d95"],
  Acer: ["#4ade80", "#166534"],
};

export const formatPKR = (n: number) => "Rs " + n.toLocaleString("en-PK");
