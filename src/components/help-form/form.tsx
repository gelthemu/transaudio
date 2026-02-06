import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Cookies from "js-cookie";
import { sendNotice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const SUB_KEY = "__TA_SUB";

const helpTypes = [
  { id: "large-file", label: "File larger than 80 MB" },
  { id: "refinement", label: "Script editing services" },
  { id: "bulk", label: "Bulk inquiry (10+ files)" },
  { id: "api", label: "API access request" },
  { id: "other", label: "Other" },
];

type SubmitState = "idle" | "loading" | "success" | "already" | "error";

interface HelpFormProps {
  sr?: boolean;
}

export const HelpForm: React.FC<HelpFormProps> = ({ sr = true }) => {
  const [email, setEmail] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const showOtherField = selectedTypes.includes("other");

  const subKey = Cookies.get(SUB_KEY);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((t) => t !== typeId)
        : [...prev, typeId],
    );
  };

  const resetForm = () => {
    setEmail("");
    setSelectedTypes([]);
    setDetails("");
    setOtherDetails("");
    setSubmitState("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setSubmitState("loading");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    try {
      if (subKey) {
        setSubmitState("already");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        resetForm();
        return;
      }

      try {
        const form: Record<string, string> = {
          email: email,
        };

        if (selectedTypes.length > 0) {
          const labels = selectedTypes
            .map((typeId) => {
              const type = helpTypes.find((t) => t.id === typeId);
              return type?.label;
            })
            .filter(Boolean);
          form["help-labels"] = labels.join(", ");
        }

        if (otherDetails.trim()) {
          form["other-details"] = otherDetails;
        }

        if (details.trim()) {
          form["additional-details"] = details;
        }

        await sendNotice({
          code: "9mgxV",
          inquiry: JSON.stringify(form, null, 2),
        });
      } catch {
        setSubmitState("error");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        resetForm();
        return;
      }

      Cookies.set(SUB_KEY, "1", {
        expires: 0.5 / 24,
        path: "/",
      });

      setSubmitState("success");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      resetForm();
    } catch {
      setSubmitState("error");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      resetForm();
    }
  };

  const getButtonText = () => {
    switch (submitState) {
      case "loading":
        return "Sending...";
      case "success":
        return "Sent!";
      case "already":
        return "Try Again Later!";
      case "error":
        return "Try Again";
      default:
        return "Submit Request";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address <span className="text-brand">*</span>
        </label>
        <div className="relative">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e: { target: { value: string } }) =>
              setEmail(e.target.value.trim())
            }
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            autoComplete="off"
            data-lpignore="true"
            placeholder="your.email@example.com"
            className="pr-10"
          />
          {email && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isEmailValid ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <X className="h-4 w-4 text-error" />
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="block font-medium mb-3">How can we help?</label>
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-3">
          {helpTypes.map((type) => (
            <div
              key={type.id}
              className="flex flex-row items-center space-x-2.5"
            >
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => handleTypeToggle(type.id)}
              />
              <label
                htmlFor={type.id}
                className="text-sm text-muted cursor-pointer"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
        {showOtherField && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4"
          >
            <Input
              type="text"
              name={otherDetails}
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              placeholder="Please specify..."
            />
          </motion.div>
        )}
      </div>
      {sr && (
        <div>
          <div className="flex flex-row justify-between items-end space-x-2 mb-2">
            <label className="text-sm font-medium">
              Additional Details{" "}
              <small className="text-sm text-muted font-normal">
                (optional)
              </small>
            </label>
            <span className="text-[10px] text-muted">{details.length}/500</span>
          </div>
          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value.slice(0, 500))}
            placeholder="Tell us about your needs..."
            rows={4}
          />
        </div>
      )}
      <div className="flex">
        <Button
          type="submit"
          disabled={
            !isEmailValid ||
            submitState === "loading" ||
            submitState === "success"
          }
          className={cn("w-fit", submitState === "success" && "bg-brand")}
        >
          {submitState === "loading" && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {submitState === "success" && <Check className="h-4 w-4" />}
          {getButtonText()}
        </Button>
      </div>
      {submitState === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-success/10 border border-success/40"
        >
          <p className="text-sm text-success font-medium">
            SUBMITTED! We'll try to respond within 24 hours...
          </p>
        </motion.div>
      )}
    </form>
  );
};
