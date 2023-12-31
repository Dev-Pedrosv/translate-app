"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { pronounceWord } from "@/lib/pronounceWord";
import { deleteWord, getWords } from "@/services/word";
import { TranslateWord } from "@prisma/client";
import { toast } from "react-toastify";

import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsFillVolumeUpFill } from "react-icons/bs";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

export default function Home() {
  const [wordsList, setWordList] = useState<TranslateWord[] | undefined>();
  const [indexWord, setIndexWord] = useState(0);
  const [automaticChange, setAutomaticChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      const list = await getWords();
      setWordList(list);
    } catch (err) {
      toast.error("Error loading wordlist, please try again!", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
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
        setIsLoading(true);
        await deleteWord(wordsList[indexWord].id);
        const updateWordList = wordsList.filter((word) => word.id !== wordsList[indexWord].id)
        setWordList(updateWordList)
        toast.success("Card deleted successfully!", {
          position: "bottom-center",
        });
      }
    } catch (e) {
      toast.error("Error deleting card, try again!", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (window) {
      const modal: any = document.getElementById("my_modal_1");
      modal?.showModal();
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <Link
          href="/word-list"
          className=" text-slate-50 text-lg font-semibold hover:opacity-80 transition-all"
        >
          Word list
        </Link>
        {!isLoading &&
          (hasWordList ? (
            <div className="mt-8">
              <Card
                item={wordsList[indexWord]}
                handleDelete={handleOpenModal}
              />

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="toggle toggle-info "
                    checked={automaticChange}
                    onChange={() => setAutomaticChange(!automaticChange)}
                  />
                  <label>Automatic exchange: 30s</label>
                </div>

                <button onClick={() => pronounceWord(wordsList[indexWord].word)}>
                  <BsFillVolumeUpFill className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-center mt-20">No registered words</p>
              <Link href="/new-word" className="flex items-end">
                <Button className="gap-2">
                  <AiOutlinePlus className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
                  Register new word
                </Button>
              </Link>
            </>
          ))}
      </div>

      {!isLoading && hasWordList && (
        <div>
          <div className="flex gap-1 text-white w-full justify-center mb-4 items-center mt-20">
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
      <Loading isLoading={isLoading} />
    </div>
  );
}
