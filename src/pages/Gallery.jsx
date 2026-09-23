import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import PageHero from "../component/PageHero";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "../data/siteData";

import "./Gallery.css";

/* =========================================================
   Gallery
   Filterable photo grid of trial plots, events and the
   facility. Add real images to public/images/gallery/.
========================================================= */

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleItems = useMemo(() => {
    if (activeCategory === "All") {
      return GALLERY_ITEMS;
    }

    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="gallery-page">
      <PageHero
        eyebrow="Gallery"
        title="Our fields, labs and grower meets"
        subtitle="A look at the demo plots, processing lines and farmer events that make up a Nandi Seeds season."
        breadcrumb="Gallery"
      />

      {/* =================================================
          FILTER
      ================================================= */}

      <section className="gallery-filter">
        <div className="container gallery-chips">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`chip ${
                activeCategory === category ? "chip-active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* =================================================
          GRID
      ================================================= */}

      <section className="section-tight gallery-body">
        <div className="container">
          <ul className="gallery-grid">
            {visibleItems.map((item) => (
              <li key={item.src} className="gallery-item">
                <figure className="gallery-figure">
                  <div className="gallery-media">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />

                    <span className="gallery-fallback" aria-hidden="true">
                      {item.title}
                    </span>
                  </div>

                  <figcaption className="gallery-caption">
                    <strong>{item.title}</strong>
                    <span>{item.category}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          {visibleItems.length === 0 ? (
            <p className="gallery-empty">
              No photos in this category yet. Check back soon.
            </p>
          ) : null}
        </div>
      </section>

      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Want to see our trials in person?</h2>
            <p>
              We host demo plots and grower meets across the season. Share
              your district and we will invite you to the nearest one.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Ask About Demo Plots
              <FiArrowRight aria-hidden="true" />
            </Link>

            <Link className="btn btn-ghost-light" to="/products">
              View Seed Range
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gallery;
