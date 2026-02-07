import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  disabled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ disabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate("/home");
    }
  };

  return (
    <div
      role="button"
      className={cn(
        "flex flex-row items-center space-x-0 transaudio-btn",
        disabled ? "transaudio-none" : "",
      )}
      aria-label="go to homepage"
      style={{ cursor: disabled ? "default" : "pointer" }}
      onClick={handleClick}
    >
      <span className="text-lg text-dark font-medium">Trans</span>
      <span className="uppercase text-lg text-[#cc0000] font-bold">Audio</span>
    </div>
  );
};
