import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUp, FiMessageCircle, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { SITE } from "../data/siteData";

import "./FloatingSocial.css";

/* =========================================================
   FloatingSocial
   Sticky quick-action rail (WhatsApp, call, back to top).
   Appears after a small scroll so it never covers the hero.

   Visibility is derived purely from the scroll position:
   ScrollToTop resets the window to the top on every route
   change, which fires a scroll event and hides the rail
   again. That keeps this component free of route state.
========================================================= */

function FloatingSocial() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `Hello ${SITE.name}, I would like to know more about your seed varieties.`
  )}`;

  return (
    <div className={`floating-rail ${visible ? "rail-visible" : ""}`}>
      <a
        className="floating-button floating-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
        <span className="floating-tooltip">Chat on WhatsApp</span>
      </a>

      <a
        className="floating-button floating-call"
        href={`tel:${SITE.phone}`}
        aria-label={`Call ${SITE.phone}`}
      >
        <FiPhone />
        <span className="floating-tooltip">Call us</span>
      </a>

      <Link
        className="floating-button floating-enquiry"
        to="/contact"
        aria-label="Send an enquiry"
      >
        <FiMessageCircle />
        <span className="floating-tooltip">Send enquiry</span>
      </Link>

      <button
        type="button"
        className="floating-button floating-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FiArrowUp />
        <span className="floating-tooltip">Back to top</span>
      </button>
    </div>
  );
}

export default FloatingSocial;
