import { TranslateWord } from "@prisma/client";

export const deleteWord = async (wordId: string) => {
  const response = await fetch(`/api/word`, {
    body: Buffer.from(
      JSON.stringify({
        wordId,
      })
    ),
    method: "DELETE",
  }).then((res) => res.json());

  return response;
};

export const getWords = async () => {
  const response = await fetch("api/word").then((res) => res.json());

  return response;
};

export const createWord = async (data: TranslateWord) => {
  const response = await fetch(`/api/word`, {
    body: Buffer.from(
      JSON.stringify({
        word: data.word,
        translation: data.translation,
        imageUrl: data?.imageUrl,
      })
    ),
    method: "POST",
  }).then((res) => res.json());

  return response;
};
