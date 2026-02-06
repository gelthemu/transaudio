import { RefObject } from "react";
import { ChevronDown, MenuSquare, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  sections: {
    id: string;
    label: string;
    icon: LucideIcon;
  }[];
  activeSection:
    | {
        id: string;
        label: string;
        icon: LucideIcon;
      }
    | undefined;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  scrollToSection: (id: string) => void;
  sortDropdownRef: RefObject<HTMLDivElement>;
}

export const MobileNav = ({
  sections,
  activeSection,
  showSortDropdown,
  setShowSortDropdown,
  scrollToSection,
  sortDropdownRef,
}: MobileNavProps) => {
  return (
    <section className="w-full sticky min-[820px]:hidden top-16 z-[30] bg-light/60 bg-blend-multiply backdrop-blur-md transaudio-dashed">
      <div className="relative transaudio-container pb-8">
        <div className="relative flex flex-col sm:px-8 md:px-12">
          <div
            ref={sortDropdownRef}
            className="w-full max-w-[440px] md:max-w-[340px] relative"
          >
            <Button
              variant="outline"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="w-full !justify-between !border-none !bg-transparent"
            >
              <span className="flex flex-row items-center space-x-2">
                {activeSection && <MenuSquare className="h-4 w-4 text-muted" />}
                <span className="text-sm">{activeSection?.label}</span>
              </span>
              <span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4",
                    showSortDropdown &&
                      "rotate-180 transition-transform duration-200",
                  )}
                />
              </span>
            </Button>
            {showSortDropdown && (
              <div className="absolute right-0 left-0 top-full mt-1 bg-light border border-brand/50 shadow-xl z-[40]">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="dropdown"
                    onClick={() => scrollToSection(section.id)}
                    className={cn("w-full !justify-start")}
                  >
                    <section.icon className="h-4 w-4" />
                    {section.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
