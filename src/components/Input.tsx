import React, { ComponentPropsWithoutRef, LegacyRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  error?: boolean;
  errorMessage?: string;
  label: string;
  className?: string;
  onChange: (value: any) => void;
  value?: string;
  placeholder: string;
}

export default function Input({
  label,
  className,
  error,
  errorMessage,
  ...props
}: InputProps) {
  const inputClassName = twMerge(
    "placeholder:text-gray-400 text-sm p-2 w-full font-semibold leading-normal bg-gray-800 rounded text-slate-50 outline-none",
    error ? "border-red-500 border" : "focus:ring-1 focus:ring-primary",
    className
  );

  const labelClassName = twMerge(
    " text-sm font-semibold mb-2",
    error ? "text-red-500" : "text-slate-50",
    className
  );

  return (
    <div className="flex flex-col">
      <label className={labelClassName}>{label}</label>
      <input className={inputClassName} {...props} />
      {error && errorMessage && (
        <span className="mt-1 text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  );
}
