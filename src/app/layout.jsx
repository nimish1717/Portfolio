import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nimish Agrawal | Software Engineer",
  description:
    "Portfolio of Nimish Agrawal, a Computer Engineering student specializing in Full Stack Development and AI/ML.",
  openGraph: {
    title: "Nimish Agrawal | Software Engineer",
    description:
      "Portfolio of Nimish Agrawal, a Computer Engineering student specializing in Full Stack Development and AI/ML.",
    url: "https://nimishagrawal.com", // Adjust as necessary
    siteName: "Nimish Agrawal Portfolio",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-neutral-100 min-h-screen flex flex-col`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
