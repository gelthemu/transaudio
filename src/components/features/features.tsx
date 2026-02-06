import { motion } from "framer-motion";
import { Zap, Users, Download, Clock, Shield, Globe } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process 60-min audio in under 3 minutes with 99.9% uptime",
    },
    {
      icon: Users,
      title: "Speaker Diarization",
      description: "Automatically identify and separate up to 10+ speakers",
    },
    {
      icon: Download,
      title: "Smart Export",
      description: "Download as Word DOCX or plain text with one click",
    },
    {
      icon: Clock,
      title: "Word-Level Timestamps",
      description: "Precise timing for every word, perfect for subtitles",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is automatically deleted after 5 days",
    },
    {
      icon: Globe,
      title: "No Installation",
      description: "Works in any modern browser. No downloads required",
    },
  ];

  return (
    <section className="border-t transaudio-dashed">
      <div className="transaudio-container py-4">
        <div className="relative overflow-hidden py-4 sm:p-8 md:p-12 lg:p-16">
          <div className="relative flex flex-col items-center justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <h2>Why Choose TransAudio?</h2>
              <p className="text-muted">
                Professional-grade transcription with features designed for
                productivity.
              </p>
            </motion.div>
            <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 bg-surface/40 border border-accent/60 hover:border-brand/40 transition-all duration-200"
                >
                  <div className="p-3 bg-brand/90 w-fit mb-6 group-hover:rotate-45 transition-all duration-[0.4s]">
                    <feature.icon className="h-5 w-5 text-light stroke-[2px] group-hover:-rotate-45" />
                  </div>
                  <h3 className="mb-3">{feature.title}</h3>
                  <p className="text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
