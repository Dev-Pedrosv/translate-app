"use client";

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { status, data } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [data, router, status, pathname]);

  return (
    <div className="flex justify-between border-b border-slate-400 pb-4 h-12">
      <Link href="/">
        <h1 className="text-white text-2xl font-bold">Translate</h1>
      </Link>
      {status === "authenticated" && data.user && (
        <div className="flex gap-4 items-center ">
          <Image
            className="rounded-full shadow-md"
            height={35}
            width={35}
            alt={data?.user!.name!}
            src={data?.user!.image!}
          />

          <button
            onClick={() => signOut()}
            className="hover:opacity-80 transition-all"
          >
            <FiLogOut className="text-xl text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
