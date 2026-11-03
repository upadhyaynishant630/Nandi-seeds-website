
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

import { NAV_LINKS, SITE } from "../data/siteData";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // BODY SCROLL LOCK
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  // ESC KEY CLOSE
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // CLOSE MENU
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ACTIVE NAVIGATION LINK
  const navClass = ({ isActive }) =>
    isActive
      ? "nav-link nav-link-active"
      : "nav-link";

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >

      {/* =========================================
          TOP UTILITY BAR
      ========================================= */}

      <div className="navbar-utility">
        <div className="container navbar-utility-inner">

          <span className="utility-item utility-address">
            <FiMapPin aria-hidden="true" />
            <span>{SITE.addressLine3}</span>
          </span>

          <div className="utility-right">

            <a
              className="utility-item"
              href={`tel:${SITE.phone}`}
            >
              <FiPhone aria-hidden="true" />
              <span>{SITE.phone}</span>
            </a>

            <a
              className="utility-item"
              href={`mailto:${SITE.email}`}
            >
              <FiMail aria-hidden="true" />
              <span>{SITE.email}</span>
            </a>

          </div>
        </div>
      </div>

      {/* =========================================
          MAIN NAVIGATION BAR
      ========================================= */}

      <div className="navbar-container">

        <div className="container navbar-inner">

          {/* LEFT: NANDI SEEDS LOGO */}

          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMenu}
            aria-label={`${SITE.name} home`}
          >
            <img
              src="/images/logo/nandi-seeds-logo.png"
              alt={SITE.name}
              width="190"
              height="46"
            />
          </Link>

          {/* CENTER: DESKTOP NAVIGATION */}

          <nav
            id="main-navigation"
            className={`navbar-menu ${
              menuOpen ? "menu-open" : ""
            }`}
            aria-label="Main navigation"
          >

            {/* MOBILE DRAWER HEADER */}

            <div className="navbar-menu-head">

              <span>{SITE.tagline}</span>

              <button
                type="button"
                className="menu-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <FiX aria-hidden="true" />
              </button>

            </div>

            {/* NAVIGATION LINKS */}

            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navClass}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}

            {/* CONTACT BUTTON */}

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "nav-contact nav-contact-active"
                  : "nav-contact"
              }
              onClick={closeMenu}
            >
              <span>Get in Touch</span>
            </NavLink>

            {/* MOBILE DRAWER FOOTER */}

            <div className="navbar-menu-foot">

              <a href={`tel:${SITE.phone}`}>
                <FiPhone aria-hidden="true" />
                <span>{SITE.phone}</span>
              </a>

              <a href={`mailto:${SITE.email}`}>
                <FiMail aria-hidden="true" />
                <span>{SITE.email}</span>
              </a>

            </div>

          </nav>

          {/* =====================================
              RIGHT SIDE: BIOSTADT + MENU BUTTON
          ===================================== */}

          <div className="navbar-actions">

            {/* ORIGINAL BIOSTADT LOGO */}

            <div className="navbar-biostand">
              <img
                src="/images/logo/Biostand-logo.png"
                alt="BIOSTADT"
                width="384"
                height="110"
              />
            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              className={`mobile-menu-button ${
                menuOpen ? "menu-button-active" : ""
              }`}
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
            >
              {menuOpen ? (
                <FiX aria-hidden="true" />
              ) : (
                <FiMenu aria-hidden="true" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* =========================================
          MOBILE BACKGROUND OVERLAY
      ========================================= */}

      <button
        type="button"
        className={`navbar-overlay ${
          menuOpen ? "overlay-visible" : ""
        }`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        aria-hidden={!menuOpen}
      />

    </header>
  );
}

export default Navbar;
