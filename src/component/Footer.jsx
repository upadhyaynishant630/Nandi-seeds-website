import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowUp,
  FiArrowRight,
} from "react-icons/fi";

import { SITE, NAV_LINKS, SOCIAL_LINKS, SEED_CATEGORY_LINKS } from "../data/siteData";

import "./Footer.css";

/* =========================================================
   Footer
   Four column site footer: brand, quick links, seed range
   and contact details, plus a bottom copyright bar.
========================================================= */

const SOCIAL_ICONS = {
  facebook: FiFacebook,
  instagram: FiInstagram,
  linkedin: FiLinkedin,
  youtube: FiYoutube,
};

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
          {/* =================================================
              BRAND
          ================================================= */}

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img
                src="/images/logo/nandi-seeds-logo.png"
                alt={SITE.name}
                width="90"
                height="20"
              />
            </Link>

            <p className="footer-tagline">{SITE.tagline}</p>

            <p className="footer-description">
              Breeding, producing and delivering high-germination seed to
              Indian farms since {SITE.established}. Backed by lab testing,
              field trials and on-ground agronomy support.
            </p>

            <ul className="footer-socials">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                    >
                      {Icon ? <Icon /> : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <nav className="footer-column" aria-label="Quick links">
            <h3 className="footer-title">Company</h3>

            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <FiArrowRight aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact">
                  <FiArrowRight aria-hidden="true" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* =================================================
              SEED RANGE
          ================================================= */}

          <nav className="footer-column" aria-label="Seed range">
            <h3 className="footer-title">Seed Range</h3>

            <ul className="footer-links">
              {SEED_CATEGORY_LINKS.map((category) => (
                <li key={category.label}>
                  <Link to={category.to}>
                    <FiArrowRight aria-hidden="true" />
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="footer-column">
            <h3 className="footer-title">Reach Us</h3>

            <ul className="footer-contact">
              <li>
                <FiMapPin aria-hidden="true" />
                <span>
                  {SITE.addressLine1}
                  <br />
                  {SITE.addressLine2}
                  <br />
                  {SITE.addressLine3}
                </span>
              </li>

              <li>
                <FiPhone aria-hidden="true" />
                <span>
                  <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
                  <br />
                  <a href={`tel:${SITE.phoneAlt}`}>{SITE.phoneAlt}</a>
                </span>
              </li>

              <li>
                <FiMail aria-hidden="true" />
                <span>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </span>
              </li>
            </ul>

            <p className="footer-hours">{SITE.hours}</p>
          </div>
        </div>
      </div>

      {/* =================================================
          BOTTOM BAR
      ================================================= */}

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/about">About</Link>
            <Link to="/dealers">Become a Dealer</Link>

            <button
              type="button"
              className="footer-top-button"
              onClick={scrollToTop}
            >
              Back to top
              <FiArrowUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
