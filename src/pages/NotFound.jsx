import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";

import "./NotFound.css";

/* =========================================================
   NotFound
   Fallback route shown for any unmatched URL.
========================================================= */

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="container notfound-inner">
        <span className="notfound-code" aria-hidden="true">
          404
        </span>

        <h1>This page has not sprouted</h1>

        <p className="notfound-text">
          The link you followed does not exist, or the page has been moved.
          Head back to the home page or jump straight into the seed
          catalogue.
        </p>

        <div className="notfound-actions">
          <Link className="btn btn-primary" to="/">
            <FiHome aria-hidden="true" />
            Back to Home
          </Link>

          <Link className="btn btn-outline" to="/products">
            <FiSearch aria-hidden="true" />
            Browse Seeds
          </Link>
        </div>

        <Link className="notfound-link" to="/contact">
          <FiArrowLeft aria-hidden="true" />
          Or contact our team directly
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
