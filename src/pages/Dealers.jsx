import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiTruck,
  FiTrendingUp,
  FiHeadphones,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";

import PageHero from "../component/PageHero";
import { STATS, SITE } from "../data/siteData";
import { submitEnquiry, validateEnquiry } from "../utils/submitEnquiry";

import "./Dealers.css";

/* =========================================================
   Dealers
   Partnership pitch plus a dealer application form. The form
   posts to the same backend endpoint with formType "dealer".
========================================================= */

const INITIAL_FORM = {
  formType: "dealer",
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  district: "",
  state: "",
  monthlyVolume: "Under 500 kg",
  message: "",
};

const VOLUME_OPTIONS = [
  "Under 500 kg",
  "500 kg - 2 tonnes",
  "2 - 10 tonnes",
  "Above 10 tonnes",
];

const PARTNER_BENEFITS = [
  {
    icon: FiTag,
    title: "Protected Territory",
    text: "Defined district or taluka rights so your investment in the brand is not undercut by parallel supply.",
  },
  {
    icon: FiTrendingUp,
    title: "Healthy Margins",
    text: "Uniform slab-based pricing across the network, with volume incentives settled at the end of each season.",
  },
  {
    icon: FiTruck,
    title: "Reliable Supply",
    text: "Season-wise stock planning and dispatch from our facility, with priority allocation for registered dealers.",
  },
  {
    icon: FiHeadphones,
    title: "Marketing & Training",
    text: "Branding kits, demo plot support, farmer meet sponsorship and product training for your counter staff.",
  },
];

const LEAD_FIELDS = ["fullName", "phone", "email", "businessName"];

function Dealers() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  /* =====================================================
     FIELD CHANGE
  ===================================================== */

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormValues((previous) => ({ ...previous, [name]: value }));

    setErrors((previous) => {
      if (!previous[name]) {
        return previous;
      }

      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateEnquiry(formValues);

    LEAD_FIELDS.forEach((field) => {
      if (!formValues[field] || formValues[field].trim().length < 2) {
        validationErrors[field] = "This field is required.";
      }
    });

    if (!formValues.district || formValues.district.trim().length < 2) {
      validationErrors.district = "Please enter your district.";
    }

    if (!formValues.state || formValues.state.trim().length < 2) {
      validationErrors.state = "Please enter your state.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setFeedback("Please complete the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const result = await submitEnquiry(formValues);

      setStatus("success");
      setFeedback(result.message);
      setFormValues(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setFeedback(error.message);
    }
  };

  return (
    <div className="dealers-page">
      <PageHero
        eyebrow="Dealership"
        title="Sell seed with a brand that stands behind it"
        subtitle="We are expanding our authorised dealer network across India. If you already serve farmers in your district, we would like to work with you."
        breadcrumb="Dealers"
      />

      {/* =================================================
          PARTNER BENEFITS
      ================================================= */}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Partner With Us</span>
            <h2>What you get as an authorised dealer</h2>
            <p>
              Our network runs on trust both ways: you get protected
              territory and reliable supply, and we get a partner who
              represents the brand honestly.
            </p>
          </div>

          <ul className="grid grid-4 dealers-benefits">
            {PARTNER_BENEFITS.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <li key={benefit.title} className="card card-hover dealers-benefit">
                  <span className="dealers-benefit-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* =================================================
          NETWORK BAND
      ================================================= */}

      <section className="dealers-network">
        <div className="container dealers-network-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="dealers-network-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================
          APPLICATION FORM
      ================================================= */}

      <section className="section">
        <div className="container dealers-apply">
          <div className="dealers-form-wrap">
            <h2>Apply for a dealership</h2>

            <p className="dealers-subtext">
              Our regional manager reviews every application and responds
              within three working days.
            </p>

            {status === "success" ? (
              <p className="contact-alert contact-alert-success" role="status">
                <FiCheckCircle aria-hidden="true" />
                {feedback}
              </p>
            ) : null}

            {status === "error" && feedback ? (
              <p className="contact-alert contact-alert-error" role="alert">
                <FiAlertCircle aria-hidden="true" />
                {feedback}
              </p>
            ) : null}

            <form className="dealers-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label className="form-field">
                  <span>
                    Full Name <em>*</em>
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={updateField}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.fullName ? (
                    <small className="form-error">{errors.fullName}</small>
                  ) : null}
                </label>

                <label className="form-field">
                  <span>
                    Business / Shop Name <em>*</em>
                  </span>
                  <input
                    type="text"
                    name="businessName"
                    value={formValues.businessName}
                    onChange={updateField}
                    placeholder="Agro agency name"
                    autoComplete="organization"
                  />
                  {errors.businessName ? (
                    <small className="form-error">{errors.businessName}</small>
                  ) : null}
                </label>
              </div>

              <div className="form-row">
                <label className="form-field">
                  <span>
                    Phone <em>*</em>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={updateField}
                    placeholder="+91 90000 00000"
                    autoComplete="tel"
                  />
                  {errors.phone ? (
                    <small className="form-error">{errors.phone}</small>
                  ) : null}
                </label>

                <label className="form-field">
                  <span>
                    Email <em>*</em>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={updateField}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email ? (
                    <small className="form-error">{errors.email}</small>
                  ) : null}
                </label>
              </div>

              <div className="form-row">
                <label className="form-field">
                  <span>
                    District <em>*</em>
                  </span>
                  <input
                    type="text"
                    name="district"
                    value={formValues.district}
                    onChange={updateField}
                    placeholder="Your district"
                  />
                  {errors.district ? (
                    <small className="form-error">{errors.district}</small>
                  ) : null}
                </label>

                <label className="form-field">
                  <span>
                    State <em>*</em>
                  </span>
                  <input
                    type="text"
                    name="state"
                    value={formValues.state}
                    onChange={updateField}
                    placeholder="Your state"
                    autoComplete="address-level1"
                  />
                  {errors.state ? (
                    <small className="form-error">{errors.state}</small>
                  ) : null}
                </label>
              </div>

              <label className="form-field">
                <span>Expected Monthly Volume</span>
                <select
                  name="monthlyVolume"
                  value={formValues.monthlyVolume}
                  onChange={updateField}
                >
                  {VOLUME_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>
                  Tell Us About Your Business <em>*</em>
                </span>
                <textarea
                  name="message"
                  rows="5"
                  value={formValues.message}
                  onChange={updateField}
                  placeholder="Years in the trade, crops you already supply, farmers you serve and any brands you stock."
                />
                {errors.message ? (
                  <small className="form-error">{errors.message}</small>
                ) : null}
              </label>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === "loading"}
              >
                <FiSend aria-hidden="true" />
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>

          {/* =================================================
              REQUIREMENTS SIDE PANEL
          ================================================= */}

          <aside className="dealers-side">
            <div className="card dealers-side-card">
              <h3>What we look for</h3>

              <ul className="dealers-side-list">
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  An existing fertiliser, pesticide or farm-input counter
                  with a farmer customer base
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  Valid GST registration and a bank account in the business
                  name
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  Storage space that keeps seed dry, ventilated and off the
                  floor
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  Willingness to run demo plots and farmer meets each season
                </li>
              </ul>
            </div>

            <div className="dealers-contact-note">
              <strong>Prefer to talk first?</strong>
              <p>
                Call our dealer desk on{" "}
                <a href={`tel:${SITE.phone}`}>{SITE.phone}</a> or write to{" "}
                <a href={`mailto:${SITE.salesEmail}`}>{SITE.salesEmail}</a>.
                We can share the current open territories in your state.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>See what you would be selling</h2>
            <p>
              Review our full variety list with germination and maturity
              data before you take on a territory.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/products">
              View Seed Range
              <FiArrowRight aria-hidden="true" />
            </Link>

            <Link className="btn btn-ghost-light" to="/services">
              Dealer Support Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dealers;
