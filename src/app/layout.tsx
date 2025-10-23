import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Hair Salons",
  description: "hair-salons-system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${notoThai.className} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
