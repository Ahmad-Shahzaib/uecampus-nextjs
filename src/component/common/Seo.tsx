"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchSeoData, SeoEntry } from "@/redux/thunk/seoThunk";

interface SeoProps {
  // optional override; if not provided the component derives a key from pathname
  pageKey?: string;
}

const setMetaTag = (name: string, content?: string | null) => {
  if (content === undefined || content === null) return;
  let el = document.querySelector(`meta[name='${name}']`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", String(content));
};

export default function Seo({ pageKey }: SeoProps) {
  const dispatch = useDispatch();
  const seoState = useSelector((state) => state.seo);

  useEffect(() => {
    if (!seoState?.data && !seoState?.isLoading) {
      dispatch(fetchSeoData());
    }
  }, [dispatch, seoState?.data, seoState?.isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = window.location.pathname;
    const derivedKey =
      pageKey ?? (path === "/" ? "home" : path.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-"));

    // Try to resolve the correct key from the API data.
    let entry: SeoEntry | undefined;
    let usedKey: string | undefined;
    if (seoState?.data) {
      // direct match
      if (seoState.data[derivedKey]) {
        usedKey = derivedKey;
        entry = seoState.data[derivedKey];
      } else {
        // try sensible fallbacks: take first token before '-' (e.g. 'about-us' -> 'about')
        const firstToken = derivedKey.split("-")[0];
        if (firstToken && seoState.data[firstToken]) {
          usedKey = firstToken;
          entry = seoState.data[firstToken];
        } else {
          // try removing common suffixes
          const variants = [
            derivedKey.replace(/-us$/, ""),
            derivedKey.replace(/-page$/, ""),
          ];
          for (const v of variants) {
            if (v && seoState.data[v]) {
              usedKey = v;
              entry = seoState.data[v];
              break;
            }
          }
        }
      }
    }

    const title = entry?.seo_title ?? entry?.page_name ?? undefined;
    if (title) document.title = title;

    setMetaTag("description", entry?.seo_meta_description);
    setMetaTag("keywords", entry?.seo_keywords ?? undefined);

    // Optionally set og:title and og:description for social previews
    setMetaTag("og:title", title ?? "");
    setMetaTag("og:description", entry?.seo_meta_description ?? "");

    // Log applied meta tags to console for debugging (dev only)
    if (process.env.NODE_ENV !== "production") {
      console.log("[Seo] attempted keys", { derivedKey, usedKey });
      console.log("[Seo] applied for", usedKey ?? derivedKey, {
        title: document.title,
        description: document.querySelector("meta[name='description']")?.getAttribute("content"),
        keywords: document.querySelector("meta[name='keywords']")?.getAttribute("content"),
        ogTitle: document.querySelector("meta[name='og:title']")?.getAttribute("content"),
        ogDescription: document.querySelector("meta[name='og:description']")?.getAttribute("content"),
      });
      if (!entry) console.warn("[Seo] no SEO entry found for", derivedKey);
    }
  }, [pageKey, seoState?.data]);

  return null;
}
