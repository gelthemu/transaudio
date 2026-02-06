import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero";
import { Section } from "@/components/layout/section";
import { HelpForm as Form } from "@/components/help-form/form";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About - TransAUDIO</title>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://transaudio.vercel.app/i/about" />
      </Helmet>
      <HeroSection sr={false}>
        <div className="w-full flex flex-col text-left">
          <h1 className="mb-6">
            About Trans
            <span className="inline-flex text-brand uppercase">Audio</span>
          </h1>
          <p className="text-base text-muted max-w-xl leading-relaxed mb-6">
            Making Audio Accessible to Everyone
          </p>
          <Button
            size={"sm"}
            onClick={() => navigate("/i/prompt")}
            className="w-fit"
          >
            Upload Your First File
          </Button>
        </div>
      </HeroSection>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="text-left space-y-12"
        >
          <div className="space-y-5">
            <h2>Our Story</h2>
            <p className="text-muted text-base">
              At TransAudio, we believe that audio content should be accessible,
              searchable, and easy to work with. We're building tools that
              transform the way people interact with spoken content—whether it's
              for accessibility, productivity, or content creation.
            </p>
            <p className="text-muted text-base">
              TransAudio was born from a simple frustration: manually
              transcribing hours of interviews and podcasts. We realized that
              while AI transcription existed, most tools were either too
              expensive, too complicated, or compromised on privacy.
            </p>
            <p className="text-muted text-base">
              We set out to create a solution that's:
            </p>
            <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 opacity-95">
              {[
                "Fast and accurate",
                "Privacy-first",
                "Accessible to everyone",
                "Simple to use",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex flex-row items-center gap-3 p-4 bg-accent/10 border border-accent/40"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/60 flex items-center justify-center font-semibold text-sm">
                    ✓
                  </span>
                  <span className="font-medium text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "95%+", label: "Accuracy Rate" },
              { value: "10K+", label: "Hours Transcribed" },
              { value: "50+", label: "Languages Supported" },
              { value: "5 Days", label: "Auto-Delete" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-surface/40 border border-accent/60 text-center space-y-1"
              >
                <p className="text-2xl md:text-3xl font-bold text-brand">
                  {stat.value}
                </p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Section>
      <Section>
        <div className="text-left space-y-5">
          <h2>What We Value</h2>
          <div className="w-full grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Shield,
                title: "Privacy First",
                description:
                  "Your data is yours. We don't store, sell, or use your content for training. Everything is automatically deleted after 5 days.",
              },
              {
                icon: Target,
                title: "Accuracy Matters",
                description:
                  "We use industry-leading AI models and continuously improve our accuracy through better algorithms and quality control.",
              },
              {
                icon: Heart,
                title: "Accessibility for All",
                description:
                  "We're committed to making our tools affordable and accessible, with a focus on helping creators and educators.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group p-6 bg-surface/40 border border-accent/60 hover:border-brand/40 transition-all duration-200"
              >
                <div className="p-3 bg-brand/80 w-fit mb-6 group-hover:rotate-45 transition-all duration-[0.4s]">
                  <value.icon className="h-5 w-5 text-light stroke-[3px] group-hover:-rotate-45" />
                </div>
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col text-left space-y-5 max-w-5xl"
        >
          <h2>Get in Touch</h2>
          <p className="text-muted">
            Have questions, feedback, or just want to say hello? We'd love to
            hear from you.
          </p>
          <div className="max-w-xl">
            <Form sr={false} />
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default About;
