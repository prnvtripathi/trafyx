import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now"; // Less than a minute ago
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`; // Less than an hour ago
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`; // Less than a day ago
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)}d ago`; // Less than a month ago
  return date.toLocaleDateString();
}
