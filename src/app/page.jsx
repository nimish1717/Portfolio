"use client";

import { useEffect, useState } from "react";

if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    const errorString = args.map(arg => String(arg?.message || arg)).join(" ");
    if (
      errorString.includes("hydration") ||
      errorString.includes("Hydration") ||
      errorString.includes("bis_skin_checked") ||
      errorString.includes("A tree hydrated")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

import { CursorProvider } from "@/components/v3/ui/CustomCursor";
import { Navigation } from "@/components/v3/ui/Navigation";

import { Chapter01Entry } from "@/components/v3/Chapter01Entry";
import { Chapter02Signal } from "@/components/v3/Chapter02Signal";
import { Chapter03About } from "@/components/v3/Chapter03About";
import { Chapter04Toolkit } from "@/components/v3/Chapter04Toolkit";
import { Chapter05Work } from "@/components/v3/Chapter05Work";
import { Chapter06Experience } from "@/components/v3/Chapter06Experience";
import { Chapter07Lab } from "@/components/v3/Chapter07Lab";
import { Chapter08Now } from "@/components/v3/Chapter08Now";
import { Chapter09Contact } from "@/components/v3/Chapter09Contact";
import { Chapter10Footer } from "@/components/v3/Chapter10Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CursorProvider>
      <div className="grain-overlay" aria-hidden />
      <Navigation />
      <main className="relative w-full bg-bg text-fg selection:bg-accent selection:text-bg">
        <Chapter01Entry />
        <Chapter02Signal />
        <Chapter03About />
        <Chapter04Toolkit />
        <Chapter05Work />
        <Chapter06Experience />
        <Chapter07Lab />
        <Chapter08Now />
        <Chapter09Contact />
        <Chapter10Footer />
      </main>
    </CursorProvider>
  );
}
