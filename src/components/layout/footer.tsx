import { Link } from "react-router-dom";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/separator";
import { getSession } from "@/utils/session-manager";
import { cn } from "@/lib/utils";

const links = {
  product: [
    { href: "/i/about", label: "About" },
    { href: "/scripts", label: "Scripts" },
  ],
  resources: [
    { href: "/resources/docs", label: "Docs", disabled: false },
    { href: "/resources/blog", label: "Blog", disabled: true },
    { href: "/resources/legal", label: "Legal", disabled: true },
  ],
};

export const Footer = () => {
  const session = getSession();

  return (
    <div className="w-full bg-muted/5 border-t transaudio-dashed">
      <footer className="transaudio-container flex flex-col">
        <div className="px-2 md:px-4 pt-8 lg:pt-10 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="sm:col-span-2 space-y-2">
              <div className="flex flex-row items-center space-x-1.5">
                <Logo disabled={true} />
                <div>
                  <span className="text-sm text-accent transaudio-none">
                    v{import.meta.env.VITE_SITE_VERSION} (i)
                  </span>
                </div>
              </div>
              <p className="text-muted text-sm max-w-sm">
                Transform your audio files into accurate scripts with our
                AI-powered model. Fast, secure, and reliable.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-2">
                Product
              </h4>
              <ul className="space-y-2">
                {links.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="py-2 text-sm text-muted hover:text-dark/80 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-2">
                Resources
              </h4>
              <ul className="space-y-2">
                {links.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.disabled ? "#" : link.href}
                      className={cn(
                        "py-2 text-sm text-muted hover:text-dark/80 transition-colors",
                        link.disabled && "disabled",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div></div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-2">
            <div className="flex flex-row items-center space-x-0 text-muted/80">
              <small className="">Session: {session?.slice(0, 8)}</small>
              <small className="blur-[2px] transaudio-none">
                {session?.slice(8)}
              </small>
            </div>
            <div>
              <small className="text-muted/90">
                © 2023 - {new Date().getFullYear()} TransAUDIO. All rights
                reserved
              </small>
            </div>
          </div>
        </div>
      </footer>
      <div className="sr-only">await save("id")</div>
    </div>
  );
};
