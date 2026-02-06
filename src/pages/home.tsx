import React from "react";
import { Helmet } from "react-helmet-async";
import { HomeHero } from "@/components/hero";
import { Industries } from "@/components/features/industries";
import { Features } from "@/components/features/features";
import { FAQs } from "@/components/faqs/faqs";
import { HelpForm } from "@/components/help-form/help-form";
import { FinalCTA } from "@/components/cta/final-cta";

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TransAUDIO - Effortless Audio-to-Text Conversion</title>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://transaudio.vercel.app/home" />
      </Helmet>
      <HomeHero />
      <Industries />
      <Features />
      <FAQs />
      <HelpForm />
      <FinalCTA />
    </>
  );
};

export default Home;
