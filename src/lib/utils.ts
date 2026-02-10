import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Build a full blog image URL.
 * - If `img` is already an absolute URL (http/https), return as-is.
 * - If `img` starts with `images/blogs` (no domain), prefix with domain.
 * - Otherwise, append the path to the standard blog images base.
 */
export function getBlogImageUrl(img?: string | null) {
  if (!img) return undefined
  if (/^https?:\/\//i.test(img)) return img
  const cleaned = img.replace(/^\/+/, "") // remove leading slashes
  if (/^images\/blogs\//i.test(cleaned)) return `https://new.uecampus.com/${cleaned}`
  return `https://new.uecampus.com/images/blogs/${cleaned}`
}
