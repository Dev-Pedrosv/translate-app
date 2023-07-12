"use client";

import React from "react";
import Text from "./Text";
import { TranslateWord } from "@prisma/client";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface WordListProps {
  translateWord?: TranslateWord;
  handleDelete: () => void;
}

export default function WordList({
  translateWord,
  handleDelete,
}: WordListProps) {
  return (
    <div className="flex justify-between border-b-2 pb-4">
      <div>
        <Text text={translateWord?.word || ""} />
        <p className=" text-gray-400">{translateWord?.translation}</p>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={handleDelete}>
          <RiDeleteBin6Line className="text-red-300 text-xl hover:opacity-80 transition-all" />
        </button>
      </div>
    </div>
  );
}
