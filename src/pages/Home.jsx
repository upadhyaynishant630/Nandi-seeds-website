import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiPhone, FiShield } from "react-icons/fi";

import {
  SITE,
  STATS,
  VALUES,
  SERVICES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "../data/siteData";
import { PRODUCTS } from "../data/products";
import { resolveIcon } from "../data/icons";

import "./Home.css";

/* =========================================================
   Home
   Landing page: hero, trust stats, featured seeds, why
   choose us, how we work, services preview, testimonials
   and a closing call to action.
========================================================= */

function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const previewServices = SERVICES.slice(0, 3);

  return (
    <div className="home-page">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="home-hero">
        <span className="home-hero-glow" aria-hidden="true" />

        <div className="container home-hero-inner">
          <div className="home-hero-copy rise-in">
            <span className="eyebrow">
              <FiShield aria-hidden="true" />
              Trusted since {SITE.established}
            </span>

            <h1>
              Better seeds.{" "}
              <span className="home-hero-accent">Stronger harvests.</span>
            </h1>

            <p className="home-hero-text">
              Nandi Seeds breeds, tests and delivers high-germination hybrid
              and open-pollinated seed to farms across India, with lab
              reports for every batch and agronomists who stay with you
              through the season.
            </p>

            <div className="home-hero-actions">
              <Link className="btn btn-primary" to="/products">
                Explore Our Seeds
                <FiArrowRight aria-hidden="true" />
              </Link>

              <a className="btn btn-outline" href={`tel:${SITE.phone}`}>
                <FiPhone aria-hidden="true" />
                Talk to an Agronomist
              </a>
            </div>

            <ul className="home-hero-points tick-list">
              <li>
                <FiCheck aria-hidden="true" />
                85%+ guaranteed germination on certified lots
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                Batch-wise purity and moisture test reports
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                Free field advisory for every purchase
              </li>
            </ul>
          </div>

          {/* HERO VISUAL */}
          <div className="home-hero-visual rise-in">
            <div className="media-frame hero-frame">
              <img
                src="/images/hero/hero-field.jpg"
                alt="Healthy crop standing in a Nandi Seeds trial field"
                loading="eager"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="media-placeholder hero-placeholder">
                Add /images/hero/hero-field.jpg
              </div>
            </div>

            <div className="hero-float hero-float-a">
              <strong>120+</strong>
              <span>Varieties developed</span>
            </div>

            <div className="hero-float hero-float-b">
              <strong>8 Lakh+</strong>
              <span>Farmers served</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          TRUST STATS
      ================================================= */}

      <section className="home-stats">
        <div className="container">
          <ul className="home-stats-grid">
            {STATS.map((stat) => (
              <li key={stat.label} className="home-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =================================================
          FEATURED SEEDS
      ================================================= */}

      <section className="section home-featured">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Seed Range</span>
            <h2>Varieties farmers come back for</h2>
            <p>
              Every variety below is bred in-house, trialled across multiple
              locations and released only after it clears our germination
              and purity standards.
            </p>
          </div>

          <ul className="grid grid-4 home-product-grid">
            {featuredProducts.map((product) => (
              <li key={product.slug} className="card card-hover home-product">
                <Link to={`/products/${product.slug}`}>
                  <div className="home-product-media">
                    <img
                      src={`/images/products/${product.slug}.jpg`}
                      alt={`${product.name} ${product.crop} seeds`}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="home-product-fallback" aria-hidden="true">
                      {product.crop}
                    </span>

                    {product.badge ? (
                      <span className="badge badge-gold home-product-badge">
                        {product.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="home-product-body">
                    <span className="home-product-crop">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.short}</p>

                    <span className="home-product-link">
                      View details
                      <FiArrowRight aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="home-featured-more">
            <Link className="btn btn-outline" to="/products">
              Browse the full catalogue
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          WHY CHOOSE US
      ================================================= */}

      <section className="section section-soft home-why">
        <div className="container">
          <div className="split">
            <div className="home-why-copy">
              <span className="eyebrow">Why Nandi Seeds</span>
              <h2 className="home-why-title">
                Quality you can measure, not just promise
              </h2>
              <p className="home-why-text">
                Seed is the smallest input on a farm and the biggest driver
                of yield. We treat it that way, from the first breeder plot
                to the bag that reaches your dealer.
              </p>

              <ul className="tick-list home-why-list">
                <li>
                  <FiCheck aria-hidden="true" />
                  Independent lab testing on every released lot
                </li>
                <li>
                  <FiCheck aria-hidden="true" />
                  Traceable batch codes printed on every pack
                </li>
                <li>
                  <FiCheck aria-hidden="true" />
                  Replacement guarantee on germination shortfalls
                </li>
              </ul>

              <Link className="btn btn-primary home-why-cta" to="/about">
                About Nandi Seeds
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid grid-2 home-value-grid">
              {VALUES.slice(0, 4).map((value) => {
                const Icon = resolveIcon(value.icon);

                return (
                  <li key={value.title} className="card card-hover home-value">
                    <span className="home-value-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* =================================================
          HOW WE WORK
      ================================================= */}

      <section className="section home-process">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How We Work</span>
            <h2>From breeder plot to your field</h2>
            <p>
              Four controlled stages stand between a promising parent line
              and the pack that reaches your dealer counter.
            </p>
          </div>

          <ol className="grid grid-4 home-process-grid">
            {PROCESS_STEPS.map((step) => (
              <li key={step.step} className="home-process-step">
                <span className="home-process-number">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =================================================
          SERVICES PREVIEW
      ================================================= */}

      <section className="section section-green home-services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow eyebrow-on-dark">
              Support Beyond the Bag
            </span>
            <h2>Services that protect your investment</h2>
            <p>
              Buying good seed is step one. We stay involved with trials,
              testing and field advisory so the crop actually performs.
            </p>
          </div>

          <ul className="grid grid-3 home-service-grid">
            {previewServices.map((service) => {
              const Icon = resolveIcon(service.icon);

              return (
                <li key={service.slug} className="home-service">
                  <span className="home-service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </li>
              );
            })}
          </ul>

          <div className="home-services-more">
            <Link className="btn btn-ghost-light" to="/services">
              See all services
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          TESTIMONIALS
      ================================================= */}

      <section className="section home-testimonials">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Farmer Voices</span>
            <h2>Results from the field</h2>
          </div>

          <ul className="grid grid-3 home-testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <li key={item.name} className="card home-testimonial">
                <p className="home-testimonial-quote">{item.quote}</p>

                <div className="home-testimonial-person">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                  <span className="home-testimonial-place">{item.place}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Not sure which variety suits your soil?</h2>
            <p>
              Send us your district, soil type and sowing window. Our
              agronomy team will suggest the right varieties and share the
              closest dealer details.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Get a Recommendation
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

export default Home;
