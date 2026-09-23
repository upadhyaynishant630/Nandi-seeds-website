import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import PageHero from "../component/PageHero";
import {
  SITE,
  STATS,
  VALUES,
  PROCESS_STEPS,
  CERTIFICATIONS,
} from "../data/siteData";
import { resolveIcon } from "../data/icons";

import "./About.css";

/* =========================================================
   About
   Company story, mission, values, how we work and the
   certifications that back our quality claims.
========================================================= */

function About() {
  return (
    <div className="about-page">
      <PageHero
        eyebrow="About Us"
        title="Three decades of breeding seed that performs"
        subtitle={`What began in ${SITE.established} as a single breeder plot is today a full seed programme: research, contract growing, processing, testing and field advisory under one roof.`}
        breadcrumb="About"
      />

      {/* =================================================
          STORY
      ================================================= */}

      <section className="section">
        <div className="container split">
          <div className="about-story-copy">
            <span className="eyebrow">Our Story</span>

            <h2 className="about-title">
              Built around one simple promise: the seed must germinate
            </h2>

            <p className="about-text">
              Nandi Seeds started with a small group of growers who were tired
              of paying premium prices for seed that failed in the field. We
              began multiplying our own certified lines, testing every lot in
              our own lab and selling only what cleared the standard.
            </p>

            <p className="about-text">
              That approach scaled. Today we run a research and breeding
              programme across vegetables, cereals, pulses, oilseeds and
              fodder, supported by contracted growers, a processing and
              grading facility, and an agronomy team that visits farms
              through the season.
            </p>

            <ul className="tick-list about-points">
              <li>
                <FiCheck aria-hidden="true" />
                In-house breeding and nucleus seed maintenance
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                Contracted multiplication with supervised isolation
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                Batch-level traceability from field to dealer
              </li>
            </ul>

            <Link className="btn btn-primary about-cta" to="/products">
              See Our Varieties
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="about-media">
            <div className="media-frame">
              <img
                src="/images/about/seed-facility.jpg"
                alt="Nandi Seeds processing and grading facility"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="media-placeholder about-placeholder">
              Add /images/about/seed-facility.jpg
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          STATS
      ================================================= */}

      <section className="about-stats">
        <div className="container about-stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="about-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
      {/* =================================================
          MISSION & VISION
      ================================================= */}

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What Drives Us</span>
            <h2>Mission and vision</h2>
          </div>

          <div className="grid grid-2 about-mission-grid">
            <article className="card about-mission">
              <h3>Our Mission</h3>
              <p>
                To put reliably germinating, honestly priced seed in the hands
                of every Indian farmer, backed by advisory that helps convert
                that seed into a better harvest.
              </p>
            </article>

            <article className="card about-mission">
              <h3>Our Vision</h3>
              <p>
                To be the seed brand growers trust across every major
                agro-climatic zone, recognised for genetic integrity,
                transparent lab reporting and field-level support.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =================================================
          VALUES
      ================================================= */}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Standards</span>
            <h2>Six things we refuse to compromise on</h2>
            <p>
              These are the operating rules behind every variety we release
              and every bag that leaves our facility.
            </p>
          </div>

          <ul className="grid grid-3 about-value-grid">
            {VALUES.map((value) => {
              const Icon = resolveIcon(value.icon);

              return (
                <li key={value.title} className="card card-hover about-value">
                  <span className="about-value-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* =================================================
          HOW WE WORK + CERTIFICATIONS
      ================================================= */}

      <section className="section section-soft">
        <div className="container split about-process-split">
          <div>
            <span className="eyebrow">How We Work</span>
            <h2 className="about-title">Quality control at every stage</h2>

            <ol className="about-process-list">
              {PROCESS_STEPS.map((step) => (
                <li key={step.step}>
                  <span className="about-process-step">{step.step}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="card about-cert">
            <h3>Compliance &amp; Trust</h3>

            <p>
              Our facility and processes are audited against the standards
              below. Test reports are shared with every shipment.
            </p>

            <ul className="tick-list about-cert-list">
              {CERTIFICATIONS.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <Link className="btn btn-outline about-cert-cta" to="/contact">
              Request Test Reports
            </Link>
          </aside>
        </div>
      </section>

      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Partner with a seed company that shows its data</h2>
            <p>
              Whether you farm a few acres or distribute across a state, we
              will share variety-wise trial results and test reports before
              you commit.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Talk to Our Team
              <FiArrowRight aria-hidden="true" />
            </Link>

            <Link className="btn btn-ghost-light" to="/dealers">
              Become a Dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
