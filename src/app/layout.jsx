import { Bebas_Neue, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CursorProvider } from "@/components/ui/CursorContext";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Nimish Agrawal — Frontend Developer & AI/ML Enthusiast",
  description:
    "Portfolio of Nimish Agrawal, a Computer Engineering student focused on frontend development, AI/ML, and building interactive digital experiences.",
  keywords: [
    "Nimish Agrawal",
    "Frontend Developer",
    "AI ML",
    "React",
    "Next.js",
    "Portfolio",
    "Computer Engineering",
  ],
  authors: [{ name: "Nimish Agrawal" }],
  openGraph: {
    title: "Nimish Agrawal — Portfolio",
    description: "Computer Engineering student. Frontend Developer. AI/ML Enthusiast.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-fg font-inter antialiased" suppressHydrationWarning>
        <LenisProvider>
          <CursorProvider>
            {children}
          </CursorProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
