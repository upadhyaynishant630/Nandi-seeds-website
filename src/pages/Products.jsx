import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch, FiArrowRight, FiSliders } from "react-icons/fi";

import PageHero from "../component/PageHero";
import { PRODUCTS, SEED_CATEGORIES } from "../data/products";

import "./Products.css";

/* =========================================================
   Products
   Filterable seed catalogue. Category is stored in the URL
   (?category=Cereals) so footer shortcuts and shared links
   open the right tab.
========================================================= */

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const activeCategory = searchParams.get("category") || "All";

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

      const haystack =
        `${product.name} ${product.crop} ${product.category} ${product.short}`.toLowerCase();

      const matchesTerm = term === "" || haystack.includes(term);

      return matchesCategory && matchesTerm;
    });
  }, [activeCategory, query]);

  return (
    <div className="products-page">
      <PageHero
        eyebrow="Seed Catalogue"
        title="Find the right variety for your field"
        subtitle="Filter by crop group or search by variety name. Every listing carries verified germination, maturity and recommended spacing."
        breadcrumb="Products"
      />

      {/* =================================================
          FILTER BAR
      ================================================= */}

      <section className="products-filter">
        <div className="container">
          <div className="products-filter-inner">
            <div className="products-search">
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tomato, maize, okra..."
                aria-label="Search seed varieties"
              />
            </div>

            <span className="products-count">
              <FiSliders aria-hidden="true" />
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "variety" : "varieties"}
            </span>
          </div>

          <div className="products-chips">
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
      {/* =================================================
          PRODUCT GRID
      ================================================= */}

      <section className="section-tight products-list">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="products-empty">
              <h3>No varieties matched that search</h3>
              <p>
                Try a different crop name, or clear the filters to see the
                full catalogue.
              </p>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-3 products-grid">
              {filteredProducts.map((product) => (
                <li
                  key={product.slug}
                  className="card card-hover products-card"
                >
                  <Link to={`/products/${product.slug}`}>
                    <div className="products-card-media">
                      <img
                        src={`/images/products/${product.slug}.jpg`}
                        alt={`${product.name} ${product.crop} seed pack`}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <span
                        className="products-card-fallback"
                        aria-hidden="true"
                      >
                        {product.crop}
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

                      <ul className="products-card-specs">
                        <li>
                          <span>Germination</span>
                          <strong>{product.specs.germination}</strong>
                        </li>
                        <li>
                          <span>Maturity</span>
                          <strong>{product.specs.maturity}</strong>
                        </li>
                        <li>
                          <span>Packs</span>
                          <strong>{product.specs.packSizes}</strong>
                        </li>
                      </ul>

                      <span className="products-card-link">
                        View details
                        <FiArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Cannot find a variety you already grow?</h2>
            <p>
              Tell us the crop and the trait you need. Our breeding team may
              already have a line under trial, and we can arrange a sample
              for the coming season.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Request a Sample
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
