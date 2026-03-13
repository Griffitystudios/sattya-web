import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import { navConfig } from "../configs/nav";
import { footerConfig } from "../configs/footer";

export const metadata: Metadata = {
  title: "Sattya",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav {...navConfig} />

        <main className="flex-1">{children}</main>
        <Footer {...footerConfig} />
      </body>
    </html>
  );
}
