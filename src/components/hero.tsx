import { ReactNode, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCheck, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  children: ReactNode;
  sr?: boolean;
}

interface PromptHeroProps {
  showUploadView: () => void;
  showUrlView: () => void;
  disabled?: boolean;
}

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ children, sr = true }, ref) => {
    return (
      <section ref={ref} className="border-none">
        <div className="transaudio-container py-4">
          <div className="relative overflow-hidden p-4 sm:p-8 md:p-12 lg:p-16">
            <div className="relative flex flex-col items-center justify-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full text-center"
              >
                {sr && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex px-2 py-1 bg-brand/10 opacity-80 mb-4 transaudio-none"
                  >
                    <small className="text-muted font-medium">
                      AI-Powered Transcription
                    </small>
                  </motion.div>
                )}
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

export const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <h1 className="mb-6">
        Transform Audio into Text
        <span className="block text-brand">in Minutes</span>
      </h1>
      <p className="text-base text-muted max-w-xl mx-auto mb-10 leading-relaxed">
        Professional-grade transcription with speaker identification,
        timestamps, and 95% accuracy. No software installation required.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-6"
      >
        <Button
          size={"md"}
          onClick={() => navigate("/i/prompt")}
          className="font-semibold"
        >
          Try it Out, for Free!
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full flex flex-row justify-center space-x-6 opacity-90"
      >
        {["Up to 80 MB", "MP3, M4A files"].map((text, index) => (
          <span key={index} className="flex flex-row items-center space-x-1.5">
            <CheckCheck className="h-3 w-3 stroke-brand stroke-[4px]" />
            <span className="text-sm text-muted">{text}</span>
          </span>
        ))}
      </motion.div>
    </HeroSection>
  );
};

export const PromptHero = forwardRef<HTMLDivElement, PromptHeroProps>(
  ({ showUploadView, showUrlView, disabled = false }, ref) => {
    return (
      <HeroSection ref={ref}>
        <h1 className="mb-6">
          Get <span className="inline-flex text-brand">Started</span>
          <span className="!font-medium">,</span> Now!
        </h1>
        <p className="text-base text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          ...
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full flex flex-col min-[480px]:flex-row gap-x-4 gap-y-3 justify-center mb-6"
        >
          <Button
            size={"md"}
            onClick={showUploadView}
            className="w-full min-[480px]:w-fit font-semibold"
            disabled={disabled}
          >
            Upload Audio File
          </Button>
          <Button
            size={"md"}
            variant="outline"
            onClick={showUrlView}
            className="w-full min-[480px]:w-fit font-semibold"
            disabled={disabled}
          >
            <LinkIcon className="h-4 w-4 stroke-[3px]" />
            or Paste File URL
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 opacity-90"
        >
          {["Up to 80 MB", "MP3, M4A files", "90-min MAX"].map(
            (text, index) => (
              <span
                key={index}
                className="flex flex-row items-center space-x-1.5"
              >
                <CheckCheck className="h-3 w-3 stroke-brand stroke-[4px]" />
                <span className="text-sm text-muted">{text}</span>
              </span>
            ),
          )}
        </motion.div>
      </HeroSection>
    );
  },
);

HeroSection.displayName = "HeroSection";
PromptHero.displayName = "PromptHero";
