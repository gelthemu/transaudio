import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, BookOpenCheck, Code, Briefcase } from "lucide-react";

export const Industries = () => {
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);

  const industries = [
    { icon: Mic, label: "Podcasters" },
    { icon: BookOpenCheck, label: "Researchers" },
    { icon: Briefcase, label: "Businesses" },
    { icon: Code, label: "Developers" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustryIndex((prev: number) => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [industries.length]);

  return (
    <section className="border-t transaudio-dashed">
      <div className="transaudio-container py-4">
        <div className="relative overflow-hidden py-4 sm:p-8 md:p-12 lg:p-16">
          <div className="relative flex flex-col items-center justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <h3>Trusted by Content Creators Worldwide</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {industries.map((industry, index) => (
                  <motion.div
                    key={industry.label}
                    className="group flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`px-4 py-3 transition-all duration-[0.4s] ${
                        index === activeIndustryIndex
                          ? "bg-brand text-light"
                          : "bg-surface text-muted group-hover:bg-brand/10 group-hover:text-brand"
                      }`}
                    >
                      <industry.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-muted">
                      {industry.label}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div>
                <small className="font-medium text-brand">
                  10,500+ hours of audio transcribed
                </small>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
