import React from "react";

interface LoadingProps {
  isLoading: boolean;
  text?: string;
}

function Loading(props: LoadingProps) {
  if (!props.isLoading) return null;
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-screen bg-slate-800/50 flex-col gap-4">
      <span className="loading loading-spinner loading-md"></span>
      <p>{props.text || "Carregando..."}</p>
    </div>
  );
}

export default Loading;
