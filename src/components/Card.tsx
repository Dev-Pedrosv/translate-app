"use client";
import { TranslateWord } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CardProps {
  item: TranslateWord;
}

function Card({ item }: CardProps) {
  const [showWord, setShowWord] = useState(false);

  return (
    <div className="flex w-full">
      <div className="bg-gray-800 w-full flex flex-col items-center p-4 rounded-xl gap-4 justify-between h-[360px]">
        <div>
          {item.imageUrl && (
            <Image
              width={120}
              height={120}
              alt={item.word}
              src={item.imageUrl}
            />
          )}
          <div className="mt-4">
            <p className="text-center text-slate-50 text-lg font-semibold">
              Good morning
            </p>
            <p className="text-center text-gray-400 text-lg font-semibold ">
              {showWord ? "word" : "*** ***"}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <button onClick={() => setShowWord(!showWord)}>
            {showWord ? (
              <AiFillEyeInvisible className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
            ) : (
              <AiFillEye className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
            )}
          </button>

          <div className="flex gap-2">
            <button>
              <MdOutlineModeEdit className="text-slate-500 text-2xl hover:opacity-80 transition-all" />
            </button>
            <button>
              <RiDeleteBin6Line className="text-red-300 text-2xl hover:opacity-80 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
