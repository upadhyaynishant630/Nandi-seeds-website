import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

import "./PageHero.css";

/* =========================================================
   PageHero
   Reusable inner-page banner. Keeps every sub page opening
   consistent: eyebrow, title, intro copy and breadcrumb.

   Usage:
   <PageHero
     eyebrow="About Us"
     title="Growing trust since 1994"
     subtitle="..."
     breadcrumb="About"
   />
========================================================= */

function PageHero({ eyebrow, title, subtitle, breadcrumb }) {
  const crumbs = Array.isArray(breadcrumb)
    ? breadcrumb
    : breadcrumb
      ? [breadcrumb]
      : [];

  return (
    <section className="page-hero">
      <span className="page-hero-glow" aria-hidden="true" />

      <div className="container page-hero-inner">
        {eyebrow ? (
          <span className="eyebrow eyebrow-on-dark">{eyebrow}</span>
        ) : null}

        <h1>{title}</h1>

        {subtitle ? <p className="page-hero-sub">{subtitle}</p> : null}

        {crumbs.length > 0 ? (
          <nav className="page-hero-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>

            {crumbs.map((crumb) => (
              <span key={crumb} className="page-hero-crumb">
                <FiChevronRight aria-hidden="true" />
                {crumb}
              </span>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}

export default PageHero;
