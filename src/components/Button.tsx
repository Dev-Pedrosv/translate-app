import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-slate-50 text-2xl hover:opacity-80"
    >
      {children}
    </button>
  );
}
