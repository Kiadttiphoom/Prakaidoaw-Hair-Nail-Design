import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { SystemProvider } from "@/context/SystemContext";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300"],
  display: "swap",   
  preload: true,
});

export const metadata: Metadata = {
  title: "Prakaidoaw Hair&Nail Design",
  description: "Prakaidoaw Hair&Nail Design",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${notoThai.className} antialiased bg-white`}>
        <SystemProvider>
        {children}
        </SystemProvider>
      </body>
    </html>
  );
}
