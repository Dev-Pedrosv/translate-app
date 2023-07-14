"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";

import { createWord } from "@/services/word";
import { isValidUrl } from "@/lib/url";
import { TranslateWord } from "@prisma/client";

import { AiOutlineClose } from "react-icons/ai";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function NewWord() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<TranslateWord>();

  const handleCloseForm = () => {
    router.push("/word-list");
  };

  const resetForm = () => {
    setValue("imageUrl", "");
    setValue("word", "");
    setValue("translation", "");
  };

  const onSubmit = async (data: TranslateWord) => {
    try {
      setIsLoading(true);

      await createWord(data);
      toast.success("New word successfully registered", {
        position: "bottom-center",
      });

      resetForm();
    } catch (err) {
      toast.error("Error when registering a new word", {
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const imageUrl = watch("imageUrl");
  const validUrl = isValidUrl(imageUrl || "");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end mb-8">
          <button
            type="button"
            onClick={handleCloseForm}
            className="text-white hover:opacity-80 transition-all flex gap-2"
          >
            <AiOutlineClose className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            name="word"
            rules={{
              required: {
                value: true,
                message: "Word is required.",
              },
            }}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={!!errors?.word}
                errorMessage={errors?.word?.message}
                label="Word"
                placeholder="Word"
              />
            )}
          />

          <Controller
            name="translation"
            rules={{
              required: {
                value: true,
                message: "Translation is required.",
              },
            }}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={!!errors?.translation}
                errorMessage={errors?.translation?.message}
                label="Translation"
                placeholder="Translation"
              />
            )}
          />

          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="URL image"
                placeholder="URL image"
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />

          {validUrl && imageUrl && (
            <Image
              src={imageUrl}
              width={260}
              height={160}
              alt="image"
              className="mx-auto mt-4 rounded-lg"
            />
          )}

          <Button isLoading={isLoading}>Register</Button>
        </div>
      </form>
    </>
  );
}
