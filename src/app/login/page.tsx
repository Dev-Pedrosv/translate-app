"use client";
import Button from "@/components/Button";
import React from "react";
import { BsGoogle } from "react-icons/bs";

function Login() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full p-5">
      <p className="text-white text-center">
        Efetue login para acessar sua lista de palavras
      </p>

      <Button onClick={() => {}} className="flex items-center gap-4">
        <BsGoogle />
        Login com Google
      </Button>
    </div>
  );
}

export default Login;
