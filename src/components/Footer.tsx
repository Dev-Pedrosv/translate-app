import Link from "next/link";
import React from "react";
import { FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";

function Footer() {
  return (
    <div className="mt-10  text-2xl absolute bottom-10 w-full left-0">
      <div className="flex items-center justify-center gap-3">
        <Link href="https://www.instagram.com/pedrosilvadev_/" target="_blank">
          <FiInstagram className="hover:-mt-2 transition-all" />
        </Link>
        <Link href="https://www.linkedin.com/in/pedroh-dev/" target="_blank">
          <FiLinkedin className="hover:-mt-2 transition-all" />
        </Link>
        <Link href="https://www.youtube.com/@pedrosilvadev_" target="_blank">
          <FiYoutube className="hover:-mt-2 transition-all" />
        </Link>
      </div>

      <p className="text-sm mt-4 text-center">Desenvolvido por Pedro Silva</p>
    </div>
  );
}

export default Footer;
