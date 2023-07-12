"use client";

import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { pronounceWord } from "@/lib/pronounceWord";
import { deleteWord, getWords } from "@/services/word";
import { TranslateWord } from "@prisma/client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Home() {
  const [wordsList, setWordList] = useState<TranslateWord[] | undefined>();
  const [indexWord, setIndexWord] = useState(0);
  const [automaticChange, setAutomaticChange] = useState(false);
  const interval = 1000 * 30; //30seg

  const hasWordList = wordsList && wordsList?.length > 0;
  const totalWords = wordsList && wordsList.length;

  const handleNextIndex = useCallback(() => {
    if (wordsList && indexWord === wordsList?.length - 1) {
      return setIndexWord(0);
    }
    setIndexWord(indexWord + 1);
  }, [indexWord, wordsList]);

  const handlePrevIndex = () => {
    if (wordsList && indexWord === 0) {
      return setIndexWord(wordsList?.length - 1);
    }
    setIndexWord(indexWord - 1);
  };

  async function fetchWords() {
    const list = await getWords();
    setWordList(list);
  }
  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const handleAutomaticWord = () => {
      if (automaticChange) {
        intervalId = setInterval(() => {
          handleNextIndex();
        }, interval);
      }
    };

    handleAutomaticWord();

    return () => {
      clearInterval(intervalId);
    };
  }, [automaticChange, handleNextIndex, interval]);

  const handleDeleteWord = async () => {
    try {
      if (wordsList) {
        await deleteWord(wordsList[indexWord].id);
        fetchWords();
        toast.success("Palavra deletada com sucesso !", {
          position: "bottom-center",
        });
      }
    } catch (e) {
      toast.error("Erro ao deletar a palavra, tente novamente ! ", {
        position: "bottom-center",
      });
    }
  };

  const handleOpenModal = () => {
    if (window) {
      const modal: any = document.getElementById("my_modal_1");
      modal?.showModal();
    }
  };

  return (
    <div className="flex flex-col h-[82%] justify-between">
      <div>
        <Link
          href="/word-list"
          className=" text-slate-50 text-lg font-semibold hover:opacity-80 transition-all"
        >
          Word list
        </Link>
        {hasWordList ? (
          <div className="mt-8">
            <Card item={wordsList[indexWord]} handleDelete={handleOpenModal} />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="toggle toggle-info "
                  checked={automaticChange}
                  onChange={() => setAutomaticChange(!automaticChange)}
                />
                <label>Troca automática: 30s</label>
              </div>

              <button onClick={() => pronounceWord(wordsList[0].word)}>
                <BsFillVolumeUpFill className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
              </button>
            </div>
          </div>
        ) : (
          <p>Sem palavras cadastradas </p>
        )}
      </div>

      {hasWordList && (
        <div>
          <div className="flex gap-1 text-white w-full justify-center mb-4 items-center">
            <p className="text-lg">{indexWord + 1}</p>/
            <p className="text-lg">{totalWords}</p>
          </div>

          <div className="flex gap-2 w-full justify-between ">
            <button onClick={handlePrevIndex}>
              <AiOutlineArrowLeft className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
            </button>

            <Link href="/new-word" className="flex items-end">
              <button>
                <AiOutlinePlus className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
              </button>
            </Link>
            <button onClick={handleNextIndex}>
              <AiOutlineArrowRight className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
            </button>
          </div>
        </div>
      )}

      <Modal onConfirm={handleDeleteWord} />
    </div>
  );
}
