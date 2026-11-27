import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiLayers,
  FiPhone,
  FiSun,
  FiTrendingUp,
} from "react-icons/fi";


import PageHero from "../component/PageHero";
import { getProductBySlug, PRODUCTS } from "../data/products";
import { SITE } from "../data/siteData";

import "./ProductDetail.css";

const PRODUCT_CAROUSEL_IMAGES = [
  "/images/products/product-carousel/11.png",
  "/images/products/product-carousel/11.1.png",
  "/images/products/product-carousel/11.2.png",
];

const SPEC_META = {
  maturity: { label: "Maturity", Icon: FiCalendar },
  maturityNote: { label: "Maturity characteristic", Icon: FiInfo },
  expectedYield: { label: "Expected yield", Icon: FiTrendingUp },
  plantHeight: { label: "Plant height", Icon: FiLayers },
  plantType: { label: "Plant characteristics", Icon: FiLayers },
  panicle: { label: "Panicle", Icon: FiActivity },
  panicleLength: { label: "Panicle length", Icon: FiLayers },
  growthHabit: { label: "Growth habit", Icon: FiActivity },
  tolerance: { label: "Resistance / tolerance", Icon: FiCheck },
  season: { label: "Season", Icon: FiSun },
};

function formatSpecLabel(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (character) => character.toUpperCase());
}

function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const carouselRef = useRef(null);
  const specStripRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollSpecPrev, setCanScrollSpecPrev] = useState(false);
  const [canScrollSpecNext, setCanScrollSpecNext] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);

  const bannerImages =
    Array.isArray(product?.carouselImages) && product.carouselImages.length > 0
      ? product.carouselImages
      : PRODUCT_CAROUSEL_IMAGES;

  // Show every other currently listed product below the selected variety.
  const otherProducts = PRODUCTS.filter((item) => item.slug !== slug);

  const showBanner = (index) => {
    setActiveBanner((index + bannerImages.length) % bannerImages.length);
  };

  const updateCarouselButtons = useCallback(() => {
    const track = carouselRef.current;
    if (!track) return;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  const updateSpecButtons = useCallback(() => {
    const strip = specStripRef.current;
    if (!strip) return;
    setCanScrollSpecPrev(strip.scrollLeft > 4);
    setCanScrollSpecNext(strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 4);
  }, []);

  useEffect(() => {
    setActiveBanner(0);
    const track = carouselRef.current;
    if (track) {
      track.scrollTo({ left: 0, behavior: "auto" });
    }
    const strip = specStripRef.current;
    if (strip) {
      strip.scrollTo({ left: 0, behavior: "auto" });
    }
    updateCarouselButtons();
    updateSpecButtons();
    const handleResize = () => {
      updateCarouselButtons();
      updateSpecButtons();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slug, updateCarouselButtons, updateSpecButtons]);

  const scrollSpecStrip = (direction) => {
    const strip = specStripRef.current;
    if (!strip) return;
    const firstItem = strip.querySelector(".product-spec-overlay-item");
    const step = firstItem
      ? firstItem.getBoundingClientRect().width + 20
      : strip.clientWidth * 0.7;
    strip.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const scrollCarousel = (direction) => {
    const track = carouselRef.current;
    if (!track) return;
    const firstCard = track.querySelector(".product-related-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : track.clientWidth * 0.75;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <PageHero
          eyebrow="Not Found"
          title="This variety is not in our catalogue"
          subtitle="The link may be outdated or the variety may no longer be listed. Browse the current catalogue to view available seed varieties."
          breadcrumb="Products"
        />
        <section className="section-tight">
          <div className="container product-missing">
            <Link className="btn btn-primary" to="/products">
              <FiArrowLeft aria-hidden="true" />
              Back to Catalogue
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const specRows = Object.entries(product.specs ?? {})
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      const metadata = SPEC_META[key] ?? { label: formatSpecLabel(key), Icon: FiInfo };
      return {
        key,
        label: metadata.label,
        value,
        Icon: metadata.Icon,
      };
    });

  const highlights = Array.isArray(product.highlights) ? product.highlights : [];
  const phoneNumber = SITE?.phone;
  const phoneHref = phoneNumber
    ? `tel:${String(phoneNumber).replace(/[^\d+]/g, "")}`
    : null;

  return (
    <div className="product-detail-page">
      {/* TOP BANNER CAROUSEL */}
      {bannerImages.length > 0 ? (
        <section
          className="product-banner-carousel"
          aria-label={`${product.name} gallery carousel`}
        >
          <div className="product-banner-stage">
            {bannerImages.map((src, index) => (
              <div
                key={src}
                className={`product-banner-slide ${
                  index === activeBanner ? "product-banner-slide-active" : ""
                }`}
                aria-hidden={index !== activeBanner}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="product-banner-bg"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <img
                  src={src}
                  alt={`${product.name} showcase slide ${index + 1}`}
                  className="product-banner-fg"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}

            {bannerImages.length > 1 ? (
              <>
                <button
                  type="button"
                  className="product-banner-nav product-banner-nav-prev"
                  onClick={() => showBanner(activeBanner - 1)}
                  aria-label="Previous slide"
                >
                  <FiChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="product-banner-nav product-banner-nav-next"
                  onClick={() => showBanner(activeBanner + 1)}
                  aria-label="Next slide"
                >
                  <FiChevronRight aria-hidden="true" />
                </button>

                <div className="product-banner-dots" role="tablist" aria-label="Slide selector">
                  {bannerImages.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      role="tab"
                      aria-selected={index === activeBanner}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`product-banner-dot ${
                        index === activeBanner ? "product-banner-dot-active" : ""
                      }`}
                      onClick={() => showBanner(index)}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* UNIFIED PRODUCT IMAGE + DETAILS CARD */}
      <section className="section">
        <div className="container">
          <div className="product-unified-card">
            <div className="product-unified-media">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.imageAlt || `${product.name} ${product.crop} seed packshot`}
                  loading="eager"
                  fetchPriority="high"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    const fallback = event.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="product-placeholder"
                role="img"
                aria-label={`${product.name} product image unavailable`}
                style={{ display: product.image ? "none" : "flex" }}
              >
                <span>{product.name}</span>
                <small>Packshot unavailable</small>
              </div>
              {product.badge ? (
                <span className="badge badge-gold product-badge">{product.badge}</span>
              ) : null}
            </div>

            <div className="product-unified-info">
              <span className="product-crop">{product.crop} · {product.category}</span>
              <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>

              {highlights.length > 0 ? (
                <>
                  <h3 className="product-subheading">Key characteristics</h3>
                  <ul className="tick-list product-highlights">
                    {highlights.map((point) => (
                      <li key={point}>
                        <FiCheck aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              <div className="product-actions">
                <Link className="btn btn-primary" to="/contact">
                  Enquire About This Variety
                  <FiArrowRight aria-hidden="true" />
                </Link>
                {phoneHref ? (
                  <a className="btn btn-outline" href={phoneHref}>
                    <FiPhone aria-hidden="true" />
                    Call Sales
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPEC ICONS ON BACKGROUND OVERLAY WITH < / > CONTROLS */}
      {specRows.length > 0 ? (
        <section
          className="product-spec-overlay-band"
          aria-label={`${product.name} key specifications`}
        >
          <div className="container product-spec-overlay-shell">
            <button
              type="button"
              className="product-spec-overlay-btn"
              onClick={() => scrollSpecStrip(-1)}
              disabled={!canScrollSpecPrev}
              aria-label="Previous specifications"
            >
              <FiChevronLeft aria-hidden="true" />
            </button>

            <ul
              ref={specStripRef}
              className="product-spec-overlay-strip"
              onScroll={updateSpecButtons}
            >
              {specRows.map(({ key, label, value, Icon }) => (
                <li className="product-spec-overlay-item" key={key}>
                  <span className="product-spec-overlay-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="product-spec-overlay-text">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="product-spec-overlay-btn"
              onClick={() => scrollSpecStrip(1)}
              disabled={!canScrollSpecNext}
              aria-label="Next specifications"
            >
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </section>
      ) : null}

      {/* ALL OTHER AVAILABLE PRODUCTS */}
      {otherProducts.length > 0 ? (
        <section className="section product-all-varieties-section">
          <div className="container">
            <div className="product-more-header">
              <div className="product-more-title">
                <span className="product-spec-eyebrow">MORE FROM NANDI SEEDS</span>
                <h2>Explore all other varieties</h2>
                <p>Browse the rest of the products currently listed in our catalogue.</p>
              </div>

              <div className="product-carousel-controls" aria-label="Scroll other varieties">
                <button
                  type="button"
                  className="product-carousel-btn"
                  onClick={() => scrollCarousel(-1)}
                  disabled={!canScrollPrev}
                  aria-label="Previous varieties"
                >
                  <FiChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="product-carousel-btn"
                  onClick={() => scrollCarousel(1)}
                  disabled={!canScrollNext}
                  aria-label="Next varieties"
                >
                  <FiChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="product-carousel-viewport">
              <ul
                ref={carouselRef}
                className="product-related-track"
                onScroll={updateCarouselButtons}
              >
                {otherProducts.map((item) => (
                  <li key={item.slug} className="product-related-card">
                    <Link to={`/products/${item.slug}`} className="product-related-card-link">
                      <div className="product-related-media">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.imageAlt || `${item.name} ${item.crop} seed packshot`}
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
                          className="product-related-image-fallback"
                          style={{ display: item.image ? "none" : "flex" }}
                        >
                          {item.name}
                        </span>
                      </div>
                      <div className="product-related-content">
                        <h3>{item.name}</h3>
                        <span className="product-related-link">
                          View details
                          <FiArrowRight aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* CALL TO ACTION */}
      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Interested in {product.name}?</h2>
            <p>
              Contact the Nandi Seeds team for further information about this
              {` ${product.crop}`} variety.
            </p>
          </div>
          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Enquire Now
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link className="btn btn-ghost-light" to="/dealers">
              Find a Dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
