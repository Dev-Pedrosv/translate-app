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
            <main className="bg-bgColor w-full h-screen overflow-hidden flex justify-center p-4">
              <div className="max-w-[375px] w-full h-screen">
                <Header />
                {children}
                <Footer />
              </div>
            </main>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
