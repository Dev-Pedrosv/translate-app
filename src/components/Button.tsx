import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

export default function Button({ children, onClick, className }: ButtonProps) {
  const _className = twMerge(
    "px-12 py-3 bg-blue-600 rounded-xl mt-10 hover:bg-blue-700 transition-all text-white",
    className
  );

  return (
    <button onClick={onClick} type="submit" className={_className}>
      {children}
    </button>
  );
}
