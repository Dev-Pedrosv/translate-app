"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BsGoogle } from "react-icons/bs";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { status, data } = useSession();
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoading(true);
    signIn("google");
  };

  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      router.push("/");
    }
  }, [data?.user, router, status]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full p-5">
      <p className="text-white text-center">
        {status === "loading"
          ? "Logging in..."
          : "Log in to access your word list"}
      </p>

      <Button
        onClick={handleLoginClick}
        className="gap-4"
        isLoading={isLoading}
      >
        {status === "loading" ? (
          <LoadingSpinner />
        ) : (
          <>
            <BsGoogle />
            Login with Google
          </>
        )}
      </Button>
    </div>
  );
}

export default Login;
