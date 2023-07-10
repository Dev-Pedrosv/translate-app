"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { status, data } = useSession();
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoading(true);
    signIn();
  };

  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      router.push("/");
    }
  }, [data?.user, router, status]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full p-5">
      <p className="text-white text-center">
        Efetue login para acessar sua lista de palavras
      </p>

      <Button
        onClick={handleLoginClick}
        className="flex items-center gap-4 justify-center "
        isLoading={isLoading}
      >
        <BsGoogle />
        Login com Google
      </Button>
    </div>
  );
}

export default Login;
