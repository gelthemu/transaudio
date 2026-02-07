import { ReactNode, forwardRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { PageTransition, PageLoader } from "./page-transition";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children }, ref) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500); // 2500

      return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
      <div ref={ref} className="w-full h-full flex flex-col">
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <Navbar />
        <div className="w-full h-16 bg-transparent"></div>
        <main
          id="main-content"
          className="relative flex-1 min-h-[60vh]"
          role="main"
        >
          {loading ? (
            <PageLoader />
          ) : (
            <PageTransition>{children}</PageTransition>
          )}
        </main>
        <Footer />
      </div>
    );
  },
);

Layout.displayName = "Layout";
