import "./assets/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Favicon from "/public/images/Metadata/favicon.ico";

import MainProvider from "@/components/providers/MainProvider/MainProvider";

const myFont = localFont({
  src: "./assets/fonts/Jura-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Витрима",
  description: "Сервис возможностей",
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/images/metadata/faviconBlack.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/images/metadata/faviconWhite.ico',
        media: '(prefers-color-scheme: dark)',
      },


    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="ru">
      <body className={myFont.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
