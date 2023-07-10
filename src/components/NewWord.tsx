"use client";

import React, { useContext, useState, useEffect } from "react";
import Button from "./Button";
import { X, Plus } from "phosphor-react";
import Input from "./Input";
import Image from "next/image";
import Text from "./Text";
import { Word } from "@/types/word";
import { isValidUrl } from "@/lib/url";
import { TranslateContext } from "@/context/Translate";

interface FormProps extends Omit<Word, "id"> {}

const initialValues: FormProps = {
  word: "",
  translation: "",
  urlImage: "",
};

export default function NewWord(props: Word) {
  const [formOpen, setFormOpen] = useState(false);
  const { createNewWord } = useContext(TranslateContext);
  const [form, setForm] = useState<Word | FormProps>(props || initialValues);

  useEffect(() => {
    props && setForm(props);
  }, [props]);

  const handleForm = (value: string, name: string) => {
    const updateValues = {
      ...form,
      [name]: value,
    };

    setForm(updateValues);
  };

  const handleOpenForm = () => {
    setFormOpen(true);
    setForm(initialValues);
  };
  const handleCloseForm = () => {
    setFormOpen(false);
    setForm(initialValues);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewWord(form);
    handleCloseForm();
  };

  const validUrl = isValidUrl(form?.urlImage);

  return (
    <>
      {formOpen ? (
        <form
          onSubmit={handleSubmit}
          className="absolute w-full h-screen overflow-hidden top-0 bg-bgColor z-10"
        >
          <div className="flex justify-between mb-8">
            <Text text="New word" />
            <Button onClick={handleCloseForm}>
              <X />
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Word"
              placeholder="Word"
              onChange={(value: string) => handleForm(value, "word")}
              value={form.word}
            />

            <Input
              label="Translation"
              placeholder="Translation"
              onChange={(value: string) => handleForm(value, "translation")}
              value={form.translation}
            />

            <Input
              label="URL image"
              placeholder="URL image"
              onChange={(value: string) => handleForm(value, "urlImage")}
              value={form.urlImage}
            />

            {validUrl && form?.urlImage && (
              <Image
                src={form?.urlImage}
                width={260}
                height={160}
                alt="image"
                className="mx-auto mt-4 rounded-lg"
              />
            )}

            <button
              type="submit"
              className="px-12 py-3 bg-gray-800 rounded-xl mt-10 hover:bg-gray-700 transition-all"
            >
              <p className="text-center text-slate-50 font-semibold ">Save</p>
            </button>
          </div>
        </form>
      ) : (
        <Button onClick={handleOpenForm}>
          <Plus />
        </Button>
      )}
    </>
  );
}
