import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

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
            <span className="text-red">{"Oops! "}</span>
            <span>{"Not Found"}</span>
          </h1>
          <div className="opacity-60">
            The page you requested is taking a coffee break...
          </div>
          <div className="opacity-90 flex flex-row space-x-2">
            <button
              className="px-4 py-2 text-sm font-bold bg-light text-dark border-none decoration-none"
              type="button"
              onClick={() => navigate("/home")}
            >
              Go Home
            </button>
            <button
              className="px-4 py-2 border border-light bg-transparent"
              type="button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
