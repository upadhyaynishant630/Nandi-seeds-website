import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* =========================================================
   ScrollToTop
   Resets the window scroll position on every route change
   so a new page never opens half way down.
========================================================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
