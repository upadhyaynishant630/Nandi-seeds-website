/* =========================================================
   Nandi Seeds - SEED CATALOGUE

   Each entry powers both the Products grid and the
   /products/:slug detail page, so keep the slugs unique.
   Product images live in: public/images/products/<slug>.jpg
========================================================= */

/* =========================================================
   CATEGORIES (used by the Products page filter)
========================================================= */

export const SEED_CATEGORIES = [
  "All",
  "Vegetables",
  "Cereals",
  "Pulses",
  "Oilseeds",
  "Fodder",
];

/* =========================================================
   PRODUCTS
========================================================= */

export const PRODUCTS = [
  {
    slug: "tomato-hybrid-nandi-204",
    name: "Nandi Gold 204",
    crop: "Tomato",
    category: "Vegetables",
    badge: "Bestseller",
    short:
      "Firm, deep-red fruits with strong holding ability. Built for long-distance transport markets.",
    description:
      "Nandi Gold 204 is a determinate hybrid tomato developed for open-field cultivation across central and western India. Fruits are square-round, uniformly deep red at breaker stage and hold firmness for over a week after harvest, which makes the variety ideal for distant mandis and processing buyers.",
    highlights: [
      "Square-round fruits averaging 90-110 g",
      "Firmness retained 7+ days after harvest",
      "Good fruit set under high summer temperatures",
      "Tolerant to early blight and bacterial wilt",
    ],
    specs: {
      germination: "90% minimum",
      maturity: "65 - 70 days",
      season: "Kharif, Rabi & Summer",
      spacing: "60 x 45 cm",
      packSizes: "10 g, 50 g, 100 g",
      treatment: "Thiram + Imidacloprid",
    },
  },
  {
    slug: "chilli-hybrid-nandi-tej",
    name: "Nandi Tej",
    crop: "Chilli",
    category: "Vegetables",
    badge: "High Yield",
    short:
      "Pendant, dark green to deep red pods with excellent pungency and colour retention.",
    description:
      "Nandi Tej is a semi-spreading chilli hybrid suited to rainfed and irrigated conditions. Pods are long, slender and pendent, turning attractive deep red on drying with strong oleoresin colour value, making it a preferred choice for dry chilli traders.",
    highlights: [
      "Pods 9-11 cm long with high pungency",
      "Excellent red colour and capsaicin value",
      "Multiple pickings over a long harvest window",
      "Tolerant to thrips and powdery mildew",
    ],
    specs: {
      germination: "85% minimum",
      maturity: "70 - 75 days",
      season: "Kharif & Rabi",
      spacing: "60 x 45 cm",
      packSizes: "10 g, 100 g",
      treatment: "Captan + Imidacloprid",
    },
  },
  {
    slug: "okra-hybrid-nandi-shakti",
    name: "Nandi Shakti",
    crop: "Okra",
    category: "Vegetables",
    badge: "New",
    short:
      "Five-ridge, dark green pods with tender tips and a vigorous, YVMV-tolerant plant.",
    description:
      "Nandi Shakti is a high-yielding okra hybrid bred for continuous harvest. The plant is medium tall with good branching, and pods remain tender for longer, reducing the frequency of picking needed to keep grade quality.",
    highlights: [
      "Dark green, 5-ridged pods of 12-14 cm",
      "Tolerant to Yellow Vein Mosaic Virus",
      "Tender pods stay marketable longer",
      "First harvest in about 45 days",
    ],
    specs: {
      germination: "85% minimum",
      maturity: "45 - 50 days",
      season: "Kharif & Summer",
      spacing: "45 x 30 cm",
      packSizes: "100 g, 250 g, 500 g",
      treatment: "Thiram + Imidacloprid",
    },
  },
  {
    slug: "cucumber-hybrid-nandi-green",
    name: "Nandi Green",
    crop: "Cucumber",
    category: "Vegetables",
    badge: null,
    short:
      "Smooth, straight, dark green fruits with a crisp core and good shipping strength.",
    description:
      "Nandi Green is a parthenocarpic-style hybrid cucumber for protected and open cultivation. Fruits develop uniformly with a minimal seed cavity, which keeps them crisp and attractive in premium retail packing.",
    highlights: [
      "Fruits 18-20 cm, uniformly straight",
      "Thin skin with no bitterness",
      "Strong vine vigour and early bearing",
      "Tolerant to downy mildew",
    ],
    specs: {
      germination: "90% minimum",
      maturity: "40 - 45 days",
      season: "All year (protected)",
      spacing: "60 x 45 cm",
      packSizes: "25 g, 50 g, 100 g",
      treatment: "Thiram",
    },
  },
  {
    slug: "maize-hybrid-nandi-555",
    name: "Nandi 555",
    crop: "Maize",
    category: "Cereals",
    badge: "Farmer Choice",
    short:
      "Single-cross maize with bold orange flint grains and dependable standability.",
    description:
      "Nandi 555 is a medium-duration single-cross hybrid for rainfed and assured-irrigation maize belts. It delivers bold orange flint grains with strong test weight, and its sturdy stalk keeps the crop standing through late-season winds.",
    highlights: [
      "Bold orange flint grains, high test weight",
      "Strong stalk and root lodging tolerance",
      "Ideal for grain and fodder dual use",
      "Consistent across rainfed and irrigated plots",
    ],
    specs: {
      germination: "90% minimum",
      maturity: "95 - 105 days",
      season: "Kharif & Rabi",
      spacing: "60 x 20 cm",
      packSizes: "1 kg, 4 kg, 10 kg",
      treatment: "Thiram + Carbendazim",
    },
  },
  {
    slug: "wheat-nandi-shresth",
    name: "Nandi Shresth",
    crop: "Wheat",
    category: "Cereals",
    badge: null,
    short:
      "High-protein, amber-grained wheat with strong chapati-quality gluten.",
    description:
      "Nandi Shresth is a timely-sown bread wheat suited to well-drained loams and clay loams. Grains are amber and lustrous with high protein content, giving good chapati volume and a bright flour colour for local mills.",
    highlights: [
      "High protein with strong gluten strength",
      "Lustrous, well-filled amber grains",
      "Tolerant to yellow rust and leaf blight",
      "Responds well to balanced nitrogen splits",
    ],
    specs: {
      germination: "90% minimum",
      maturity: "125 - 135 days",
      season: "Rabi",
      spacing: "20 cm rows",
      packSizes: "5 kg, 10 kg, 40 kg",
      treatment: "Vitavax + Imidacloprid",
    },
  },
  {
    slug: "paddy-hybrid-nandi-dhan",
    name: "Nandi Dhan Plus",
    crop: "Paddy",
    category: "Cereals",
    badge: "High Yield",
    short:
      "Semi-dwarf paddy hybrid with high tillering and fine, non-shattering grains.",
    description:
      "Nandi Dhan Plus is a medium-duration paddy hybrid for transplanted irrigated ecology. It tillers profusely, produces fine slender grains and resists shattering, so grain loss at combine harvest stays low.",
    highlights: [
      "Profuse tillering with 25+ effective panicles",
      "Fine slender non-shattering grains",
      "Tolerant to bacterial leaf blight",
      "Good milling recovery",
    ],
    specs: {
      germination: "85% minimum",
      maturity: "125 - 135 days",
      season: "Kharif",
      spacing: "20 x 15 cm",
      packSizes: "1 kg, 3 kg, 6 kg",
      treatment: "Carbendazim + Streptocycline",
    },
  },
  {
    slug: "gram-nandi-veer",
    name: "Nandi Veer",
    crop: "Chickpea",
    category: "Pulses",
    badge: null,
    short:
      "Bold-seeded desi chickpea with strong wilt tolerance for rainfed Rabi sowing.",
    description:
      "Nandi Veer is a desi chickpea selected for rainfed Rabi conditions in black cotton soils. Seeds are bold and brown with good dhal recovery, and the variety shows dependable tolerance to fusarium wilt.",
    highlights: [
      "Bold brown seeds, good dhal recovery",
      "Field tolerance to fusarium wilt",
      "Suited to rainfed black soils",
      "Semi-spreading canopy suppresses weeds",
    ],
    specs: {
      germination: "90% minimum",
      maturity: "100 - 110 days",
      season: "Rabi",
      spacing: "30 x 10 cm",
      packSizes: "2 kg, 4 kg, 10 kg",
      treatment: "Thiram + Trichoderma",
    },
  },
  {
    slug: "soybean-nandi-sona",
    name: "Nandi Sona",
    crop: "Soybean",
    category: "Oilseeds",
    badge: "Bestseller",
    short:
      "Determinate soybean with high oil content and clean, uniform pod maturity.",
    description:
      "Nandi Sona is a determinate soybean suited to kharif cultivation in central India. It sets pods on the main stem and branches almost simultaneously, giving a uniform harvest window and lower green-seed content at threshing.",
    highlights: [
      "Oil content above 19%",
      "Uniform pod maturity, low green seed",
      "Good tolerance to soybean mosaic virus",
      "Suited to medium to heavy soils",
    ],
    specs: {
      germination: "85% minimum",
      maturity: "95 - 100 days",
      season: "Kharif",
      spacing: "45 x 5 cm",
      packSizes: "3 kg, 6 kg, 30 kg",
      treatment: "Thiram + Rhizobium",
    },
  },
  {
    slug: "mustard-nandi-pili",
    name: "Nandi Pili",
    crop: "Mustard",
    category: "Oilseeds",
    badge: null,
    short:
      "Yellow-seeded mustard with high oil recovery and a compact, lodge-resistant habit.",
    description:
      "Nandi Pili is a yellow-seeded mustard bred for timely Rabi sowing in the north and central belt. Its compact plant habit resists lodging, and the yellow seed coat means better oil recovery for millers.",
    highlights: [
      "Yellow seed coat, higher oil recovery",
      "Compact habit resists lodging",
      "Tolerant to white rust and alternaria",
      "Early maturity fits double-crop rotations",
    ],
    specs: {
      germination: "85% minimum",
      maturity: "110 - 120 days",
      season: "Rabi",
      spacing: "30 x 10 cm",
      packSizes: "1 kg, 2 kg, 5 kg",
      treatment: "Thiram + Metalaxyl",
    },
  },
  {
    slug: "maize-fodder-nandi-chara",
    name: "Nandi Chara 9",
    crop: "Fodder Maize",
    category: "Fodder",
    badge: "Dairy Favourite",
    short:
      "Multicut fodder maize with high green biomass and excellent palatability.",
    description:
      "Nandi Chara 9 is a multicut fodder maize that keeps tillering after each cut. Leaves are broad, soft and juicy with high protein, and the crop regrows quickly, giving dairy farms a dependable green fodder cycle.",
    highlights: [
      "Three to four cuts per season",
      "Broad, soft, high-protein leaves",
      "Fast regrowth after each harvest",
      "Very high green biomass per acre",
    ],
    specs: {
      germination: "90% minimum",
      maturity: "55 - 60 days (first cut)",
      season: "All year",
      spacing: "30 x 15 cm",
      packSizes: "1 kg, 4 kg, 10 kg",
      treatment: "Thiram",
    },
  },
  {
    slug: "berseem-nandi-harit",
    name: "Nandi Harit",
    crop: "Berseem",
    category: "Fodder",
    badge: null,
    short:
      "Multicut berseem clover with soft stems and five to six quality cuts per season.",
    description:
      "Nandi Harit is a multicut berseem selected for high digestibility and a long cutting window. Stems stay soft and the crop recovers quickly after each cut, making it an economical green fodder for dairy herds.",
    highlights: [
      "Five to six cuts per Rabi season",
      "Soft, highly digestible stems",
      "Strong nitrogen-fixing root nodules",
      "Head starts in about 50 days",
    ],
    specs: {
      germination: "85% minimum",
      maturity: "50 days (first cut)",
      season: "Rabi",
      spacing: "Broadcast",
      packSizes: "1 kg, 5 kg, 10 kg",
      treatment: "Rhizobium inoculation",
    },
  },
];

/* =========================================================
   HELPERS
========================================================= */

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug, limit = 3) {
  const current = getProductBySlug(slug);

  return PRODUCTS.filter(
    (product) =>
      product.slug !== slug &&
      (!current || product.category === current.category)
  ).slice(0, limit);
}
