
import { useState } from "react";
import {
  FiChevronRight,
  FiCheckCircle,
  FiTool,
  FiFeather,
  FiShield,
  FiTarget,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import "./About.css";

const ABOUT_SECTIONS = [
  {
    id: "research",
    label: "R&D",
    icon: FiTarget,
    title: "Growing a Healthier Tomorrow",
    text: "Nandi Seeds is committed to developing high-quality, high-yielding seeds that empower farmers and contribute to a more food-secure future. Through continuous research, advanced production practices and a passion for agriculture, we deliver innovative seed solutions for a healthier, stronger tomorrow.",
    image: "/images/hero/hero-field.jpg",
    alt: "Healthy green agricultural crop field",
    points: [
      "Multi-location trials for reliable field performance",
      "Breeding focused on Indian growing conditions",
      "Research focused on yield potential and crop suitability",
    ],
    detailTitle: "Research That Starts in the Field",
    detailText:
      "We focus on understanding crop requirements, local growing conditions and farmer needs to guide the development and evaluation of dependable seed varieties.",
  },
  {
    id: "quality",
    label: "Quality",
    icon: FiShield,
    title: "Quality You Can Trust",
    text: "Every Nandi Seeds lot is handled with care and tested before it reaches a farmer. From genetic purity and germination to moisture and physical purity, our quality team checks the details that protect your crop investment.",
    image: "/images/about/seed-facility.jpg",
    alt: "Seed quality testing and processing facility",
    points: [
      "Lot-wise germination and purity testing",
      "Careful moisture and physical quality checks",
      "Batch identification and quality-focused packaging",
    ],
    detailTitle: "Quality at Every Stage",
    detailText:
      "From seed selection and processing to final packaging, our quality-focused approach aims to maintain consistency, seed integrity and confidence at every stage.",
  },
  {
    id: "factory",
    label: "Factory",
    icon: FiTool,
    title: "Modern Processing, Honest Results",
    text: "Our processing facility combines calibrated cleaning, grading, treatment and packing lines with experienced people. This careful process protects seed vigour, removes unwanted material and ensures every pack is ready for the field.",
    image: "/images/gallery/processing-unit.jpg",
    alt: "Modern seed processing and grading unit",
    points: [
      "Calibrated cleaning, grading and treatment",
      "Careful processing to help protect seed vigour",
      "Moisture-conscious packing and batch identification",
    ],
    detailTitle: "Precision in Every Process",
    detailText:
      "A well-managed processing workflow helps maintain seed quality. Cleaning, grading, treatment and packaging are important steps in preparing seeds for farmers.",
  },
  {
    id: "products",
    label: "Products",
    icon: FiFeather,
    title: "Seeds for Every Growing Season",
    text: "Our portfolio brings together dependable vegetable, cereal, pulse, oilseed and fodder varieties. Each product is selected for useful agronomic traits, consistent performance and the practical needs of Indian farmers.",
    image: "/images/products/maize-hybrid-nandi-555.jpg",
    alt: "Healthy maize crop growing in an agricultural field",
    points: [
      "Vegetable, cereal, pulse, oilseed and fodder varieties",
      "Products selected for practical cultivation needs",
      "Varieties supported by relevant agronomy information",
    ],
    detailTitle: "The Right Seeds for Every Season",
    detailText:
      "Explore our diverse seed portfolio and discover varieties suited to different crops, growing seasons and farming requirements.",
  },
];

const hideUnavailableImage = (event) => {
  event.currentTarget.style.display = "none";
};

function About() {
  const [activeSection, setActiveSection] = useState("research");

  const active =
    ABOUT_SECTIONS.find((section) => section.id === activeSection) ||
    ABOUT_SECTIONS[0];

  const ActiveIcon = active.icon;

  return (
    <div className="about-page about-showcase">
      <div className="about-showcase-layout">

        {/* SIDEBAR NAVIGATION */}
        <aside
          className="about-showcase-tabs"
          aria-label="About Nandi Seeds sections"
        >
          <p className="about-tabs-label">Discover Nandi Seeds</p>

          <div className="about-tabs-list">
            {ABOUT_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = section.id === activeSection;

              return (
                <button
                  type="button"
                  key={section.id}
                  className={`about-tab ${
                    isActive ? "about-tab-active" : ""
                  }`}
                  onClick={() => setActiveSection(section.id)}
                  aria-pressed={isActive}
                  aria-controls="about-active-panel"
                >
                  <Icon aria-hidden="true" />

                  <span>{section.label}</span>

                  <FiChevronRight
                    className="about-tab-arrow"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="about-sidebar-bottom">
            <span className="about-sidebar-line" />
            <p>Growing trust. Cultivating tomorrow.</p>

            <Link className="about-showcase-link" to="/contact">
              Talk to our team
              <FiChevronRight aria-hidden="true" />
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="about-showcase-content">

          {/* HERO SECTION */}
          <section
            className="about-showcase-hero"
            aria-labelledby="about-main-heading"
          >
            <img
              src="/images/hero/hero-field.jpg"
              alt="Nandi Seeds agricultural field"
              onError={hideUnavailableImage}
              fetchPriority="high"
            />

            <div className="about-hero-content">
              <span className="about-kicker">ABOUT NANDI SEEDS</span>

              <h1 id="about-main-heading">
                Rooted in trust.
                <br />
                <em>Grown for tomorrow.</em>
              </h1>

              <p>
                Reliable seed solutions, from our research fields
                to your harvest.
              </p>
            </div>

            <div className="about-hero-bottom">
              <span>QUALITY</span>
              <span className="about-hero-dot" />
              <span>INNOVATION</span>
              <span className="about-hero-dot" />
              <span>GROWTH</span>
            </div>
          </section>

          {/* DYNAMIC ABOUT SECTION */}
          <section
            id="about-active-panel"
            className="about-showcase-panel"
            key={active.id}
            aria-live="polite"
            aria-labelledby="about-panel-heading"
          >
            {/* TEXT CONTENT */}
            <div className="about-showcase-copy">

              <div className="about-panel-heading">
                <div className="about-panel-icon">
                  <ActiveIcon aria-hidden="true" />
                </div>

                <div>
                  <span className="about-kicker">
                    {active.label}
                  </span>

                  <h2 id="about-panel-heading">
                    {active.title}
                  </h2>
                </div>
              </div>

              <p className="about-panel-description">
                {active.text}
              </p>

              {/* KEY HIGHLIGHTS */}
              <ul className="about-showcase-points">
                {active.points.map((point) => (
                  <li key={point}>
                    <FiCheckCircle aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* ADDITIONAL SUBSECTION */}
              <div className="about-showcase-extra">
                <span className="about-extra-label">
                  OUR APPROACH
                </span>

                <h3>{active.detailTitle}</h3>

                <p>{active.detailText}</p>
              </div>

              {/* ACTION LINK */}
              <Link
                className="about-panel-link"
                to={
                  active.id === "products"
                    ? "/products"
                    : "/contact"
                }
              >
                {active.id === "products"
                  ? "Explore our products"
                  : "Learn more about us"}

                <FiChevronRight aria-hidden="true" />
              </Link>
            </div>

            {/* IMAGE */}
            <div className="about-showcase-image">
              <img
                src={active.image}
                alt={active.alt}
                onError={hideUnavailableImage}
                loading="lazy"
              />

            
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default About;
