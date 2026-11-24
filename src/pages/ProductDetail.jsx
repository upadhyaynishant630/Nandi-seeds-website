import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiPhone,
} from "react-icons/fi";

import PageHero from "../component/PageHero";
import { getProductBySlug, getRelatedProducts } from "../data/products";
import { SITE } from "../data/siteData";

import "./ProductDetail.css";



const SPEC_LABELS = {
  maturity: "Maturity",
  maturityNote: "Maturity characteristic",
  expectedYield: "Expected yield",
  plantHeight: "Plant height",
  plantType: "Plant characteristics",
  panicle: "Panicle",
  panicleLength: "Panicle length",
  growthHabit: "Growth habit",
  tolerance: "Resistance",
  season: "Season",
};

function ProductDetail() {
  const { slug } = useParams();

  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(slug, 3);

  if (!product) {
    return (
      <div className="product-detail-page">
        <PageHero
          eyebrow="Not Found"
          title="This variety is not in our catalogue"
          subtitle="The link may be outdated or the variety may no longer be listed. Browse the current catalogue to view available Pearl Millet varieties."
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
    .map(([key, value]) => ({
      label: SPEC_LABELS[key] || key,
      value,
    }));

  const phoneNumber = SITE?.phone;
  const phoneHref = phoneNumber
    ? `tel:${String(phoneNumber).replace(/[^\d+]/g, "")}`
    : null;

  return (
    <div className="product-detail-page">
      <PageHero
        eyebrow={`${product.category} Seeds`}
        title={product.name}
        subtitle={product.short}
        breadcrumb={["Products", product.name]}
      />

      {/* PRODUCT OVERVIEW */}
      <section className="section">
        <div className="container product-overview">
          {/* PRODUCT IMAGE */}
          <div className="product-media">
            <div className="media-frame product-frame">
              {product.image ? (
                <img
                  src={product.image}
                  alt={
                    product.imageAlt ||
                    `${product.name} ${product.crop} seed packshot`
                  }
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
              <span className="badge badge-gold product-badge">
                {product.badge}
              </span>
            ) : null}
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="product-info">
           

            <h2 className="product-name">{product.name}</h2>

            <p className="product-description">{product.description}</p>

            <h3 className="product-subheading">Key Advantages</h3>

            <ul className="tick-list product-highlights">
              {product.highlights.map((point) => (
                <li key={point}>
                  <FiCheck aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

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

      {/* SPECIFICATIONS */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            
            <h2>Variety characteristics</h2>
            <p>
              Product details and expected yield are presented as supplied in
              the Pearl Millet Product-Wise USPs.
            </p>
          </div>

          {specRows.length > 0 ? (
            <table className="product-spec-table">
              <caption className="product-spec-caption">
                {product.name} &mdash; {product.crop}
              </caption>
              <tbody>
                {specRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No additional specifications are currently available.</p>
          )}
        </div>
      </section>

      {/* RELATED VARIETIES */}
      {relatedProducts.length > 0 ? (
        <section className="section">
          <div className="container">
            <div className="section-head">
              
              <h2>Other Pearl Millet varieties</h2>
            </div>

            <ul className="grid grid-3 product-related">
              {relatedProducts.map((item) => (
                <li
                  key={item.slug}
                  className="card card-hover product-related-card"
                >
                  <Link to={`/products/${item.slug}`}>
                    
                    <h3>{item.name}</h3>
                    <p>{item.short}</p>

                    <span className="product-related-link">
                      View details
                      <FiArrowRight aria-hidden="true" />
                    </span>
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
              Pearl Millet variety.
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
