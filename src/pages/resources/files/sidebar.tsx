import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  sections: {
    id: string;
    label: string;
    icon: LucideIcon;
  }[];
  activeSectionId: string;
  scrollToSection: (id: string) => void;
}

export const Sidebar = ({
  sections,
  activeSectionId,
  scrollToSection,
}: SidebarProps) => {
  return (
    <aside className="hidden min-[820px]:block w-64 sticky top-16 self-start">
      <div className="space-y-2 p-4 transaudio-dashed">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              "w-full text-left px-4 py-2 transition-colors flex items-center gap-2 group",
              activeSectionId === section.id
                ? "bg-accent/20 text-brand"
                : "text-muted hover:text-dark hover:bg-accent/10",
            )}
          >
            <section.icon className="h-4 w-4" />
            <span
              className={cn(
                "text-sm",
                activeSectionId === section.id ? "font-bold" : "font-medium",
              )}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};
