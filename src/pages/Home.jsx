import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiPhone,
  FiShield,
} from "react-icons/fi";

import {
  SITE,
  STATS,
  VALUES,
  SERVICES,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "../data/siteData";
import { PRODUCTS } from "../data/products";
import { resolveIcon } from "../data/icons";

import "./Home.css";

const HERO_SLIDES = [
  {
    src: "/images/hero/hero-field.jpg",
    alt: "Healthy crop standing in a Nandi Seeds trial field",
  },
  {
    src: "/images/gallery/field-demo.jpg",
    alt: "Nandi Seeds field demonstration",
  },
  {
    src: "/images/gallery/harvest-visit.jpg",
    alt: "Nandi Seeds harvest field visit",
  },
  {
    src: "/images/gallery/grower-meet.jpg",
    alt: "Nandi Seeds meeting with growers",
  },
];


/* =========================================================
   ANIMATED STAT COUNTER
   Counts up when the stat enters the viewport.
========================================================= */

function CountUp({ value, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) return undefined;

    let animationFrameId = null;
    let observer;

    const startCounting = () => {
      const prefersReducedMotion =
        window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        )?.matches ?? false;

      // Accessibility: show final value without animation.
      if (prefersReducedMotion) {
        setCount(value);
        return;
      }

      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        // Smooth ease-out animation.
        const easedProgress =
          1 - Math.pow(1 - progress, 3);

        const currentValue = Math.round(
          value * easedProgress
        );

        setCount(currentValue);

        if (progress < 1) {
          animationFrameId =
            requestAnimationFrame(updateCount);
        } else {
          setCount(value);
        }
      };

      animationFrameId =
        requestAnimationFrame(updateCount);
    };

    // Fallback for browsers without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
      startCounting();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            startCounting();
          }
        },
        {
          threshold: 0.35,
        }
      );

      observer.observe(element);
    }

    return () => {
      observer?.disconnect();

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value, duration]);

  const formattedValue = new Intl.NumberFormat("en-IN")
    .format(count);

  const finalValue = new Intl.NumberFormat("en-IN")
    .format(value);

  return (
    <strong
      ref={counterRef}
      aria-label={`${finalValue}${suffix}`}
      aria-live="off"
    >
      {formattedValue}{suffix}
    </strong>
  );
}

function HomeFeaturedProductCard({ product, isDuplicate = false }) {
  return (
    <li className="card card-hover home-product">
      <Link
        to={`/products/${product.slug}`}
        tabIndex={isDuplicate ? -1 : undefined}
      >
        <div className="home-product-media">
          {product.image && (
            <img
              src={product.image}
              alt={
                product.imageAlt ||
                `${product.name} ${product.crop || "seed"} packshot`
              }
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="home-product-body">
          <h3>{product.name}</h3>
        </div>
      </Link>
    </li>
  );
}


/* =========================================================
   Home
========================================================= */

function Home() {
  const featuredProducts = PRODUCTS;
  const previewServices = SERVICES.slice(0, 3);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselHovered, setCarouselHovered] = useState(false);
  const [carouselFocused, setCarouselFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pointerStart = useRef(null);
  const carouselPaused = carouselHovered || carouselFocused;
  const videoRef = useRef(null);
  const featuredTrackRef = useRef(null);
  const [canScrollFeaturedPrev, setCanScrollFeaturedPrev] = useState(false);
  const [canScrollFeaturedNext, setCanScrollFeaturedNext] = useState(true);

  const updateFeaturedCarouselButtons = useCallback(() => {
    const track = featuredTrackRef.current;
    if (!track) return;
    setCanScrollFeaturedPrev(track.scrollLeft > 4);
    setCanScrollFeaturedNext(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    );
  }, []);

  useEffect(() => {
    updateFeaturedCarouselButtons();
    window.addEventListener("resize", updateFeaturedCarouselButtons);
    return () =>
      window.removeEventListener("resize", updateFeaturedCarouselButtons);
  }, [updateFeaturedCarouselButtons]);

  const scrollFeaturedCarousel = (direction) => {
    const track = featuredTrackRef.current;
    if (!track) return;
    const firstCard = track.querySelector(".home-product");
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + 20
      : track.clientWidth * 0.75;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const showSlide = useCallback(
    (index) => {
      setActiveSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length);
    },
    [],
  );

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateMotionPreference = () => {
      setReducedMotion(motionPreference.matches);
    };

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (carouselPaused || reducedMotion || HERO_SLIDES.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
      }
    }, 5500);

    return () => window.clearInterval(interval);
  }, [carouselPaused, reducedMotion]);

  useEffect(() => {
    const nextSlide = HERO_SLIDES[(activeSlide + 1) % HERO_SLIDES.length];
    const image = new Image();
    image.src = nextSlide.src;
  }, [activeSlide]);

  return (
    <div className="home-page">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="home-hero">
        <span className="home-hero-glow" aria-hidden="true" />

        <div className="container home-hero-inner">
          <div className="home-hero-copy rise-in">
            <span className="eyebrow">
              <FiShield aria-hidden="true" />
              Trusted since {SITE.established}
            </span>

            <h1>
              Better seeds.{" "}
              <span className="home-hero-accent">Stronger harvests.</span>
            </h1>

            <p className="home-hero-text">
              Nandi Seeds breeds, tests and delivers high-germination hybrid
              and open-pollinated seed to farms across India, with lab
              reports for every batch and agronomists who stay with you
              through the season.
            </p>

            <div className="home-hero-actions">
              <Link className="btn btn-primary" to="/products">
                Explore Our Seeds
                <FiArrowRight aria-hidden="true" />
              </Link>

              <a className="btn btn-outline" href={`tel:${SITE.phone}`}>
                <FiPhone aria-hidden="true" />
                Talk to an Agronomist
              </a>
            </div>

            <ul className="home-hero-points tick-list">
              <li>
                <FiCheck aria-hidden="true" />
                85%+ guaranteed germination on certified lots
              </li>

              <li>
                <FiCheck aria-hidden="true" />
                Batch-wise purity and moisture test reports
              </li>

              <li>
                <FiCheck aria-hidden="true" />
                Free field advisory for every purchase
              </li>
            </ul>
          </div>

          {/* HERO VISUAL */}
          <div
            className="home-hero-visual rise-in"
            onMouseEnter={() => setCarouselHovered(true)}
            onMouseLeave={() => setCarouselHovered(false)}
            onFocusCapture={() => setCarouselFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setCarouselFocused(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                showSlide(activeSlide - 1);
              } else if (event.key === "ArrowRight") {
                event.preventDefault();
                showSlide(activeSlide + 1);
              }
            }}
            onPointerDown={(event) => {
              pointerStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (pointerStart.current === null) {
                return;
              }

              const swipeDistance =
                event.clientX - pointerStart.current;

              pointerStart.current = null;

              if (Math.abs(swipeDistance) > 45) {
                showSlide(
                  activeSlide + (swipeDistance < 0 ? 1 : -1),
                );
              }
            }}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
            role="region"
            aria-label="Hero image carousel"
            tabIndex={0}
          >
            <div className="media-frame hero-frame" aria-live="off">
              {HERO_SLIDES.map((slide, index) => (
                <div
                  className={`hero-slide ${index === activeSlide ? "hero-slide-active" : ""
                    }`}
                  key={slide.src}
                  aria-hidden={index !== activeSlide}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}

              <div className="media-placeholder hero-placeholder">
                Add /images/hero/hero-field.jpg
              </div>

              <button
                className="hero-slide-control hero-slide-previous"
                type="button"
                aria-label="Previous hero image"
                onClick={() => showSlide(activeSlide - 1)}
              >
                <FiArrowLeft aria-hidden="true" />
              </button>

              <button
                className="hero-slide-control hero-slide-next"
                type="button"
                aria-label="Next hero image"
                onClick={() => showSlide(activeSlide + 1)}
              >
                <FiArrowRight aria-hidden="true" />
              </button>

              <div
                className="hero-slide-indicators"
                aria-label="Hero images"
              >
                {HERO_SLIDES.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Show hero image ${index + 1}`}
                    aria-pressed={index === activeSlide}
                    className={
                      index === activeSlide
                        ? "hero-indicator-active"
                        : ""
                    }
                    onClick={() => showSlide(index)}
                  />
                ))}
              </div>
            </div>

            <div className="hero-float hero-float-a">
              <strong>120+</strong>
              <span>Varieties developed</span>
            </div>

            <div className="hero-float hero-float-b">
              <strong>8 Lakh+</strong>
              <span>Farmers served</span>
            </div>
          </div>
        </div>
      </section>


      {/* =================================================
    TRUST STATS - ANIMATED COUNTERS
================================================= */}

      <section className="home-stats">
        <div className="container">
          <ul className="home-stats-grid">
            {STATS.map((stat) => (
              <li key={stat.label} className="home-stat">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={1800}
                />

                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =================================================
          FEATURED SEEDS
      ================================================= */}
      <section className="section home-featured">
        <div className="container">
          {/* Section Heading */}
          <div className="section-head">
            <h2>Varieties farmers come back for</h2>

            <p>
              Every variety below is bred in-house, trialled across multiple
              locations and released only after it clears our germination
              and purity standards.
            </p>
          </div>
        </div>

        {/* Full-Width Manual Carousel */}
        <div
          className="home-featured-carousel"
          role="region"
          aria-label="Featured Pearl Millet varieties"
        >
          <button
            type="button"
            className="home-featured-nav home-featured-nav-prev"
            onClick={() => scrollFeaturedCarousel(-1)}
            disabled={!canScrollFeaturedPrev}
            aria-label="Previous varieties"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <ul
            ref={featuredTrackRef}
            className="home-product-grid home-featured-track"
            onScroll={updateFeaturedCarouselButtons}
          >
            {Array.isArray(featuredProducts) &&
              featuredProducts.map((product) => (
                <HomeFeaturedProductCard
                  key={product.slug}
                  product={product}
                />
              ))}
          </ul>

          <button
            type="button"
            className="home-featured-nav home-featured-nav-next"
            onClick={() => scrollFeaturedCarousel(1)}
            disabled={!canScrollFeaturedNext}
            aria-label="Next varieties"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="container">
          {/* Browse Full Catalogue */}
          <div className="home-featured-more">
            <Link className="btn btn-outline" to="/products">
              Browse the full catalogue
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          WHY CHOOSE US
      ================================================= */}

      <section className="section section-soft home-why">
        <div className="container">
          <div className="split">
            <div className="home-why-copy">
            

              <h2 className="home-why-title">
                Quality you can measure, not just promise
              </h2>

              <p className="home-why-text">
                Seed is the smallest input on a farm and the biggest driver
                of yield. We treat it that way, from the first breeder plot
                to the bag that reaches your dealer.
              </p>

              <ul className="tick-list home-why-list">
                <li>
                  <FiCheck aria-hidden="true" />
                  Independent lab testing on every released lot
                </li>

                <li>
                  <FiCheck aria-hidden="true" />
                  Traceable batch codes printed on every pack
                </li>

                <li>
                  <FiCheck aria-hidden="true" />
                  Replacement guarantee on germination shortfalls
                </li>

                <li>
                  <FiCheck aria-hidden="true" />
                  Carefully selected and quality-checked seed varieties
                </li>

                <li>
                  <FiCheck aria-hidden="true" />
                  Consistent quality standards across every batch
                </li>

                <li>
                  <FiCheck aria-hidden="true" />
                  Clear product information for easy variety selection
                </li>

                <li>
                  <FiCheck aria-hidden="true" />
                  Reliable packaging designed to protect seed quality
                </li>

                <li>
                  <FiCheck aria-hidden="true" />
                  Customer-focused support for product and usage queries
                </li>
              </ul>

              <Link
                className="btn btn-primary home-why-cta"
                to="/about"
              >
                About Nandi Seeds
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid grid-2 home-value-grid">
              {VALUES.slice(0, 4).map((value) => {
                const Icon = resolveIcon(value.icon);

                return (
                  <li
                    key={value.title}
                    className="card card-hover home-value"
                  >
                    <span className="home-value-icon">
                      <Icon aria-hidden="true" />
                    </span>

                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* =================================================
          HOW WE WORK
      ================================================= */}

      <section className="section home-process">
        <div className="container">
          <div className="section-head">
            
            <h2>From breeder plot to your field</h2>
            <p>
              Four controlled stages stand between a promising parent line
              and the pack that reaches your dealer counter.
            </p>
          </div>

          <ol className="grid grid-4 home-process-grid">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.step}
                className="home-process-step"
              >
                <span className="home-process-number">
                  {step.step}
                </span>

                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =================================================
          SERVICES PREVIEW
      ================================================= */}

      <section className="section section-green home-services">
        <div className="container">
          <div className="section-head">
           

            <h2>Services that protect your investment</h2>

            <p>
              Buying good seed is step one. We stay involved with trials,
              testing and field advisory so the crop actually performs.
            </p>
          </div>

          <ul className="grid grid-3 home-service-grid">
            {previewServices.map((service) => {
              const Icon = resolveIcon(service.icon);

              return (
                <li
                  key={service.slug}
                  className="home-service"
                >
                  <img
                    className="home-service-image"
                    src={service.image}
                    alt=""
                    loading="lazy"
                    aria-hidden="true"
                  />

                  <span className="home-service-icon">
                    <Icon aria-hidden="true" />
                  </span>

                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </li>
              );
            })}
          </ul>

          <div className="home-services-more">
            <Link
              className="btn btn-ghost-light"
              to="/services"
            >
              See all services
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          TESTIMONIALS
      ================================================= */}

      <section className="section home-testimonials">
        <div className="container">
          <div className="section-head">
           
            <h2>Results from the field</h2>
          </div>

          <ul className="grid grid-3 home-testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <li
                key={item.name}
                className="card home-testimonial"
              >
                <p className="home-testimonial-quote">
                  {item.quote}
                </p>

                <div className="home-testimonial-person">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                  <span className="home-testimonial-place">
                    {item.place}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div
            className="home-video-placeholder"
            aria-label="Nandi Seeds field demonstration video"
          >

            <video
              ref={videoRef}
              className="home-video"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
            >
              <source
                src="/videos/nandi-farmer-field.mp4"
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>


          </div>
        </div>
      </section>

      {/* =================================================
          CALL TO ACTION
      ================================================= */}

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Not sure which variety suits your soil?</h2>

            <p>
              Send us your district, soil type and sowing window. Our
              agronomy team will suggest the right varieties and share the
              closest dealer details.
            </p>
          </div>

          <div className="cta-band-actions">
            <Link className="btn btn-gold" to="/contact">
              Get a Recommendation
              <FiArrowRight aria-hidden="true" />
            </Link>

            <Link
              className="btn btn-ghost-light"
              to="/dealers"
            >
              Find a Dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;