import { Link, useParams } from "react-router-dom";

import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
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

  // Show every other currently listed product below the selected variety.
  const otherProducts = PRODUCTS.filter((item) => item.slug !== slug);

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
      <PageHero
        title={product.name}
        subtitle={product.short}
        breadcrumb={["Products", product.name]}
      />

      {/* PRODUCT OVERVIEW */}
      <section className="section">
        <div className="container product-overview">
          <div className="product-media">
            <div className="media-frame product-frame">
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
            </div>
            {product.badge ? (
              <span className="badge badge-gold product-badge">{product.badge}</span>
            ) : null}
          </div>

          <div className="product-info">
            <span className="product-crop">{product.crop} · {product.category}</span>
            <h2 className="product-name">{product.name}</h2>
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
      </section>

      {/* A+ STYLE PRODUCT CONTENT — uses the actual product packshot and data */}
      <section className="product-a-plus-section">
        <div className="container">
          <div className="product-a-plus-panel">
            <div className="product-a-plus-image">
              {product.image ? (
                <img
                  src={product.image}
                  alt={`${product.name} official seed packshot`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span>{product.name}</span>
              )}
            </div>

            <div className="product-a-plus-content">
              <span className="product-a-plus-eyebrow">VARIETY SNAPSHOT</span>
              <h2>{product.name}</h2>
              <p>{product.short}</p>

              {highlights.length > 0 ? (
                <ul className="product-a-plus-points">
                  {highlights.slice(0, 4).map((point) => (
                    <li key={point}>
                      <FiCheck aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL VARIETY SPECIFICATION INFOGRAPHIC */}
      <section className="section section-soft product-spec-section">
        <div className="container">
          <div className="section-head">
            <span className="product-spec-eyebrow">PRODUCT INFORMATION</span>
            <h2>Variety characteristics</h2>
            <p>
              Product characteristics are displayed as supplied in the current
              Nandi Seeds product data.
            </p>
          </div>

          {specRows.length > 0 ? (
            <div
              className="product-spec-infographic"
              role="group"
              aria-label={`${product.name} variety characteristics`}
            >
              <div className="product-spec-infographic-head">
                <div>
                  <span>VARIETY SPECIFICATION</span>
                  <h3>{product.name}</h3>
                  <p>{product.crop}</p>
                </div>
                <span className="product-spec-mark" aria-hidden="true">
                  <img
                    src="/images/logo/nandi-seeds-logo.png"
                    alt=""
                    className="product-spec-mark-logo"
                  />
                </span>
              </div>

              <ul className="product-spec-grid">
                {specRows.map(({ key, label, value, Icon }) => (
                  <li className="product-spec-item" key={key}>
                    <span className="product-spec-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="product-spec-label">{label}</span>
                    <strong>{value}</strong>
                  </li>
                ))}
              </ul>

              <p className="product-spec-footnote">
                Specifications shown are product information, not a guarantee
                of field results. Actual crop performance can vary with local
                conditions and cultivation practices.
              </p>
            </div>
          ) : (
            <p className="product-spec-empty">
              No additional specifications are currently available for this variety.
            </p>
          )}
        </div>
      </section>

      {/* ALL OTHER AVAILABLE PRODUCTS */}
      {otherProducts.length > 0 ? (
        <section className="section product-all-varieties-section">
          <div className="container">
            <div className="section-head product-all-varieties-heading">
              <div>
                <span className="product-spec-eyebrow">MORE FROM NANDI SEEDS</span>
                <h2>Explore all other varieties</h2>
                <p>Browse the rest of the products currently listed in our catalogue.</p>
              </div>
              <Link className="btn btn-outline" to="/products">
                View All Products
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid grid-3 product-related">
              {otherProducts.map((item) => (
                <li key={item.slug} className="card card-hover product-related-card">
                  <Link to={`/products/${item.slug}`}>
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
                      <span className="product-related-crop">{item.category} · {item.crop}</span>
                      <h3>{item.name}</h3>
                      <p>{item.short}</p>
                      <span className="product-related-link">
                        View details
                        <FiArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="product-back">
              <Link className="btn btn-outline" to="/products">
                <FiArrowLeft aria-hidden="true" />
                Back to Full Catalogue
              </Link>
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
