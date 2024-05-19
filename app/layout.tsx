import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from './components/navbar/Navbar'
import Modal from "./components/modals/Modal";
const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoSpace",
  description: "Sharing your workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal actionLabel="Submit" title="Hello World!" isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
