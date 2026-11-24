import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch, FiArrowRight, FiSliders } from "react-icons/fi";

import PageHero from "../component/PageHero";
import { PRODUCTS, SEED_CATEGORIES } from "../data/products";

import "./Products.css";

/* =========================================================
   PRODUCTS — PEARL MILLET CATALOGUE

   - Search and category filtering are URL-aware.
   - Product images use the image paths from products.js.
   - Cards display only product information supplied in the
     Pearl Millet Product-Wise USPs.
========================================================= */

const FEATURE_SPEC_ORDER = [
  ["plantHeight", "Plant height"],
  ["panicleLength", "Panicle length"],
  ["panicle", "Panicle"],
  ["plantType", "Plant characteristics"],
  ["tolerance", "Key trait"],
  ["growthHabit", "Growth habit"],
];

function getCardSpecs(product) {
  const specs = product.specs ?? {};
  const rows = [
    { label: "Maturity", value: specs.maturity },
    { label: "Expected yield", value: specs.expectedYield },
  ].filter((row) => Boolean(row.value));

  const feature = FEATURE_SPEC_ORDER.find(([key]) => Boolean(specs[key]));

  if (feature) {
    rows.push({ label: feature[1], value: specs[feature[0]] });
  }

  return rows;
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const requestedCategory = searchParams.get("category");
  const activeCategory = SEED_CATEGORIES.includes(requestedCategory)
    ? requestedCategory
    : "All";

  const setCategory = (category) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const searchableSpecs = Object.values(product.specs ?? {}).join(" ");
      const searchableHighlights = Array.isArray(product.highlights)
        ? product.highlights.join(" ")
        : "";

      const haystack = [
        product.name,
        product.crop,
        product.category,
        product.short,
        product.description,
        searchableSpecs,
        searchableHighlights,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesTerm = term === "" || haystack.includes(term);

      return matchesCategory && matchesTerm;
    });
  }, [activeCategory, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div className="products-page">
      <PageHero
        eyebrow="Pearl Millet Catalogue"
        title="Explore our Pearl Millet varieties"
        subtitle="Compare maturity periods, expected yields and variety-wise characteristics to find the information relevant to your field."
        breadcrumb="Products"
      />

      {/* FILTER BAR */}
      <section className="products-filter" aria-label="Product filters">
        <div className="container">
          <div className="products-filter-inner">
            <div className="products-search">
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Pearl Millet varieties..."
                aria-label="Search Pearl Millet varieties"
              />
            </div>

            <span className="products-count" aria-live="polite">
              <FiSliders aria-hidden="true" />
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "variety" : "varieties"}
            </span>
          </div>

          <div className="products-chips" aria-label="Filter by category">
            {SEED_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`chip ${
                  activeCategory === category ? "chip-active" : ""
                }`}
                onClick={() => setCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="section-tight products-list">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="products-empty">
              <h3>No varieties matched that search</h3>
              <p>
                Try another variety name or characteristic, or clear the
                filters to view the full Pearl Millet catalogue.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-3 products-grid">
              {filteredProducts.map((product) => {
                const cardSpecs = getCardSpecs(product);

                return (
                  <li
                    key={product.slug}
                    className="card card-hover products-card"
                  >
                    <Link to={`/products/${product.slug}`}>
                      <div className="products-card-media">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={
                              product.imageAlt ||
                              `${product.name} ${product.crop} seed packshot`
                            }
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                              const fallback =
                                event.currentTarget.nextElementSibling;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}

                        <span
                          className="products-card-fallback"
                          aria-label={`${product.name} image unavailable`}
                          style={{ display: product.image ? "none" : "flex" }}
                        >
                          {product.name}
                          <small>Packshot unavailable</small>
                        </span>

                        {product.badge ? (
                          <span className="badge badge-gold products-card-badge">
                            {product.badge}
                          </span>
                        ) : null}
                      </div>

                      <div className="products-card-body">
                        <span className="products-card-category">
                          {product.category} &middot; {product.crop}
                        </span>

                        <h3>{product.name}</h3>
                        <p>{product.short}</p>

                        {cardSpecs.length > 0 ? (
                          <ul className="products-card-specs">
                            {cardSpecs.map((spec) => (
                              <li key={spec.label}>
                                <span>{spec.label}</span>
                                <strong>{spec.value}</strong>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <span className="products-card-link">
                          View details
                          <FiArrowRight aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Need help choosing a Pearl Millet variety?</h2>
            <p>
              Contact the Nandi Seeds team for more information about the
              varieties in our Pearl Millet catalogue.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Contact Our Team
              <FiArrowRight aria-hidden="true" />
            </Link>

            <Link className="btn btn-ghost-light" to="/services">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
