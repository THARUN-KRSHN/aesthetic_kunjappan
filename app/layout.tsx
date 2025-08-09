import type { Metadata } from "next";
import { Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

const malayalam = Noto_Sans_Malayalam({
  weight: ["400", "700"],
  subsets: ["malayalam"],
  variable: "--font-malayalam",
});

export const metadata: Metadata = {
  title: "Aesthetic Kunjappan",
  description: "Sarcastic Kerala-rooted poster generator. Njan design cheyyum… pakshe njan style aayirikkum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${malayalam.variable} bg-[#f7f1e1] text-[#1d1510] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
