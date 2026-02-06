import { useState, useEffect, useRef, RefObject } from "react";

interface UseDocsNavProps {
  sections: {
    id: string;
    label: string;
  }[];
}

interface UseDocsNavReturn {
  activeSectionId: string;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  scrollToSection: (id: string) => void;
  sortDropdownRef: RefObject<HTMLDivElement>;
}

export const useDocsNav = ({ sections }: UseDocsNavProps): UseDocsNavReturn => {
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth >= 820 ? 55 : 115;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSectionId(id);
      setShowSortDropdown(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    activeSectionId,
    showSortDropdown,
    setShowSortDropdown,
    scrollToSection,
    sortDropdownRef,
  };
};
