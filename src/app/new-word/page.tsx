"use client";

import React, { useState } from "react";
import Image from "next/image";
import { isValidUrl } from "@/lib/url";
import { AiOutlineClose } from "react-icons/ai";
import { Controller, useForm } from "react-hook-form";
import { TranslateWord } from "@prisma/client";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import Button from "@/components/Button";

export default function NewWord(props: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<TranslateWord>();

  const handleCloseForm = () => {
    router.push("/word-list");
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await fetch("/api/translation/new", {
        body: Buffer.from(
          JSON.stringify({
            word: data.word,
            translation: data.translation,
            imageUrl: data?.imageUrl,
          })
        ),
        method: "POST",
      });

      toast.success("Nova palavra cadastrada com sucesso!", {
        position: "bottom-center",
      });

      handleCloseForm();
    } catch (err) {
      toast.error("Erro ao cadastrar uma nova palavra", {
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
                message: "Word é obrigatório.",
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
                message: "Translation é obrigatório.",
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

          <Button isLoading={isLoading}>Cadastrar</Button>
        </div>
      </form>
    </>
  );
}