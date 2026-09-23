import { useState } from "react";
import {
  FiSend,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import PageHero from "../component/PageHero";
import { SITE } from "../data/siteData";
import { submitEnquiry, validateEnquiry } from "../utils/submitEnquiry";

import "./Contact.css";

/* =========================================================
   Contact
   Enquiry form plus full contact details. Posts to the
   Express backend at POST /api/contact.
========================================================= */

const INITIAL_FORM = {
  formType: "contact",
  fullName: "",
  email: "",
  phone: "",
  subject: "Seed Enquiry",
  message: "",
};

const SUBJECT_OPTIONS = [
  "Seed Enquiry",
  "Bulk / Institutional Order",
  "Dealer Enquiry",
  "Agronomy Support",
  "Other",
];

function Contact() {
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setFeedback("Please correct the highlighted fields and try again.");
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
    <div className="contact-page">
      <PageHero
        eyebrow="Contact Us"
        title="Talk to the Nandi Seeds team"
        subtitle="Send us your requirement and our team will respond within one working day. For urgent field issues, please call the sales desk directly."
        breadcrumb="Contact"
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-form-wrap">
            <h2 className="contact-heading">Send an enquiry</h2>

            <p className="contact-subtext">
              Fields marked with <span className="contact-required">*</span>{" "}
              are required.
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

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
              </div>

              <div className="form-row">
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

                <label className="form-field">
                  <span>Subject</span>
                  <select
                    name="subject"
                    value={formValues.subject}
                    onChange={updateField}
                  >
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="form-field">
                <span>
                  Message <em>*</em>
                </span>
                <textarea
                  name="message"
                  rows="6"
                  value={formValues.message}
                  onChange={updateField}
                  placeholder="Tell us your crop, acreage and location so we can advise accurately."
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
                {status === "loading" ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </div>

          {/* =================================================
              CONTACT DETAILS
          ================================================= */}

          <aside className="contact-aside">
            <div className="card contact-card">
              <h3>Reach us directly</h3>

              <ul className="contact-list">
                <li>
                  <span className="contact-icon">
                    <FiMapPin aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Registered Office</strong>
                    <p>
                      {SITE.addressLine1}
                      <br />
                      {SITE.addressLine2}
                      <br />
                      {SITE.addressLine3}
                    </p>
                  </div>
                </li>

                <li>
                  <span className="contact-icon">
                    <FiPhone aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Phone</strong>
                    <p>
                      <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
                      <br />
                      <a href={`tel:${SITE.phoneAlt}`}>{SITE.phoneAlt}</a>
                    </p>
                  </div>
                </li>

                <li>
                  <span className="contact-icon">
                    <FiMail aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Email</strong>
                    <p>
                      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                      <br />
                      <a href={`mailto:${SITE.salesEmail}`}>
                        {SITE.salesEmail}
                      </a>
                    </p>
                  </div>
                </li>

                <li>
                  <span className="contact-icon">
                    <FiClock aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Office Hours</strong>
                    <p>{SITE.hours}</p>
                  </div>
                </li>
              </ul>

              <a
                className="btn btn-outline btn-block contact-map-cta"
                href={SITE.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiMapPin aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>

            <div className="contact-note">
              <strong>Need an immediate response?</strong>
              <p>
                WhatsApp us on {SITE.phone} with your crop and location and
                our agronomy desk will get back to you the same day.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Contact;
