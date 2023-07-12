"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { deleteWord, getWords } from "@/services/word";
import { TranslateWord } from "@prisma/client";

import WordList from "@/components/WordList";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";

export default function WordListScreen() {
  const [wordsList, setWordList] = useState<TranslateWord[] | undefined>();
  const [wordId, setWordId] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWords() {
    try {
      setIsLoading(true);
      const list = await getWords();
      setWordList(list);
    } catch (err) {
      toast.error("Erro ao carregar a lista de palavras, tente novamente!", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const handleDeleteWord = async () => {
    try {
      setIsLoading(true);
      await deleteWord(wordId);
      setWordId("");
      await fetchWords();
      toast.success("Palavra deletada com sucesso !", {
        position: "bottom-center",
      });
    } catch (e) {
      toast.error("Erro ao deletar a palavra, tente novamente ! ", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (wordId: string) => {
    if (window) {
      const modal: any = document.getElementById("my_modal_1");
      modal?.showModal();
      setWordId(wordId);
    }
  };

  const filteredList =
    search && wordsList
      ? wordsList.filter((item) => {
          if (
            item.word.toLowerCase().includes(search.toLowerCase()) ||
            item.translation.toLocaleLowerCase().includes(search.toLowerCase())
          ) {
            return item;
          }
        })
      : wordsList;

  return (
    <>
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
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Search..."
            className="placeholder:text-gray-400 text-sm p-2 pl-10 w-full font-semibold leading-normal bg-gray-800 rounded text-slate-50 outline-none"
          />
        </div>
        <div className="flex flex-col mt-10 gap-3 overflow-y-auto max-h-[580px]">
          {filteredList &&
            filteredList?.map((item: TranslateWord) => (
              <WordList
                translateWord={item}
                key={item.id}
                handleDelete={() => handleOpenModal(item.id)}
              />
            ))}
        </div>

        <Modal onConfirm={handleDeleteWord} />
      </div>
      <Loading isLoading={isLoading} />
    </>
  );
}
