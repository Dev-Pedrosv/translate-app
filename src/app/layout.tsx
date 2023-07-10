import Header from "@/components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "./providers/auth";
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
          <main className="bg-bgColor w-full h-screen overflow-hidden flex justify-center p-4">
            <div className="max-w-[375px] w-full">
              <Header />
              {children}
            </div>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
