import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiChevronDown,
  FiMail,
  FiMenu,
  FiPhone,
  FiX,
} from "react-icons/fi";

import { NAV_LINKS, SITE } from "../data/siteData";
import { SEED_CATEGORIES } from "../data/products";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const productCategories = SEED_CATEGORIES.filter(
    (category) => category !== "All",
  );

  // Keep the existing sticky-header behaviour.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent the page behind the mobile drawer from scrolling.
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  // Close the mobile menu and category dropdown with Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setProductsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  const navClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  const categoryPath = (category) =>
    `/products?category=${encodeURIComponent(category)}`;

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-inner">
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

          {/* MAIN NAVIGATION */}
          <nav
            id="main-navigation"
            className={`navbar-menu ${menuOpen ? "menu-open" : ""}`}
            aria-label="Main navigation"
          >
            {/* MOBILE DRAWER HEADER */}
            <div className="navbar-menu-head">
              <Link
                to="/"
                className="navbar-menu-logo"
                onClick={closeMenu}
                aria-label="Go to Nandi Seeds Home"
              >
                <img
                  src="/images/logo/nandi-seeds-logo.png"
                  alt={SITE.name}
                  width="190"
                  height="46"
                />
              </Link>

              <button
                type="button"
                className="menu-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            {/* NAVIGATION LINKS + DATA-DRIVEN PRODUCTS DROPDOWN */}
            {NAV_LINKS.map((link) => {
              if (link.to === "/products") {
                return (
                  <div
                    className={`nav-products ${productsOpen ? "nav-products-open" : ""}`}
                    key={link.to}
                  >
                    <div className="nav-products-trigger">
                      <NavLink
                        to={link.to}
                        className={navClass}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </NavLink>

                      <button
                        type="button"
                        className="nav-products-toggle"
                        onClick={() => setProductsOpen((open) => !open)}
                        aria-label="Toggle product categories"
                        aria-expanded={productsOpen}
                        aria-controls="navbar-product-categories"
                      >
                        <FiChevronDown aria-hidden="true" />
                      </button>
                    </div>

                    <div
                      className="nav-products-dropdown"
                      id="navbar-product-categories"
                    >
                      <NavLink
                        to="/products"
                        end
                        className="nav-products-dropdown-link"
                        onClick={closeMenu}
                      >
                        All Products
                      </NavLink>

                      {productCategories.map((category) => (
                        <Link
                          key={category}
                          to={categoryPath(category)}
                          className="nav-products-dropdown-link"
                          onClick={closeMenu}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navClass}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              );
            })}

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

          {/* RIGHT SIDE: BIOSTADT + MOBILE MENU BUTTON */}
          <div className="navbar-actions">
            <div className="navbar-biostand">
              <img
                src="/images/logo/Biostand-logo.png"
                alt="BIOSTADT"
                width="384"
                height="110"
              />
            </div>

            <button
              type="button"
              className={`mobile-menu-button ${menuOpen ? "menu-button-active" : ""}`}
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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

      {/* MOBILE BACKGROUND OVERLAY */}
      <button
        type="button"
        className={`navbar-overlay ${menuOpen ? "overlay-visible" : ""}`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        aria-hidden={!menuOpen}
      />
    </header>
  );
}

export default Navbar;
