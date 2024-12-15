import React from "react";
import { useRouter } from "next/navigation";

interface BtnProps {
  onClick?: () => void;
}

export default function TryItBtn({ onClick }: BtnProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push("/i/transcribe");
  };

  return (
    <>
      <div
        className="w-fit mx-auto text-sm font-medium bg-brick hover:bg-blue-dark px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer"
        onClick={handleClick}
      >
        Try It Out for Free
      </div>
    </>
  );
}
