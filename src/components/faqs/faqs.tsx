import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FAQAccordion } from "./accordion";
import { Link } from "react-router-dom";
import { faqs } from "./config";

export const FAQs = () => {
  return (
    <section className="border-t transaudio-dashed">
      <div className="transaudio-container py-4">
        <div className="relative overflow-hidden py-4 sm:p-8 md:p-12 lg:p-16">
          <div className="relative flex flex-col items-center justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Frequently Asked Questions</h2>
            </motion.div>
            <div className="w-full">
              <FAQAccordion items={faqs} />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link
                  to="/resources/docs"
                  className="inline-flex flex-row items-center space-x-1.5 text-sm text-brand hover:underline font-medium"
                >
                  <span>View All FAQs in Docs</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
