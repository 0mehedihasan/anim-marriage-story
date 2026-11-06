import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Al Hill Baki | Marriage Biodata",
  description: "Marriage biodata of Abdullah Al Hill Baki.",
  openGraph: {
    title: "Abdullah Al Hill Baki | Marriage Biodata",
    description: "Marriage biodata of Abdullah Al Hill Baki.",
    type: "profile",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}