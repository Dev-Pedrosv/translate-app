"use client";
import { TranslateWord } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "./Modal";

interface CardProps {
  item: TranslateWord;
  handleDelete: (value: string) => void;
}

function Card({ item, handleDelete }: CardProps) {
  const [showWord, setShowWord] = useState(false);
  const maskWord = item?.translation?.replace(/./g, "*");
  const router = useRouter();

  const handleOpenModal = () => {
    if (window) {
      const modal: any = document.getElementById("my_modal_1");
      modal?.showModal();
    }
  };

  return (
    <div className="flex w-full">
      <div className="bg-gray-800 w-full flex flex-col items-center p-4 rounded-xl gap-4 justify-between h-[360px]">
        <div>
          {item?.imageUrl && (
            <Image
              width={220}
              height={220}
              alt={item.word}
              src={item.imageUrl}
              className="rounded-xl"
            />
          )}
          <div className="mt-4">
            <p className="text-center text-slate-50 text-lg font-semibold">
              {item?.word}
            </p>
            <p className="text-center text-gray-400 text-lg font-semibold ">
              {showWord ? item?.translation : maskWord}
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
            <button onClick={handleOpenModal}>
              <RiDeleteBin6Line className="text-red-300 text-2xl hover:opacity-80 transition-all" />
            </button>
          </div>
        </div>
      </div>

      <Modal onConfirm={() => handleDelete(item.id)} />
    </div>
  );
}

export default Card;
