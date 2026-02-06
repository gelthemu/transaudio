import { ReactNode, forwardRef } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, children }, ref) => {
    return (
      <section ref={ref} id={id} className="w-full border-t transaudio-dashed">
        <div className="transaudio-container py-4">
          <div className="relative overflow-hidden py-4 sm:p-8 md:p-12 lg:p-16">
            <div className="relative flex flex-col items-center justify-center space-y-8">
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Section.displayName = "Section";
