import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path?: string | null): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }
  const base = import.meta.env.VITE_IMAGE_BASE_URL || "";
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return cleanBase ? `${cleanBase}/${cleanPath}` : cleanPath;
}
