import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero";
import { ScriptViewer } from "@/components/script-viewer";
import { ad58ad087edb98 } from "@/utils/aai-fxns";
import { formatDate } from "@/utils/format-date";
import { iDownload } from "@/utils/download";
import { PageLoader } from "@/components/layout/page-transition";
import { ScriptInfo } from "@/types";

// import data from "@/data/test-example.json";
// const t = data as ScriptInfo;

const Script: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [script, setScript] = useState<ScriptInfo>({
    task: "trans-audio",
    timestamp: 1680848161234,
    accuracy: null,
    words: 0,
    segments: [],
  });

  const task = searchParams.get("task");
  const session = searchParams.get("ss");
  const timestamp = searchParams.get("dd");

  useEffect(() => {
    const loadScript = async () => {
      if (!task) {
        setError("Invalid script task.");

        const timer = setTimeout(() => {
          setLoading(false);
        }, 3000); // 3000

        return () => clearTimeout(timer);
      }

      try {
        // setScript(t);
        const data = await ad58ad087edb98(task);
        if (!data) {
          setError("Script not found or expired.");
        } else {
          setScript(data);
        }
      } catch {
        setError("Failed to load script.");
      }

      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // 3000

      return () => clearTimeout(timer);
    };

    loadScript();
  }, [task]);

  const handleDownload = async () => {
    if (!script) {
      return;
    }

    await iDownload({
      script: script,
      setError,
    });
  };

  return (
    <>
      <Helmet>
        <title>Script | {script.task} - TransAUDIO</title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href={`https://transaudio.vercel.app/scripts/script?task=${task}&ss=${session}&dd=${timestamp}`}
        />
      </Helmet>
      <HeroSection sr={false}>
        <div className="w-full flex flex-col text-left">
          <nav className="text-muted p-px border-none">
            <Link to="/scripts" className="hover:text-dark">
              <span className="text-sm">Scripts</span>
            </Link>
            <span className="mx-2 text-sm">{">"}</span>
            <span className="text-brand text-sm font-semibold">
              ID: {task.slice(0, 8)} . . .
            </span>
          </nav>
          <h1 className="mb-4 text-brand">{task}</h1>
          <div className="text-sm text-muted">
            <p>Created: {timestamp ? formatDate(timestamp) : "-"}</p>
            <p>
              Accuracy:{" "}
              {script?.accuracy
                ? (script?.accuracy * 100).toFixed(2) + "%"
                : "-"}
            </p>
          </div>
        </div>
        <div className="w-full h-px my-12 border-y transaudio-dashed opacity-90" />
        <div className="w-full flex flex-col text-left">
          {loading ? (
            <div className="relative w-full min-h-10">
              <PageLoader />
            </div>
          ) : error || !script ? (
            <div className="w-full flex flex-col space-y-4">
              <div>
                <p className="text-error text-base">
                  Error: {error || "Something went wrong..."}
                </p>
              </div>
              <Button
                size={"sm"}
                onClick={() => navigate("/i/prompt")}
                className="w-fit"
              >
                Upload Your File
              </Button>
            </div>
          ) : (
            <div className="w-full flex flex-col space-y-12">
              <div>
                <Button size={"sm"} onClick={handleDownload} className="w-fit">
                  <span className="text-base !font-semibold">
                    Download Script{" "}
                    <small className="text-surface">
                      ({script?.words || 0} words)
                    </small>
                  </span>
                </Button>
              </div>
              <div>
                <ScriptViewer t={script} />
              </div>
            </div>
          )}
        </div>
      </HeroSection>
    </>
  );
};

export default Script;
