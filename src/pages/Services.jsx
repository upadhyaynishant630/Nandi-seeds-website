import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import PageHero from "../component/PageHero";
import { SERVICES, PROCESS_STEPS, FAQS, SITE } from "../data/siteData";
import { resolveIcon } from "../data/icons";

import "./Services.css";

/* =========================================================
   Services
   Everything we do around the seed: production, trials,
   testing, treatment, advisory and dealer support.
========================================================= */

function Services() {
  return (
    <div className="services-page">
      <PageHero
        eyebrow="Our Services"
        title="Support that runs the whole season"
        subtitle="Seed quality is where we start. Trials, lab testing, treatment and agronomy advisory are what keep the crop on track after sowing."
        breadcrumb="Services"
      />

      {/* =================================================
          SERVICE GRID
      ================================================= */}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What We Offer</span>
            <h2>Six services built for Indian farms</h2>
            <p>
              Each service can be used on its own or bundled with a seed
              order, and every one is delivered by our own team.
            </p>
          </div>

          <ul className="grid grid-3 services-grid">
            {SERVICES.map((service) => {
              const Icon = resolveIcon(service.icon);

              return (
                <li
                  key={service.slug}
                  className="card card-hover services-card"
                >
                  <span className="services-icon">
                    <Icon aria-hidden="true" />
                  </span>

                  <h3>{service.title}</h3>
                  <p>{service.text}</p>

                  <Link className="services-link" to="/contact">
                    Enquire now
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* =================================================
          DELIVERY PROCESS
      ================================================= */}

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How It Runs</span>
            <h2>From enquiry to harvest support</h2>
          </div>

          <ol className="grid grid-4 services-process">
            {PROCESS_STEPS.map((step) => (
              <li key={step.step} className="services-process-step">
                <span className="services-process-number">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* =================================================
          FAQ
      ================================================= */}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Common Questions</span>
            <h2>Answers before you enquire</h2>
          </div>

          <ul className="services-faq">
            {FAQS.map((item) => (
              <li key={item.q} className="card services-faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
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
            <h2>Need a service tailored to your season?</h2>
            <p>
              Tell us your crop, acreage and sowing window. We will map the
              right combination of varieties, testing and field advisory for
              your plot.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Start an Enquiry
              <FiArrowRight aria-hidden="true" />
            </Link>

            <a className="btn btn-ghost-light" href={`tel:${SITE.phone}`}>
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
