import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { PropsWithChildren } from "react";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Temporal Vault",
  description: "Demo app for save locally short data",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
