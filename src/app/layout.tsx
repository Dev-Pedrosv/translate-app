import "./globals.css";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "./providers/auth";
import ToastProvider from "./providers/toast";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Translate App",
  description: "Pedro Silva Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <main className="bg-bgColor w-full flex justify-center ">
              <div className="max-w-[375px] w-full min-h-screen flex flex-col gap-4 justify-between p-4">
                <Header />
                <div className="flex flex-col h-full">{children}</div>
                <Footer />
              </div>
            </main>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
