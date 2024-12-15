import React from "react";
import { Brain, Users, MessageSquareX, CheckCircle } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-5 h-5 text-blue-light" />,
      feature: "Smart Recognition",
      description:
        "Capture every detail with AI that understands context, nuances, and language for precise results.",
    },
    {
      icon: <Users className="w-5 h-5 text-blue-light" />,
      feature: "Speaker Diarization",
      description:
        "Automatically distinguish and tag speakers in multi-person conversations, creating clear and organized transcripts.",
    },
    {
      icon: <MessageSquareX className="w-5 h-5 text-blue-light" />,
      feature: "Fillers, Profanity Filtering",
      description:
        "Eliminate filler words (um's, ah's) and inappropriate language for polished, professional transcripts.",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-blue-light" />,
      feature: "Perfect Accuracy",
      description:
        "Industry-leading transcription accuracy ensures your conversations are captured perfectly, every time.",
    },
  ];

  return (
    <section className="w-full px-5 md:px-10 py-12">
      <h2 className="text-center text-4xl font-light mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {features.map((item, index) => (
          <div
            key={index}
            className="m-2 flex justify-center items-start rounded-lg hover:translate-y-[-2px] transition-transform duration-300"
          >
            <div className="w-full xs:w-[400px] md:w-full h-full p-5 flex flex-col justify-center items-start bg-blue-dark/20 border border-blue-light/50 rounded-lg">
              <div className="mb-2 flex justify-start items-center">
                <span className="mr-2">{item.icon}</span>
                <h2 className="font-bold uppercase text-blue-light">
                  {item.feature}
                </h2>
              </div>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
