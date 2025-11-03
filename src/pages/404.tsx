import React from "react";
import { Helmet } from "react-helmet-async";
import { PromptDisplay } from "../components/prompts/prompt-display";

export const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="The page you requested is taking a coffee break. Sorry!"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="p-px">
        <div className="flex flex-col space-y-4 text-left">
          <h1 className="text-2xl font-bold">
            <span className="text-terminal-red">{"Oops! "}</span>
            <span className="text-terminal-amber">{"Not Found"}</span>
          </h1>
          <div className="text-terminal-amber opacity-50">
            The page you requested is taking a coffee break...
          </div>
          <PromptDisplay />
        </div>
      </div>
    </>
  );
};
