import { motion } from "framer-motion";
import { HelpForm as Form } from "@/components/help-form/form";

export const HelpForm = () => {
  return (
    <section className="border-t transaudio-dashed">
      <div className="transaudio-container py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden px-4 py-10 sm:p-8 md:p-12 lg:p-16"
        >
          <div className="relative flex flex-col items-center justify-center space-y-6">
            <h2>Need Extra Help?</h2>
            <p className="text-muted mx-auto text-center">
              Have files larger than 80 MB or need transcript refinement
              assistance? We're here to help!
            </p>
            <div className="w-full max-w-xl mx-auto">
              <Form />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
