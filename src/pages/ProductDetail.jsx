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

/* =========================================================
   ProductDetail
   Full specification page for one variety, driven by the
   slug in the URL: /products/:slug
========================================================= */

function ProductDetail() {
  const { slug } = useParams();

  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(slug, 3);

  /* =====================================================
     UNKNOWN SLUG
  ===================================================== */

  if (!product) {
    return (
      <div className="product-detail-page">
        <PageHero
          eyebrow="Not Found"
          title="This variety is not in our catalogue"
          subtitle="The link may be outdated or the variety may have been renamed. Browse the current catalogue to find a replacement."
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

  const specRows = [
    { label: "Germination", value: product.specs.germination },
    { label: "Maturity", value: product.specs.maturity },
    { label: "Season", value: product.specs.season },
    { label: "Spacing", value: product.specs.spacing },
    { label: "Pack Sizes", value: product.specs.packSizes },
    { label: "Seed Treatment", value: product.specs.treatment },
  ];

  return (
    <div className="product-detail-page">
      <PageHero
        eyebrow={`${product.category} Seeds`}
        title={product.name}
        subtitle={product.short}
        breadcrumb={["Products", product.name]}
      />

      {/* =================================================
          OVERVIEW
      ================================================= */}

      <section className="section">
        <div className="container product-overview">
          {/* MEDIA */}
          <div className="product-media">
            <div className="media-frame product-frame">
              <img
                src={`/images/products/${product.slug}.jpg`}
                alt={`${product.name} ${product.crop} seed pack`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="media-placeholder product-placeholder">
              Add /images/products/{product.slug}.jpg
            </div>

            {product.badge ? (
              <span className="badge badge-gold product-badge">
                {product.badge}
              </span>
            ) : null}
          </div>

          {/* DETAILS */}
          <div className="product-info">
            <span className="product-crop">
              {product.crop} &middot; {product.category}
            </span>

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

              <a className="btn btn-outline" href={`tel:${SITE.phone}`}>
                <FiPhone aria-hidden="true" />
                Call Sales
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* =================================================
          SPECIFICATIONS
      ================================================= */}

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Technical Details</span>
            <h2>Specification sheet</h2>
            <p>
              Values below are the guaranteed minimums printed on the pack
              label for this variety.
            </p>
          </div>

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
        </div>
      </section>

      {/* =================================================
          RELATED VARIETIES
      ================================================= */}

      {relatedProducts.length > 0 ? (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Also Consider</span>
              <h2>Other varieties in {product.category}</h2>
            </div>

            <ul className="grid grid-3 product-related">
              {relatedProducts.map((item) => (
                <li
                  key={item.slug}
                  className="card card-hover product-related-card"
                >
                  <Link to={`/products/${item.slug}`}>
                    <span className="product-related-crop">{item.crop}</span>
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

      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Want a sample of {product.name}?</h2>
            <p>
              Mini packs are available so you can run a small plot trial
              before ordering for the full season.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Request a Sample
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
