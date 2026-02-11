"use client";
import Link from "next/link";
import Seo from "@/component/common/Seo";

function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Seo pageKey={"404"} />
      <div className="max-w-3xl w-full p-8 text-center">
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Oops — we couldn't find that page.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="px-4 py-2 bg-white text-purple-700 rounded-md border">
            Go to homepage
          </Link>
          <Link href="/courses" className="px-4 py-2 bg-purple-600 text-white rounded-md">
            Browse courses
          </Link>
          <Link href="/contact-us" className="px-4 py-2 border rounded-md text-foreground">
            Contact us
          </Link>
        </div>

        <div className="mt-8">
          <SearchForm />
        </div>

        <nav className="mt-6 text-sm text-muted-foreground">
          <Link href="/about-us" className="underline mr-3">About</Link>
          <Link href="/faqs" className="underline mr-3">FAQs</Link>
          <Link href="/scholarship" className="underline">Scholarship</Link>
        </nav>
      </div>
    </main>
  );
}

export default NotFoundPage;

 
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchForm() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    // Navigate to courses page with a search query param
    router.push(`/courses?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={submit} className="flex items-center justify-center gap-2">
      <Input
        placeholder="Search for a course or topic"
        value={q}
        onChange={(e) => setQ((e.target as HTMLInputElement).value)}
        className="w-64"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
