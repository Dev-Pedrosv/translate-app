"use client";

import Card from "@/components/Card";
import { pronounceWord } from "@/lib/pronounceWord";
import { TranslateWord } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsFillVolumeUpFill } from "react-icons/bs";

export default function Home() {
  const [wordsList, setWordList] = useState<TranslateWord[] | undefined>();
  const [automaticChange, setAutomaticChange] = useState(false);

  useEffect(() => {
    async function fetchWords() {
      const list = await fetch("api/translation").then((res) => res.json());

      setWordList(list);
    }

    fetchWords();
  }, []);

  const hasWordList = wordsList && wordsList?.length > 0;

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
            <Card item={wordsList[0]} />

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
            <p className="text-lg">1</p>/<p className="text-lg">6</p>
          </div>

          <div className="flex gap-2 w-full justify-between ">
            <button>
              <AiOutlineArrowLeft className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
            </button>

            <Link href="/new-word">
              <button>
                <AiOutlinePlus className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
              </button>
            </Link>
            <button>
              <AiOutlineArrowRight className="text-slate-50 text-2xl hover:opacity-80 transition-all" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
