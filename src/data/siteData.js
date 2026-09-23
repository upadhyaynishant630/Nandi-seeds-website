/* =========================================================
   Nandi Seeds - SITE WIDE CONTENT
   Edit copy, links and contact details here instead of
   hard-coding them inside components.
========================================================= */

/* =========================================================
   BRAND & CONTACT
========================================================= */

export const SITE = {
  name: "Nandi Seeds",
  tagline: "Quality Seeds, Trusted Yield",
  established: "1994",

  phone: "+91 90000 00000",
  phoneAlt: "+91 90000 00001",
  whatsapp: "919000000000",
  email: "info@nandiseeds.com",
  salesEmail: "sales@nandiseeds.com",

  addressLine1: "Nandi Seeds Pvt. Ltd.",
  addressLine2: "Plot 12, Agri Business Park",
  addressLine3: "Ring Road, Nashik, Maharashtra 422010",
  mapUrl: "https://maps.google.com/?q=Nashik+Maharashtra",
  hours: "Mon - Sat, 9:30 AM to 6:30 PM",
};

/* =========================================================
   PRIMARY NAVIGATION
   Order here drives both the desktop and mobile menu.
========================================================= */

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Dealers", to: "/dealers" },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];

/* =========================================================
   SEED RANGE SHORTCUTS (footer)
   These deep-link into the Products page filter.
========================================================= */

export const SEED_CATEGORY_LINKS = [
  { label: "Vegetable Seeds", to: "/products?category=Vegetables" },
  { label: "Cereals & Millets", to: "/products?category=Cereals" },
  { label: "Pulses", to: "/products?category=Pulses" },
  { label: "Oilseeds", to: "/products?category=Oilseeds" },
  { label: "Fodder Seeds", to: "/products?category=Fodder" },
];

/* =========================================================
   COMPANY HIGHLIGHTS
========================================================= */

export const STATS = [
  { value: "30+", label: "Years in seed production" },
  { value: "120+", label: "Seed varieties developed" },
  { value: "8 Lakh+", label: "Farmers served across India" },
  { value: "1,400+", label: "Authorised dealer counters" },
];

/* =========================================================
   WHY CHOOSE US
========================================================= */

export const VALUES = [
  {
    icon: "germination",
    title: "Verified Germination",
    text: "Every lot is lab tested before dispatch. Minimum 85% germination is guaranteed on certified varieties.",
  },
  {
    icon: "dna",
    title: "Genetic Purity",
    text: "Breeder and foundation seed sourced in-house, so the variety you plant performs exactly as promised.",
  },
  {
    icon: "climate",
    title: "Climate Ready",
    text: "Bred and trialled for Indian heat, humidity and rainfall patterns across multiple agro-climatic zones.",
  },
  {
    icon: "support",
    title: "Field Support",
    text: "Our agronomists stay with you from sowing to harvest with visits, advisories and pest alerts.",
  },
  {
    icon: "packaging",
    title: "Reliable Packaging",
    text: "Moisture-proof treated packs from 10 g mini packs to 10 kg commercial bags with traceable batch codes.",
  },
  {
    icon: "honest",
    title: "Fair, Transparent Pricing",
    text: "No hidden margins for dealers or farmers. Prices are uniform across our authorised network.",
  },
];

/* =========================================================
   SERVICES
========================================================= */

export const SERVICES = [
  {
    slug: "seed-production",
    icon: "seed",
    title: "Contract Seed Production",
    text: "Organised multiplication on grower fields with breeder seed support, isolation monitoring and buy-back.",
  },
  {
    slug: "variety-trial",
    icon: "trial",
    title: "Variety Trials & Demos",
    text: "Multi-location trials and farmer demo plots so you can compare yield before you commit to a variety.",
  },
  {
    slug: "seed-testing",
    icon: "lab",
    title: "Quality & Purity Testing",
    text: "Germination, moisture, physical purity and genetic purity testing with a printed lot report.",
  },
  {
    slug: "seed-treatment",
    icon: "shield",
    title: "Seed Treatment & Coating",
    text: "Fungicide, insecticide and bio-priming treatments applied on calibrated coating lines.",
  },
  {
    slug: "agronomy-advisory",
    icon: "support",
    title: "Agronomy Advisory",
    text: "Sowing windows, spacing, nutrition and pest advisories delivered on WhatsApp and in the field.",
  },
  {
    slug: "dealer-network",
    icon: "network",
    title: "Dealer & Distribution Support",
    text: "Territory rights, credit terms, branding kits and stock planning for our authorised partners.",
  },
];

/* =========================================================
   HOW WE WORK
========================================================= */

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Breeder Seed",
    text: "Varieties are selected and bred in-house, then maintained as nucleus and breeder seed.",
  },
  {
    step: "02",
    title: "Contracted Growing",
    text: "Multiplied with vetted partner growers under isolation and roguing supervision.",
  },
  {
    step: "03",
    title: "Processing & Grading",
    text: "Dried, cleaned, graded and treated on calibrated lines with batch-level traceability.",
  },
  {
    step: "04",
    title: "Lab Certification",
    text: "Sampled lots are tested for germination, purity and moisture before release.",
  },
];

/* =========================================================
   TESTIMONIALS
========================================================= */

export const TESTIMONIALS = [
  {
    quote:
      "The germination was uniform across the whole field and the crop stood through two heavy showers. Yield was better than my last variety.",
    name: "Ramesh Patil",
    role: "Farmer, 6 acres",
    place: "Jalgaon, Maharashtra",
  },
  {
    quote:
      "Batch-wise lab reports make my job easy. I can show every customer proof of quality instead of just promising it.",
    name: "Suresh Agarwal",
    role: "Authorised Dealer",
    place: "Indore, Madhya Pradesh",
  },
  {
    quote:
      "Their agronomist visited during flowering and flagged a pest early. That one advisory saved my crop.",
    name: "Manoj Kumar",
    role: "Farmer, 12 acres",
    place: "Guntur, Andhra Pradesh",
  },
];

/* =========================================================
   CERTIFICATIONS & TRUST
========================================================= */

export const CERTIFICATIONS = [
  "Seed Testing Laboratory Certified",
  "National Seeds Portals Registered",
  "Strict Phytosanitary Compliance",
  "Transport Packing Certified",
];

/* =========================================================
   GALLERY
   Files live in public/images/gallery/
========================================================= */

export const GALLERY_ITEMS = [
  {
    src: "/images/gallery/field-demo.jpg",
    title: "Farmer Field Demo",
    category: "Field Trials",
  },
  {
    src: "/images/gallery/agri-expo.jpg",
    title: "Agri Expo Stall",
    category: "Events",
  },
  {
    src: "/images/gallery/seed-lab.jpg",
    title: "Seed Testing Lab",
    category: "Quality",
  },
  {
    src: "/images/gallery/processing-unit.jpg",
    title: "Processing Unit",
    category: "Quality",
  },
  {
    src: "/images/gallery/grower-meet.jpg",
    title: "Grower Meet",
    category: "Events",
  },
  {
    src: "/images/gallery/harvest-visit.jpg",
    title: "Harvest Visit",
    category: "Field Trials",
  },
];

export const GALLERY_CATEGORIES = [
  "All",
  "Field Trials",
  "Events",
  "Quality",
];

/* =========================================================
   FAQ
========================================================= */

export const FAQS = [
  {
    q: "How do I become an authorised Nandi Seeds dealer?",
    a: "Fill the dealer enquiry form on the Dealers page with your district, current business and expected monthly volume. Our regional manager will contact you within three working days.",
  },
  {
    q: "Do you supply seeds outside Maharashtra?",
    a: "Yes. We dispatch to all major agricultural states through our distributor network and courier partners, with lot documentation included.",
  },
  {
    q: "Can I get a sample before buying in bulk?",
    a: "Starter and mini packs are available for every variety so you can run a small plot trial before committing to a full order.",
  },
  {
    q: "What documents come with a shipment?",
    a: "Each batch ships with a germination and purity test report, a batch code label and a tax invoice.",
  },
];
