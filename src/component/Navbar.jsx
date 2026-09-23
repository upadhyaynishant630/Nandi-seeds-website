import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import { NAV_LINKS, SITE } from "../data/siteData";

import "./Navbar.css";

/* =========================================================
   Navbar
   Sticky header with a utility strip, desktop menu and a
   slide-in drawer for mobile. Link list comes from
   src/data/siteData.js so navigation stays in one place.
========================================================= */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* =====================================================
     SCROLL EFFECT
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     BODY SCROLL LOCK WHEN DRAWER IS OPEN
  ===================================================== */

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-is-open");
    } else {
      document.body.classList.remove("menu-is-open");
    }

    return () => {
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  /* =====================================================
     ESC KEY CLOSES THE DRAWER
  ===================================================== */

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* =================================================
          UTILITY STRIP
      ================================================= */}

      <div className="navbar-utility">
        <div className="container navbar-utility-inner">
          <span className="utility-item">
            <FiMapPin aria-hidden="true" />
            {SITE.addressLine3}
          </span>

          <div className="utility-right">
            <a className="utility-item" href={`tel:${SITE.phone}`}>
              <FiPhone aria-hidden="true" />
              {SITE.phone}
            </a>

            <a className="utility-item" href={`mailto:${SITE.email}`}>
              <FiMail aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      {/* =================================================
          MAIN BAR
      ================================================= */}

      <div className="navbar-container">
        <div className="container navbar-inner">
          {/* BRAND */}
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

          {/* DESKTOP / MOBILE NAVIGATION */}
          <nav
            id="main-navigation"
            className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}
            aria-label="Main navigation"
          >
            <div className="navbar-menu-head">
              <span>{SITE.tagline}</span>
              <button
                type="button"
                className="menu-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <FiX />
              </button>
            </div>

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

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-contact nav-contact-active" : "nav-contact"
              }
              onClick={closeMenu}
            >
              <span>Get in Touch</span>
            </NavLink>

            <div className="navbar-menu-foot">
              <a href={`tel:${SITE.phone}`}>
                <FiPhone aria-hidden="true" />
                {SITE.phone}
              </a>
            </div>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className={`mobile-menu-button ${
              menuOpen ? "menu-button-active" : ""
            }`}
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <button
        type="button"
        className={`navbar-overlay ${menuOpen ? "overlay-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
        tabIndex={-1}
      />
    </header>
  );
}

export default Navbar;
