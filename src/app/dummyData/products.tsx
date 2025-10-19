export interface Badge {
  type: "sale" | "bestseller" | "new" | string;
  text: string;
}

export interface Product {
  id: number;
  name: string;
  thumbnail: string;
  slug: string;
  hover?: string;
  title: string;
  price: string;
  old_price?: string | null;
  colors?: string[];
  sizes?: string[];
  category: string;
  badges?: Badge[];
  image?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "رداء قطني مطرز بالأكمام الطويلة",
    thumbnail: "assets/images/cotton/cotton-pro-1.jpg",
    slug: "cotton-embroidered-robe",
    image: "assets/images/cotton/cotton-pro-1.jpg",
    hover: "assets/images/cotton/cotton-pro-1-flip.jpg",
    title: "رداء قطني مطرز بالأكمام الطويلة",
    price: "720.00",
    old_price: "850.00",
    colors: ["#285c7c"],
    sizes: ["SX", "S", "M", "L", "XL"],
    category: "أرواب ومناشف",
    badges: [{ type: "sale", text: "تخفيض" }],
  },
  {
    id: 2,
    name: "منشفة قطنية فاخرة بالشعار",
    thumbnail: "assets/images/cotton/cotton-pro-2.jpg",
    slug: "luxury-cotton-towel",
    image: "assets/images/cotton/cotton-pro-2.jpg",
    title: "منشفة قطنية فاخرة بالشعار",
    price: "150.00",
    old_price: null,
    colors: ["#87abc3", "#5e5f63", "#af9097"],
    sizes: ["M", "L"],
    category: "أرواب ومناشف",
    badges: [{ type: "bestseller", text: "الأكثر مبيعًا" }],
  },
  {
    id: 3,
    name: "لباد صوف طبيعي عالي الجودة",
    thumbnail: "assets/images/cotton/cotton-pro-3.jpg",
    slug: "natural-wool-rug",
    image: "assets/images/cotton/cotton-pro-3.jpg",
    title: "لباد صوف طبيعي عالي الجودة",
    price: "450.00",
    colors: ["#4981c4"],
    sizes: ["40", "41", "42", "43"],
    category: "لباد",
    badges: [{ type: "new", text: "جديد" }],
  },
  {
    id: 4,
    name: "لباد شتوي مقاوم للماء",
    thumbnail: "assets/images/cotton/cotton-pro-4.jpg",
    slug: "winter-waterproof-rug",
    image: "assets/images/cotton/cotton-pro-4.jpg",
    hover: "assets/images/cotton/cotton-pro-4-flip.jpg",
    title: "لباد شتوي مقاوم للماء",
    price: "1,200.00",
    colors: ["#87abc3", "#5e5f63", "#af9097"],
    sizes: ["M", "L"],
    category: "لباد",
    badges: [{ type: "sale", text: "تخفيض" }],
  },
  {
    id: 5,
    name: "مخدة طبية للرقبة بالذاكرة الرغوية",
    thumbnail: "assets/images/cotton/cotton-pro-5.jpg",
    slug: "medical-neck-pillow-memory-foam",
    image: "assets/images/cotton/cotton-pro-5.jpg",
    hover: "assets/images/cotton/cotton-pro-5-flip.jpg",
    title: "مخدة طبية للرقبة بالذاكرة الرغوية",
    price: "200.00",
    old_price: "300.00",
    colors: ["#87abc3", "#5e5f63", "#af9097"],
    sizes: ["M", "L"],
    category: "مخدات",
  },
  {
    id: 6,
    name: "مخدة قطنية ناعمة للنوم",
    thumbnail: "assets/images/cotton/cotton-pro-6.jpg",
    slug: "soft-cotton-sleep-pillow",
    image: "assets/images/cotton/cotton-pro-6.jpg",
    title: "مخدة قطنية ناعمة للنوم",
    price: "100.00",
    colors: ["white", "black"],
    sizes: ["SX", "S", "M", "L", "XL"],
    category: "مخدات",
  },
  {
    id: 7,
    name: "واقي مرتبة مقاوم للماء والبقع",
    thumbnail: "assets/images/cotton/cotton-pro-7.jpg",
    slug: "waterproof-stain-resistant-mattress-protector",
    image: "assets/images/cotton/cotton-pro-7.jpg",
    title: "واقي مرتبة مقاوم للماء والبقع",
    price: "890.00",
    old_price: "1200.00",
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "واقي مراتب",
    badges: [{ type: "sale", text: "تخفيض" }],
  },
  {
    id: 8,
    name: "رداء قطني مطرز بالأكمام الطويلة",
    thumbnail: "assets/images/cotton/cotton-pro-1.jpg",
    slug: "embroidered-cotton-robe-long-sleeves",
    image: "assets/images/cotton/cotton-pro-1.jpg",
    hover: "assets/images/cotton/cotton-pro-1-flip.jpg",
    title: "رداء قطني مطرز بالأكمام الطويلة",
    price: "720.00",
    old_price: "850.00",
    colors: ["#285c7c"],
    sizes: ["SX", "S", "M", "L", "XL"],
    category: "أرواب ومناشف",
    badges: [{ type: "sale", text: "تخفيض" }],
  },
  {
    id: 9,
    name: "منشفة قطنية فاخرة بالشعار",
    thumbnail: "assets/images/cotton/cotton-pro-2.jpg",
    slug: "luxury-cotton-towel-with-logo",
    image: "assets/images/cotton/cotton-pro-2.jpg",
    title: "منشفة قطنية فاخرة بالشعار",
    price: "150.00",
    colors: ["#87abc3", "#5e5f63", "#af9097"],
    sizes: ["M", "L"],
    category: "أرواب ومناشف",
    badges: [{ type: "bestseller", text: "الأكثر مبيعًا" }],
  },
  {
    id: 10,
    name: "لباد صوف طبيعي عالي الجودة",
    thumbnail: "assets/images/cotton/cotton-pro-3.jpg",
    slug: "high-quality-natural-wool-rug",
    image: "assets/images/cotton/cotton-pro-3.jpg",
    title: "لباد صوف طبيعي عالي الجودة",
    price: "450.00",
    colors: ["#4981c4"],
    sizes: ["40", "41", "42", "43"],
    category: "لباد",
    badges: [{ type: "new", text: "جديد" }],
  },
];
