"use client";

import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { TranslateWord } from "@prisma/client";
import WordList from "@/components/WordList";
import { deleteWord, getWords } from "@/services/word";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";

export default function WordListScreen() {
  const [wordsList, setWordList] = useState<TranslateWord[] | undefined>();
  const [wordId, setWordId] = useState("");

  async function fetchWords() {
    const list = await getWords();
    setWordList(list);
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const handleDeleteWord = async () => {
    try {
      await deleteWord(wordId);
      setWordId("");
      fetchWords();
      toast.success("Palavra deletada com sucesso !", {
        position: "bottom-center",
      });
    } catch (e) {
      toast.error("Erro ao deletar a palavra, tente novamente ! ", {
        position: "bottom-center",
      });
    }
  };

  const handleOpenModal = (wordId: string) => {
    if (window) {
      const modal: any = document.getElementById("my_modal_1");
      modal?.showModal();
      setWordId(wordId);
    }
  };

  return (
    <div className="w-full relative">
      <Link href="/new-word">
        <button className="text-white hover:opacity-80 transition-all flex gap-2">
          <AiOutlinePlus className="text-xl" />
          <p>New word</p>
        </button>
      </Link>

      <div className="flex items-center gap-3 my-7 relative">
        <BsSearch className="text-slate-50 text-lg absolute left-3" />
        <input
          placeholder="Search..."
          className="placeholder:text-gray-400 text-sm p-2 pl-10 w-full font-semibold leading-normal bg-gray-800 rounded text-slate-50 outline-none"
        />
      </div>
      <div className="flex flex-col mt-10 gap-3 overflow-y-auto max-h-[580px]">
        {wordsList?.map((item: TranslateWord) => (
          <WordList
            translateWord={item}
            key={item.id}
            handleDelete={() => handleOpenModal(item.id)}
          />
        ))}
      </div>

      <Modal onConfirm={handleDeleteWord} />
    </div>
  );
}
