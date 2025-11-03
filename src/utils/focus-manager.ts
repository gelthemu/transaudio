import React, { useEffect, useCallback } from "react";

interface FocusManagerProps {
  transcript_id?: string;
  highlight_id?: string;
}

export const FocusManager: React.FC<FocusManagerProps> = ({
  transcript_id = "transcript",
  highlight_id = "highlight-index",
}) => {
  const isPlaying = useCallback((): boolean => {
    const audios = document.getElementsByTagName("audio");
    for (const audio of audios) {
      if (!audio.paused && !audio.ended) {
        return true;
      }
    }
    return false;
  }, []);

  const getHighlightIndex = useCallback((): HTMLElement | null => {
    return document.getElementById(highlight_id);
  }, [highlight_id]);

  const focusHighlightIndex = useCallback((): void => {
    const highlighted_index = getHighlightIndex();
    const transcript_bucket = document.getElementById(transcript_id);

    if (highlighted_index && transcript_bucket) {
      const transcript_rect = transcript_bucket.getBoundingClientRect();
      const word_rect = highlighted_index.getBoundingClientRect();

      const relative_top = word_rect.top - transcript_rect.top;
      const bucket_height = transcript_bucket.clientHeight;

      if (relative_top < 0 || relative_top > bucket_height - word_rect.height) {
        const wordOffsetTop = highlighted_index.offsetTop;
        const scrollTop =
          wordOffsetTop - bucket_height / 2 + word_rect.height / 2;

        transcript_bucket.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: "smooth",
        });
      }
    }
  }, [getHighlightIndex, transcript_id]);

  const handleClick = useCallback(
    (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      const inputs = document.getElementsByTagName("input");

      if (!target.matches("input")) {
        if (isPlaying() && getHighlightIndex()) {
          focusHighlightIndex();
        } else {
          if (inputs.length > 0) {
            inputs[0].focus();
          }
        }
      }
    },
    [isPlaying, getHighlightIndex, focusHighlightIndex]
  );

  const handleMutation = useCallback(
    (mutations: MutationRecord[]): void => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "id") {
          const target = mutation.target as HTMLElement;
          if (target.id === highlight_id) {
            focusHighlightIndex();
          }
        }
      });
    },
    [highlight_id, focusHighlightIndex]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      if (event.key === "Enter") {
        setTimeout(() => {
          target.blur();
        }, 5000);
      }
    };

    const inputs = document.getElementsByTagName("input");
    const inputArray = Array.from(inputs);

    inputArray.forEach((input) => {
      input.addEventListener("keydown", handleKeyDown);
    });

    const observer = new MutationObserver(handleMutation);

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["id"],
    });

    return () => {
      inputArray.forEach((input) => {
        input.removeEventListener("keydown", handleKeyDown);
      });

      document.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, [handleClick, handleMutation]);

  return null;
};
