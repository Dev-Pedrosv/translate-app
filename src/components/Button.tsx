import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "./LoadingSpinner";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
};

export default function Button({
  children,
  onClick,
  className,
  isLoading,
}: ButtonProps) {
  const _className = twMerge(
    "px-12 py-3 bg-blue-600 rounded-xl mt-10 hover:bg-blue-700 transition-all text-white w-full max-w-72 flex items-center justify-center",
    className
  );

  return (
    <button onClick={onClick} type="submit" className={_className}>
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}
