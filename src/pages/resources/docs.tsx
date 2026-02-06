import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Settings,
  Star,
  MessageSquare,
  AlertTriangle,
  Phone,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import { HeroSection } from "@/components/hero";
import { Section } from "@/components/layout/section";
import { FAQAccordion } from "@/components/faqs/accordion";
import { HelpForm } from "@/components/help-form/form";
import { useDocsNav } from "./files/useDocsNav";
import { Sidebar } from "./files/sidebar";
import { MobileNav } from "./files/mobile-nav";
import {
  sections,
  gettingStartedArticles,
  howToUseSteps,
  features,
  faqCategories,
  troubleshooting,
} from "./files/docs-constants";

const Docs = () => {
  const {
    activeSectionId,
    showSortDropdown,
    setShowSortDropdown,
    scrollToSection,
    sortDropdownRef,
  } = useDocsNav({ sections });

  const activeSection = sections.find(
    (section) => section.id === activeSectionId,
  );

  const sectionHeading = (Icon: LucideIcon, text: string) => {
    return (
      <div className="w-full flex items-center space-x-4">
        <div>
          <Icon className="h-6 w-6 md:h-8 md:w-8 text-brand" />
        </div>
        <h2 className="text-brand">{text}</h2>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Docs - TransAUDIO</title>
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://transaudio.vercel.app/resources/docs"
        />
      </Helmet>
      <HeroSection sr={false}>
        <div className="w-full flex flex-col text-left">
          <h1 className="mb-6">
            Do<span className="inline-flex text-brand">cs</span>
          </h1>
          <p className="text-base text-muted max-w-xl leading-relaxed">
            {"Find contents to common titles and learn how to use TransAUDIO"}
          </p>
        </div>
      </HeroSection>
      <div className="flex flex-col min-[820px]:flex-row gap-0 !px-0 w-full max-w-5xl xl:max-w-6xl mx-auto border-l transaudio-dashed">
        <Sidebar
          sections={sections}
          activeSectionId={activeSectionId}
          scrollToSection={scrollToSection}
        />
        <MobileNav
          sections={sections}
          activeSection={activeSection}
          showSortDropdown={showSortDropdown}
          setShowSortDropdown={setShowSortDropdown}
          scrollToSection={scrollToSection}
          sortDropdownRef={sortDropdownRef}
        />

        <div className="flex-1">
          <Section id="getting-started">
            {sectionHeading(BookOpen, "Getting Started")}
            <div className="w-full">
              <FAQAccordion items={gettingStartedArticles} />
            </div>
          </Section>

          <Section id="how-to-use">
            {sectionHeading(Settings, "How to Use TransAUDIO")}
            <div className="w-full space-y-0">
              {howToUseSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pb-12 last:pb-0"
                >
                  <div className="absolute right-0 top-0 -translate-y-1/2 md:translate-x-1/2 w-10 h-10 bg-surface border border-accent/40 rounded-full flex items-center justify-center text-brand font-bold">
                    {step.step}
                  </div>
                  <div className="bg-surface/20 border border-accent/60 p-6">
                    <div className="flex flex-row items-center gap-3 mb-3">
                      <step.icon className="h-5 w-5" />
                      <h3>{step.title}</h3>
                    </div>
                    <p className="text-muted mb-4">{step.content}</p>
                    <div className="bg-muted/20 p-4">
                      <p className="text-sm font-medium mb-2">💡 Tips:</p>
                      <ul className="text-muted space-y-1">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="text-sm">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="features">
            {sectionHeading(Star, "Features & Capabilities")}
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-accent/20 border border-accent p-6"
                >
                  <div className="flex flex-row items-center gap-3 mb-3">
                    <feature.icon className="h-5 w-5" />
                    <h3>{feature.title}</h3>
                  </div>
                  <p className="text-muted text-sm mb-4">
                    {feature.description}
                  </p>
                  <ul className="text-sm space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span className="text-muted">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="faqs">
            {sectionHeading(MessageSquare, "Frequently Asked Questions")}
            <div className="w-full space-y-8">
              {faqCategories.map((category, index) => (
                <div key={index}>
                  <h3 className="mb-4 text-brand">{category.title}</h3>
                  <FAQAccordion items={category.faqs} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="troubleshooting">
            {sectionHeading(AlertTriangle, "Troubleshooting")}
            <div className="w-full space-y-6">
              {troubleshooting.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-accent/20 border border-accent p-6"
                >
                  <div className="flex flex-row items-center gap-3 mb-4">
                    <section.icon className="h-5 w-5" />
                    <h3>{section.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {section.problems.map((problem, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-1 bg-accent/40 rounded-full" />
                        <div>
                          <p className="font-medium text-sm">{problem.issue}</p>
                          <p className="text-muted text-sm">
                            {problem.solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section id="contact">
            {sectionHeading(Phone, "Contact Support")}
            <div className="w-full">
              <p className="text-muted-foreground mb-6">
                Send us a message below and we'll respond within 24 hours.
              </p>
              <HelpForm />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default Docs;
