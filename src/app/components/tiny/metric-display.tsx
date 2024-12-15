import React from "react";

export default function MetricDisplay() {
  const metrics = [
    {
      value: "100%",
      label: "Native Speakers",
    },
    {
      value: "50+",
      label: "Languages",
    },
    {
      value: "90%",
      label: "Accuracy",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center my-6 px-2 py-4 border-y border-blue-light/20">
        {metrics.map((metric, index) => (
          <div className="flex flex-col items-center gap-0" key={index}>
            <h2 className="text-2xl md:text-3xl text-blue-light font-bold">
              {metric.value}
            </h2>
            <p className="text-sm font-light">{metric.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
