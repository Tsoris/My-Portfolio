import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/homepage/NavBar";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tim's Devfolio",
  description: "Showcase of my enterprise in software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white transition-color dark:bg-gray-900 dark:text-white`}
      >

        <ThemeProvider>
        <NavBar/>
        <main className="min-h-screen pt-24">{children}</main>
        <footer>Footer</footer>
        </ThemeProvider>

      </body>
    </html>
  );
}
