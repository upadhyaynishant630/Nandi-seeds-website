


/* =========================================================
   PRODUCT CATEGORIES
========================================================= */

export const SEED_CATEGORIES = [
  "All",
  "Cereals",
];


/* =========================================================
   PRODUCT PACKSHOT IMAGES
========================================================= */

export const PEARL_MILLET_PACKSHOTS = {
  hiPearl51: "/images/products/Hi-Pearl%2051%20Packshot.png",

  nandi5: "/images/products/Nandi-5%20Packshot.png",

  nandi11: "/images/products/Nandi-11%20Packshot.png",

  nandi31: "/images/products/Nandi-31%20Packshot.png",

  nandi52: "/images/products/Nandi-52%20Packshot.png",

  nandi61: "/images/products/Nandi-61%20Packshot.png",

  nandi64: "/images/products/Nandi-64%20Packshot.png",

  nandi65: "/images/products/Nandi-65%20Packshot.png",

  nandi75: "/images/products/Nandi-75%20Packshot.png",

  nandi99: "/images/products/Nandi-99%20Packshot.png",
  
  hhb67: "/images/products/HHB67.png",
};


/* =========================================================
   PEARL MILLET PRODUCTS

   The 9 USP varieties are represented, plus the supplied Nandi 61 and
   Nandi 64 packshot catalogue entries.
   Every listed variety uses its supplied packshot.
========================================================= */

export const PRODUCTS = [

  /* =====================================================
     01. NANDI 75
  ===================================================== */

  {
    slug: "nandi-75",
    name: "Nandi 75",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi75,
    imageAlt: "Nandi 75 Pearl Millet seed packshot",

    short:
      "85–88 Days. Very tall and profusely tillering plant with a very compact cylindrical panicle. Expected yield: 28–42 q/ha.",

    description:
      "Nandi 75 has an 85–88 Days maturity period. It features a very tall and profusely tillering plant, a very compact cylindrical panicle, and erect growth with a well-exerted panicle. Expected yield: 28–42 q/ha.",

    highlights: [
      "85–88 Days",
      "Very tall and profusely tillering plant",
      "Expected yield: 28–42 q/ha",
      "Very compact cylindrical panicle",
      "Erect growth with well-exerted panicle",
    ],

    specs: {
      maturity: "85–88 Days",
      expectedYield: "28–42 q/ha",
      plantType: "Very tall and profusely tillering plant",
      panicle: "Very compact cylindrical panicle",
      growthHabit: "Erect growth with well-exerted panicle",
    },
  },


  /* =====================================================
     02. NANDI 11
  ===================================================== */

  {
    slug: "nandi-11",
    name: "Nandi 11",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi11,
    imageAlt: "Nandi 11 Pearl Millet seed packshot",

    short:
      "75–80 Days. Medium-tall plant (200–220 cm) with a long, compact cylindrical panicle. Expected yield: 26–34 q/ha.",

    description:
      "Nandi 11 has a 75–80 Days maturity period. It features a medium-tall plant (200–220 cm), a long, compact cylindrical panicle, and an erect plant with a fully exerted panicle. Expected yield: 26–34 q/ha.",

    highlights: [
      "75–80 Days",
      "Medium-tall plant (200–220 cm)",
      "Expected yield: 26–34 q/ha",
      "Long, compact cylindrical panicle",
      "Erect plant with fully exerted panicle",
    ],

    specs: {
      maturity: "75–80 Days",
      plantHeight: "200–220 cm",
      expectedYield: "26–34 q/ha",
      panicle: "Long, compact cylindrical panicle",
      growthHabit: "Erect plant with fully exerted panicle",
    },
  },


  /* =====================================================
     03. NANDI 31
  ===================================================== */

  {
    slug: "nandi-31",
    name: "Nandi 31",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi31,
    imageAlt: "Nandi 31 Pearl Millet seed packshot",

    short:
      "80–82 Days. Medium-tall plant (200–220 cm) with a long, very compact cylindrical panicle. Expected yield: 28–42 q/ha.",

    description:
      "Nandi 31 has an 80–82 Days maturity period. It features a medium-tall plant (200–220 cm), a long, very compact cylindrical panicle, and an erect and fully exerted panicle. Expected yield: 28–42 q/ha.",

    highlights: [
      "80–82 Days",
      "Expected yield: 28–42 q/ha",
      "Medium-tall plant (200–220 cm)",
      "Long, very compact cylindrical panicle",
      "Erect and fully exerted panicle",
    ],

    specs: {
      maturity: "80–82 Days",
      expectedYield: "28–42 q/ha",
      plantHeight: "200–220 cm",
      panicle: "Long, very compact cylindrical panicle",
      growthHabit: "Erect and fully exerted panicle",
    },
  },


  /* =====================================================
     04. NANDI 5 IMP
  ===================================================== */

  {
    slug: "nandi-5-imp",
    name: "Nandi 5 IMP",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi5,
    imageAlt: "Nandi 5 IMP Pearl Millet seed packshot",

    short:
      "75–80 Days. Tall plant (200–220 cm) with a long, very compact cylindrical panicle. Expected yield: 26–30 q/ha.",

    description:
      "Nandi 5 IMP has a 75–80 Days maturity period. It features a tall plant (200–220 cm), a long, very compact cylindrical panicle, and an erect plant with a fully exerted panicle. Expected yield: 26–30 q/ha.",

    highlights: [
      "75–80 Days",
      "Expected yield: 26–30 q/ha",
      "Tall plant (200–220 cm)",
      "Long, very compact cylindrical panicle",
      "Erect plant with fully exerted panicle",
    ],

    specs: {
      maturity: "75–80 Days",
      expectedYield: "26–30 q/ha",
      plantHeight: "200–220 cm",
      panicle: "Long, very compact cylindrical panicle",
      growthHabit: "Erect plant with fully exerted panicle",
    },
  },


  /* =====================================================
     05. NANDI 52
  ===================================================== */

  {
    slug: "nandi-52",
    name: "Nandi 52",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi52,
    imageAlt: "Nandi 52 Pearl Millet seed packshot",

    short:
      "75–80 Days with early maturity. Medium plant height (200–210 cm), long, compact panicle, and expected yield of 26–32 q/ha.",

    description:
      "Nandi 52 has a 75–80 Days maturity period and is described as early maturity. It features a medium plant height (200–210 cm) and a long, compact panicle. Expected yield: 26–32 q/ha.",

    highlights: [
      "75–80 Days",
      "Early maturity",
      "Expected yield: 26–32 q/ha",
      "Medium plant height (200–210 cm)",
      "Long, compact panicle",
    ],

    specs: {
      maturity: "75–80 Days",
      maturityNote: "Early maturity",
      expectedYield: "26–32 q/ha",
      plantHeight: "200–210 cm",
      panicle: "Long, compact panicle",
    },
  },


  /* =====================================================
     06. NANDI 65
  ===================================================== */

  {
    slug: "nandi-65",
    name: "Nandi 65",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi65,
    imageAlt: "Nandi 65 Pearl Millet seed packshot",

    short:
      "80–82 Days. Medium-tall plant (180–210 cm) with a long, very compact conical panicle. Expected yield: 26–34 q/ha.",

    description:
      "Nandi 65 has an 80–82 Days maturity period. It features a medium-tall plant (180–210 cm), a long, very compact conical panicle, and an erect and fully exerted panicle. Expected yield: 26–34 q/ha.",

    highlights: [
      "80–82 Days",
      "Expected yield: 26–34 q/ha",
      "Medium-tall plant (180–210 cm)",
      "Long, very compact conical panicle",
      "Erect and fully exerted panicle",
    ],

    specs: {
      maturity: "80–82 Days",
      expectedYield: "26–34 q/ha",
      plantHeight: "180–210 cm",
      panicle: "Long, very compact conical panicle",
      growthHabit: "Erect and fully exerted panicle",
    },
  },


  /* =====================================================
     07. HI PEARL 51
  ===================================================== */

  {
    slug: "hi-pearl-51",
    name: "Hi Pearl 51",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.hiPearl51,
    imageAlt: "Hi Pearl 51 Pearl Millet seed packshot",

    short:
      "80–82 Days. Medium-tall plant (200–220 cm) with a long, very compact cylindrical panicle. Expected yield: 28–38 q/ha.",

    description:
      "Hi Pearl 51 has an 80–82 Days maturity period. It features a medium-tall plant (200–220 cm), a long, very compact cylindrical panicle, and an erect and fully exerted panicle. Expected yield: 28–38 q/ha.",

    highlights: [
      "80–82 Days",
      "Expected yield: 28–38 q/ha",
      "Medium-tall plant (200–220 cm)",
      "Long, very compact cylindrical panicle",
      "Erect and fully exerted panicle",
    ],

    specs: {
      maturity: "80–82 Days",
      expectedYield: "28–38 q/ha",
      plantHeight: "200–220 cm",
      panicle: "Long, very compact cylindrical panicle",
      growthHabit: "Erect and fully exerted panicle",
    },
  },


  /* =====================================================
     08. HHB 67 IMP
  ===================================================== */

  {
    slug: "hhb-67-imp",
    name: "HHB 67 IMP",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.hhb67,
    imageAlt: "HHB 67 IMP Pearl Millet seed packshot",

    short:
      "70–72 Days with early maturity, high tillering and drought resistance. Expected yield: 10–12 q/ha (Kharif only).",

    description:
      "HHB 67 IMP has a 70–72 Days maturity period and is described as early maturity. The supplied USPs highlight high tillering and drought resistance. Expected yield: 10–12 q/ha (Kharif only).",

    highlights: [
      "70–72 Days",
      "Early maturity",
      "High tillering",
      "Drought resistance",
      "Expected yield: 10–12 q/ha (Kharif only)",
    ],

    specs: {
      maturity: "70–72 Days",
      maturityNote: "Early maturity",
      plantType: "High tillering",
      tolerance: "Drought resistance",
      expectedYield: "10–12 q/ha",
      season: "Kharif only",
    },
  },


  /* =====================================================
     09. NANDI 99
  ===================================================== */

  {
    slug: "nandi-99",
    name: "Nandi 99",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi99,
    imageAlt: "Nandi 99 Pearl Millet seed packshot",

    short:
      "72–75 Days with early maturity, high tillering and a very long 32–35 cm panicle. Expected yield: 13–15 q/ha (Kharif only).",

    description:
      "Nandi 99 has a 72–75 Days maturity period and is described as early maturity. It features a very long panicle (32–35 cm) and high tillering. Expected yield: 13–15 q/ha (Kharif only).",

    highlights: [
      "72–75 Days",
      "Early maturity",
      "Very long panicle (32–35 cm)",
      "High tillering",
      "Expected yield: 13–15 q/ha (Kharif only)",
    ],

    specs: {
      maturity: "72–75 Days",
      maturityNote: "Early maturity",
      panicleLength: "32–35 cm",
      plantType: "High tillering",
      expectedYield: "13–15 q/ha",
      season: "Kharif only",
    },
  },


  /* =====================================================
     10. NANDI 61
  ===================================================== */

  {
    slug: "nandi-61",
    name: "Nandi 61",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi61,
    imageAlt: "Nandi 61 Pearl Millet seed packshot",

    short:
      "Pearl Millet variety with the supplied Nandi 61 packshot.",

    description:
      "Nandi 61 is included in the Pearl Millet product catalogue. The supplied official packshot is displayed in full without cropping.",

    highlights: [
      "Pearl Millet variety",
      "Official Nandi 61 packshot",
    ],

     specs: {
      maturity: "70–75 Days",
      maturityNote: "Early maturity",
      panicleLength: "30–35 cm",
      plantType: "High tillering",
      expectedYield: "10–15 q/ha",
      season: "Kharif only",
    },
  },


  /* =====================================================
     11. NANDI 64
  ===================================================== */

  {
    slug: "nandi-64",
    name: "Nandi 64",
    crop: "Pearl Millet",
    category: "Cereals",
    badge: null,

    image: PEARL_MILLET_PACKSHOTS.nandi64,
    imageAlt: "Nandi 64 Pearl Millet seed packshot",

    short:
      "Pearl Millet variety with the supplied Nandi 64 packshot.",

    description:
      "Nandi 64 is included in the Pearl Millet product catalogue. The supplied official packshot is displayed in full without cropping.",

    highlights: [
      "Pearl Millet variety",
      "Official Nandi 64 packshot",
    ],

     specs: {
      maturity: "80–82 Days",
      expectedYield: "26–34 q/ha",
      plantHeight: "180–210 cm",
      panicle: "Long, very compact conical panicle",
      growthHabit: "Erect and fully exerted panicle",
    },
  },

];


/* =========================================================
   PRODUCT HELPERS
========================================================= */

/**
 * Find a product using its unique slug.
 */
export function getProductBySlug(slug) {
  return PRODUCTS.find(
    (product) => product.slug === slug
  );
}


/**
 * Return related products from the same category.
 */
export function getRelatedProducts(slug, limit = 3) {
  const current = getProductBySlug(slug);

  return PRODUCTS
    .filter(
      (product) =>
        product.slug !== slug &&
        (!current || product.category === current.category)
    )
    .slice(0, limit);
}
