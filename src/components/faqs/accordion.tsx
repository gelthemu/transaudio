import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  title: string;
  content: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion = ({ items }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "border overflow-hidden transition-all duration-200",
            openIndex === index
              ? "border-brand/80 bg-brand/5"
              : "border-accent hover:bg-muted/10",
          )}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-start justify-between p-4 text-left"
          >
            <span className="font-medium pr-4">{item.title}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              {openIndex === index ? (
                <ChevronLeft className="h-5 w-5 text-brand" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted" />
              )}
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pt-0 pb-4 text-muted leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
