import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/i/about", label: "About" },
  { href: "/scripts", label: "Scripts" },
  { href: "/resources/docs", label: "Docs" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 bg-light/60 bg-blend-multiply backdrop-blur-md border-b transaudio-dashed">
        <nav className="transaudio-container h-16 flex items-center justify-between space-x-2">
          <Logo />
          <div className="hidden md:flex md:flex-row items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "bg-transparent text-sm font-medium transition-colors",
                  isActive(link.href) ? "" : "text-muted hover:text-dark/80",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              onClick={() => {
                navigate("/i/prompt");
                setMobileMenuOpen(false);
              }}
            >
              <span>Get Started</span>
            </Button>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-16 z-50 bg-light/60 bg-blend-multiply backdrop-blur-md border-t transaudio-dashed"
          >
            <div className="h-[95%] flex flex-col items-start justify-between space-y-2 p-6 sm:p-8">
              <div className="flex flex-col space-y-6 sm:space-y-5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block bg-transparent text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? ""
                        : "text-muted hover:text-dark/80",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {[{ href: "/resources/blog", label: "Blog" }].map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block bg-transparent text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? ""
                        : "text-muted hover:text-dark/80",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto">
                <Button
                  asChild
                  onClick={() => {
                    navigate("/i/prompt");
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Get Started</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
