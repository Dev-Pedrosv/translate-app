"use client";

import React from "react";
import { PencilSimple, Trash } from "phosphor-react";
import Text from "./Text";
import Button from "./Button";
import { Word } from "@/types/word";

interface WordListProps extends Word {
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function WordList({
  word,
  translation,
  handleEdit,
  handleDelete,
}: WordListProps) {
  return (
    <div className="flex justify-between border-b-2 pb-4">
      <div>
        <Text text={word} />
        <p className=" text-gray-400">{translation}</p>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Button onClick={handleEdit}>
          <PencilSimple className="text-slate-500" />
        </Button>
        <Button onClick={handleDelete}>
          <Trash className="text-red-300" />
        </Button>
      </div>
    </div>
  );
}
