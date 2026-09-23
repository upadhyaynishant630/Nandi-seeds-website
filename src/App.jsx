import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import FloatingSocial from "./component/FloatingSocial";
import ScrollToTop from "./component/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Dealers from "./pages/Dealers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import "./App.css";

/* =========================================================
   App
   Root layout: global chrome (skip link, navbar, floating
   rail, footer) wrapped around the route table.
========================================================= */

function App() {
  return (
    <div className="app">
      {/* =================================================
          ACCESSIBILITY SKIP LINK
      ================================================= */}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* =================================================
          RESET SCROLL ON ROUTE CHANGE
      ================================================= */}

      <ScrollToTop />

      {/* =================================================
          HEADER
      ================================================= */}

      <Navbar />

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main id="main" className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/products" element={<Products />} />

          <Route path="/products/:slug" element={<ProductDetail />} />

          <Route path="/services" element={<Services />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/dealers" element={<Dealers />} />

          <Route path="/contact" element={<Contact />} />

          {/* =============================================
              FALLBACK
          ============================================= */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

      {/* =================================================
          FLOATING QUICK ACTIONS
      ================================================= */}

      <FloatingSocial />
    </div>
  );
}

export default App;
