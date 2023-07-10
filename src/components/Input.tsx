import React from "react";

type InputProps = {
  label: string;
  placeholder: string;
  onChange: (value: any) => void;
  value?: string;
};

export default function Input({
  label,
  placeholder,
  onChange,
  value,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-slate-50 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="placeholder:text-gray-400 text-sm p-2 w-full font-semibold leading-normal bg-gray-800 rounded text-slate-50 outline-none"
      />
    </div>
  );
}
