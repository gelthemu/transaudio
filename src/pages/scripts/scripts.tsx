import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Inbox, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero";
import {
  cleanExpiredScripts,
  getAllScripts,
  deleteScriptById,
} from "@/utils/indexed-db-manager";
import { formatDate } from "@/utils/format-date";
import { StoredScript } from "@/types";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "oldest";

const Scripts: React.FC = () => {
  const navigate = useNavigate();
  const [scripts, setScripts] = useState<StoredScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletinTask, setDeletinTask] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const loadScripts = async () => {
      await cleanExpiredScripts();
      const storedScripts = await getAllScripts();
      setScripts(storedScripts);
      setLoading(false);
    };

    loadScripts();
  }, []);

  const handleView = (task: string, ss: string, timestamp: number) => {
    navigate(`/scripts/script?task=${task}&ss=${ss}&dd=${timestamp}`);
  };

  const handleDelete = async (task: string) => {
    setDeletinTask(task);
    try {
      await deleteScriptById(task);
      await cleanExpiredScripts();
      const freshScripts = await getAllScripts();
      setScripts(freshScripts);
    } catch {
      alert("Failed to delete script.");
    } finally {
      setDeletinTask(null);
    }
  };

  const openConfirm = (task: string) => {
    setConfirmId(task);
  };

  const closeConfirm = () => {
    setConfirmId(null);
  };

  const confirmDelete = () => {
    if (!confirmId) return;
    handleDelete(confirmId);
    setConfirmId(null);
  };

  const filteredScripts = useMemo(() => {
    const result = [...scripts];

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.timestamp - a.timestamp;
        case "oldest":
          return a.timestamp - b.timestamp;
        default:
          return 0;
      }
    });

    return result;
  }, [scripts, sortBy]);

  const visibleScripts = filteredScripts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredScripts.length;

  return (
    <>
      <Helmet>
        <title>Your Scripts - TransAUDIO</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://transaudio.vercel.app/scripts" />
      </Helmet>
      <HeroSection sr={false}>
        <div className="w-full flex flex-col text-left">
          <h1 className="mb-6">
            Your <span className="inline-flex text-brand">Scripts</span>
          </h1>
          <p className="text-base text-muted max-w-xl leading-relaxed mb-6">
            {"View and download your recent runs (.docx available)"}
          </p>
          {visibleScripts.length === 0 ? null : (
            <div className="w-full max-w-[440px] md:max-w-[340px] relative">
              <Button
                variant="outline"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                disabled={visibleScripts.length < 2}
                className="w-full !justify-between"
              >
                <span className="flex flex-row items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted" />
                  <span>{sortBy === "newest" ? "Newest" : "Oldest"}</span>
                </span>
                <span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4",
                      showSortDropdown &&
                        "rotate-180 transition-transform duration-200",
                    )}
                  />
                </span>
              </Button>
              {showSortDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortDropdown(false)}
                  />
                  <div className="absolute right-0 left-0 top-full mt-1 bg-light border border-brand/50 shadow-xl z-20">
                    {[
                      { type: "newest" as SortOption, label: "Newest" },
                      { type: "oldest" as SortOption, label: "Oldest" },
                    ].map((selection, index) => (
                      <Button
                        key={index}
                        variant="dropdown"
                        onClick={() => {
                          setSortBy(selection.type);
                          setShowSortDropdown(false);
                        }}
                        className={cn("w-full !justify-between")}
                      >
                        <span
                          className={cn(
                            sortBy === selection.type ? "!text-brand" : "",
                          )}
                        >
                          {selection.label}
                        </span>
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {!loading && (
          <div className="w-full h-px my-12 border-y transaudio-dashed opacity-90" />
        )}
        <div className="w-full flex flex-col text-left">
          {loading ? (
            <div />
          ) : scripts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col text-left space-y-6"
            >
              <div>
                <Inbox className="h-8 w-8 text-muted" />
              </div>
              <p className="text-base text-error font-medium">
                You haven't converted any files to text, yet!
              </p>
              <Button
                size={"sm"}
                onClick={() => navigate("/i/prompt")}
                className="w-fit"
              >
                Upload Your First File
              </Button>
            </motion.div>
          ) : visibleScripts.length === 0 ? null : (
            <div className="w-full flex flex-col text-left space-y-6">
              <div className="p-px z-10">
                <div className="all-scripts">
                  <div className="divide-y-2 divide-light/80">
                    {visibleScripts.map((script, index) => (
                      <div
                        className="border-collapse flex flex-row"
                        key={script.task}
                      >
                        <div className="shrink-0 w-12 h-auto whitespace-nowrap text-sm text-light/80 bg-brand border-none p-4 pt-5">
                          #{index + 1}
                        </div>
                        <div className="flex-1 flex flex-col space-y-2 border-none p-4 bg-accent/30">
                          <div className="details_main">
                            <span className="text-brand text-base font-semibold">
                              {script.task}
                            </span>
                            <br />
                            <span className="text-sm text-muted">
                              {formatDate(script.timestamp)}
                            </span>
                          </div>
                          {confirmId === script.task ? (
                            <div>
                              <div className="flex flex-col space-y-[2px] md:space-y-0 md:flex-row md:items-center md:space-x-3">
                                <div>
                                  <span className="text-sm">Are you sure?</span>
                                </div>
                                <div>
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="flex flex-row items-center space-x-2"
                                  >
                                    <Button
                                      asChild
                                      size="xs"
                                      variant="outline"
                                      onClick={closeConfirm}
                                      disabled={deletinTask !== null}
                                    >
                                      <span className="!font-medium">
                                        Cancel
                                      </span>
                                    </Button>
                                    <Button
                                      asChild
                                      size="xs"
                                      onClick={confirmDelete}
                                      disabled={deletinTask !== null}
                                    >
                                      <span className="!font-semibold">
                                        YES, Delete
                                      </span>
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-row space-x-2">
                              <Button
                                asChild
                                size="xs"
                                onClick={() =>
                                  handleView(
                                    script.task,
                                    script.session,
                                    script.timestamp,
                                  )
                                }
                              >
                                <span className="!font-semibold">View</span>
                              </Button>
                              <Button
                                asChild
                                size="xs"
                                variant="outline"
                                onClick={() => openConfirm(script.task)}
                                disabled={deletinTask === script.task}
                              >
                                <span className="!font-medium">
                                  {deletinTask === script.task
                                    ? "Deleting..."
                                    : "Delete"}
                                </span>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {hasMore && (
                      <div className="w-full py-4 px-2 flex flex-col items-end border-none">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => setVisibleCount((prev) => prev + 10)}
                          className="w-fit"
                        >
                          <span className="!font-semibold !text-[13px]">
                            Load More Scripts
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </HeroSection>
    </>
  );
};

export default Scripts;
