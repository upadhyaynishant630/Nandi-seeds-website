import { useEffect } from "react";

const MOTION_SELECTOR = "[data-motion]";
const TEXT_MOTION_SELECTOR = "[data-text-motion]";
const AUTO_MOTION_SELECTOR = [
  ".section-head",
  ".card",
  ".media-frame",
  ".cta-band-inner",
  ".footer-brand",
  ".footer-column",
  ".home-stat",
  ".hero-float",
].join(", ");

function prepareMotionElements(root) {
  const elements = root.querySelectorAll(
    `${MOTION_SELECTOR}, ${AUTO_MOTION_SELECTOR}, ${TEXT_MOTION_SELECTOR}`,
  );

  elements.forEach((element) => {
    if (
      !element.hasAttribute("data-motion") &&
      !element.hasAttribute("data-text-motion")
    ) {
      element.setAttribute("data-motion", "fade-up");
    }

    if (!element.style.getPropertyValue("--motion-delay")) {
      const siblings = element.parentElement?.children;
      const index = siblings
        ? Array.prototype.indexOf.call(siblings, element)
        : 0;

      if (index > 0) {
        element.style.setProperty(
          "--motion-delay",
          `${Math.min(index, 5) * 70}ms`,
        );
      }
    }
  });

  root
    .querySelectorAll("h1, h2, h3, .eyebrow")
    .forEach((element) => element.setAttribute("data-text-motion", ""));

  if (root.nodeType === Node.ELEMENT_NODE) {
    if (root.matches("h1, h2, h3, .eyebrow")) {
      root.setAttribute("data-text-motion", "");
    }
  }
}

function ScrollAnimator() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    prepareMotionElements(document);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll(
          `${MOTION_SELECTOR}, ${AUTO_MOTION_SELECTOR}, ${TEXT_MOTION_SELECTOR}`,
        )
        .forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    const observeMotionElements = (scope) => {
      prepareMotionElements(scope);
      const elements = Array.from(
        scope.querySelectorAll(
          `${MOTION_SELECTOR}, ${AUTO_MOTION_SELECTOR}, ${TEXT_MOTION_SELECTOR}`,
        ),
      );

      if (
        scope.nodeType === Node.ELEMENT_NODE &&
        scope.matches(
          `${MOTION_SELECTOR}, ${AUTO_MOTION_SELECTOR}, ${TEXT_MOTION_SELECTOR}`,
        )
      ) {
        elements.unshift(scope);
      }

      elements
        .forEach((element) => {
          if (!element.classList.contains("is-visible")) {
            observer.observe(element);
          }
        });
    };

    observeMotionElements(document);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            observeMotionElements(node);
          }
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}

export default ScrollAnimator;
