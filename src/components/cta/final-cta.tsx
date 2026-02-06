import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="border-t transaudio-dashed">
      <div className="transaudio-container py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-brand/10 px-4 py-10 sm:p-8 md:p-12 lg:p-16"
        >
          <div className="relative flex flex-col items-center justify-center space-y-6">
            <h2>Ready to Get Started?</h2>
            <p className="text-muted max-w-md mx-auto text-center">
              Start transcribing your audio files today. No account required, no
              credit card needed.
            </p>
            <Button
              size={"sm"}
              onClick={() => navigate("/i/prompt")}
              className="w-fit"
            >
              Upload Your First File
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
