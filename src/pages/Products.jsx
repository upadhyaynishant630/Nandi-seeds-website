import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowRight, FiSearch, FiSliders } from "react-icons/fi";

import PageHero from "../component/PageHero";
import { PRODUCTS, SEED_CATEGORIES } from "../data/products";
import { getProductCardSpecs } from "../utils/productCardSpecs";

import "./Products.css";

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
      return;
    }

    setSearchParams({ category });
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

      const searchableText = [
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

      return matchesCategory && (!term || searchableText.includes(term));
    });
  }, [activeCategory, query]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div className="products-page">
      <PageHero
        title="Explore our seed varieties"
        subtitle="Browse the Nandi Seeds catalogue and compare the variety-wise characteristics supplied for each product."
        breadcrumb="Products"
      />

      {/* SEARCH + CATEGORY FILTER */}
      <section className="products-filter" aria-label="Product filters">
        <div className="container">
          <div className="products-filter-inner">
            <label className="products-search">
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products or characteristics..."
                aria-label="Search products or characteristics"
              />
            </label>

            <label className="products-category-filter" htmlFor="products-category">
              <span>Category</span>
              <select
                id="products-category"
                value={activeCategory}
                onChange={(event) => setCategory(event.target.value)}
              >
                {SEED_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All products" : category}
                  </option>
                ))}
              </select>
            </label>

            <span className="products-count" aria-live="polite">
              <FiSliders aria-hidden="true" />
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>
        </div>
      </section>

      {/* COMPLETE PRODUCT CATALOGUE */}
      <section className="section-tight products-list">
        <div className="container">
          <div className="products-results-heading">
            <div>
              <span className="products-eyebrow">NANDI SEEDS CATALOGUE</span>
              <h2>{activeCategory === "All" ? "All available products" : `${activeCategory} varieties`}</h2>
            </div>
            <p>Showing {filteredProducts.length} of {PRODUCTS.length} products</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="products-empty">
              <h3>
                {query.trim()
                  ? "No products matched your search"
                  : `No products listed in ${activeCategory} yet`}
              </h3>
              <p>
                {query.trim()
                  ? "Try a different product name or characteristic, or clear the filters to view the complete available catalogue."
                  : "Products for this category will be added soon. View the complete available catalogue or contact our team for details."}
              </p>
              <button type="button" className="btn btn-outline" onClick={clearFilters}>
                {query.trim() ? "Clear Filters" : "View All Products"}
              </button>
            </div>
          ) : (
            <ul className="grid grid-3 products-grid">
              {filteredProducts.map((product) => {
                const cardSpecs = getProductCardSpecs(product);

                return (
                  <li key={product.slug} className="card card-hover products-card">
                    <Link to={`/products/${product.slug}`}>
                      <div className="products-card-media">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.imageAlt || `${product.name} ${product.crop} seed packshot`}
                            loading="lazy"
                            decoding="async"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                              const fallback = event.currentTarget.nextElementSibling;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <span
                          className="products-card-fallback"
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
                          {product.category} · {product.crop}
                        </span>
                        <h3>{product.name}</h3>
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
                          View product details
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
            <h2>Need help choosing a variety?</h2>
            <p>
              Contact the Nandi Seeds team for more information about the
              varieties in the current catalogue.
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
