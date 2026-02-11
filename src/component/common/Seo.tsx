"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchSeoData, SeoEntry } from "@/redux/thunk/seoThunk";
import { fetchSettingsData } from "@/redux/thunk/settingsThunk";

interface SeoProps {
  // optional override; if not provided the component derives a key from pathname
  pageKey?: string;
}

const setMetaTag = (key: string, content?: string | null) => {
  if (content === undefined || content === null) return;
  // Use `property` attribute for Open Graph keys, `name` otherwise
  const attr = key.startsWith("og:") ? "property" : "name";
  const selector = `meta[${attr}='${key}']`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
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
    // also ensure settings are loaded for social images/handles
    dispatch(fetchSettingsData());
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

    const rawTitle = entry?.seo_title ?? entry?.page_name ?? undefined;

    const prettifyKey = (k: string) =>
      k
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();

    const normalizeTitle = (base?: string, key?: string) => {
      const siteSuffix = "UECampus — Online Courses & Degrees";
      const fallback = key ? prettifyKey(key) : "UECampus";

      let candidate = (base && base.trim().length > 0 ? base.trim() : fallback) + " | " + siteSuffix;

      // Ensure within 50-60 characters. If too short, append short descriptors; if too long, trim to last full word.
      const pads = [" — Learn Online", " — Flexible Study", " — Career Growth"];

      // If too short, add pads until >=50 or no pads left
      let padIndex = 0;
      while (candidate.length < 50 && padIndex < pads.length) {
        candidate = candidate + pads[padIndex];
        padIndex++;
      }

      // If still too short, append the prettified key
      if (candidate.length < 50 && fallback) {
        candidate = candidate + " — " + fallback;
      }

      // If too long, trim to 60 and remove trailing partial word
      if (candidate.length > 60) {
        candidate = candidate.slice(0, 60);
        // remove partial trailing word
        const lastSpace = candidate.lastIndexOf(" ");
        if (lastSpace > 0) candidate = candidate.slice(0, lastSpace);
      }

      // Final safety: ensure min length at least 40 (avoid extremely short titles)
      if (candidate.length < 40) {
        candidate = candidate + " | UECampus";
      }

      return candidate;
    };

    const title = normalizeTitle(rawTitle, derivedKey);
    if (title) document.title = title;

    // Compose a SEO-friendly meta description (150-160 chars) with CTA
    const normalizeDescription = (base?: string, key?: string) => {
      const CTA = "Enroll today.";
      const minLen = 150;
      const maxLen = 160;

      const sitePhrase = "Learn online with flexible study options at UECampus.";
      const fallback = key ? prettifyKey(key) : "Discover flexible online courses";

      let baseText = base && base.trim().length > 0 ? base.trim() : fallback;
      baseText = baseText.replace(/[.?!\s]+$/g, "");

      // Ensure a site phrase appears for short bases
      if (!/Learn online/i.test(baseText) && baseText.length < 90) baseText = baseText + " " + sitePhrase;

      // Prepare candidate without CTA
      let candidate = baseText;

      // Reserve space for CTA and a separating space
      const reserve = CTA.length + 1;
      let maxBase = maxLen - reserve;

      if (candidate.length > maxBase) {
        candidate = candidate.slice(0, maxBase);
        const lastSpace = candidate.lastIndexOf(" ");
        if (lastSpace > 0) candidate = candidate.slice(0, lastSpace);
      }

      let final = candidate + " " + CTA;

      // If still too short, append short pads until we reach minLen
      const pads = [" Learn more about our programs.", " Apply now for flexible start dates.", " Start your career today."];
      let padIdx = 0;
      while (final.length < minLen && padIdx < pads.length) {
        // ensure we don't exceed maxLen when adding a pad
        if (final.length + pads[padIdx].length > maxLen) break;
        final = final + pads[padIdx];
        padIdx++;
      }

      // If adding pads didn't reach minLen, try to trim more conservatively and append CTA again
      if (final.length < minLen) {
        // trim candidate to fit exact space and append CTA
        const needed = minLen - reserve;
        if (needed > 0) {
          candidate = candidate.slice(0, needed);
          const lastSpace = candidate.lastIndexOf(" ");
          if (lastSpace > 0) candidate = candidate.slice(0, lastSpace);
        }
        final = candidate + " " + CTA;
      }

      // Final safety trims to ensure <= maxLen and ends with CTA
      if (final.length > maxLen) {
        final = final.slice(0, maxLen);
        const lastSpace = final.lastIndexOf(" ");
        if (lastSpace > 0) final = final.slice(0, lastSpace);
        if (!final.endsWith(CTA)) final = final + " " + CTA;
        if (final.length > maxLen) final = final.slice(0, maxLen).trim();
      }

      return final.trim();
    };

    const description = normalizeDescription(entry?.seo_meta_description, derivedKey);
    setMetaTag("description", description);
    console.log("[Seo] set description for", usedKey ?? derivedKey, { description });
    setMetaTag("keywords", entry?.seo_keywords ?? undefined);

    // Optionally set og:title and og:description for social previews
    setMetaTag("og:title", title ?? "");
    setMetaTag("og:description", description ?? "");

    // Choose an image for social previews: prefer SEO entry, then settings.logo, then site fallback
    const settingsState = (window as any).__REDUX_STATE__?.settings ?? undefined;
    const ogImageCandidate =
      (entry as any)?.seo_image ||
      (settingsState && settingsState.data && settingsState.data.logo) ||
      `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.uecampus.com"}/assets/uecampus-og.png`;

    // set OG image and dimensions
    setMetaTag("og:image", ogImageCandidate);
    setMetaTag("og:image:width", "1200");
    setMetaTag("og:image:height", "630");

    // Set canonical/full URL
    const siteBase = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.uecampus.com";
    const currentUrl = `${siteBase}${path === "/" ? "" : path}`;
    setMetaTag("og:url", currentUrl);

    // Twitter card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title ?? "");
    setMetaTag("twitter:description", description ?? "");
    setMetaTag("twitter:image", ogImageCandidate);

    // Breadcrumb JSON-LD
    const buildBreadcrumbs = () => {
      const pathParts = path === "/" ? ["home"] : path.replace(/^\//, "").replace(/\/$/, "").split("/");
      const itemListElement = pathParts.map((part, idx) => {
        const href = "/" + pathParts.slice(0, idx + 1).join("/");
        const name = (() => {
          // prefer SEO entry name for final segment
          if (idx === pathParts.length - 1 && entry?.page_name) return entry.page_name;
          return part.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        })();
        return {
          "@type": "ListItem",
          position: idx + 1,
          name,
          item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.uecampus.com"}${href}`,
        };
      });

      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
      };
    };

    const existingBreadcrumbScript = document.getElementById("ld-breadcrumb");
    if (existingBreadcrumbScript) existingBreadcrumbScript.remove();
    try {
      const breadcrumb = buildBreadcrumbs();
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = "ld-breadcrumb";
      s.text = JSON.stringify(breadcrumb);
      document.head.appendChild(s);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") console.warn("[Seo] breadcrumb JSON-LD error", e);
    }

    // Log applied meta tags to console for debugging (dev only)
    if (process.env.NODE_ENV !== "production") {
      // console.log("[Seo] attempted keys", { derivedKey, usedKey });
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
