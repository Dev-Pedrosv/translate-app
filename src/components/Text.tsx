import React from "react";

type TextProps = {
  text: string;
};

export default function Text({ text }: TextProps) {
  return <p className="text-slate-50 text-lg font-semibold">{text}</p>;
}
