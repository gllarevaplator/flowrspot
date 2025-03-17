"use client";

import { Provider } from "react-redux";
import store from "../features/app/store";
import Head from "next/head";
import { Metadata } from "next";
import { Montserrat, Playfair } from "next/font/google";
import { Ubuntu } from "next/font/google";
import "@/styles/globals.css";

export const meta: Metadata = {
  title: "Flowers App",
  description:
    "Discover flowers around you, explore between more than 8.427 sightings",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playFair = Playfair({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${montserrat.className} ${ubuntu.className} ${playFair.className}`}
      >
        <Provider store={store}>
          <main id="root">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
