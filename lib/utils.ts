import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (path?: string) => {
  if (!path) return "/placeholder.png";
  
  const baseURL = process.env.NEXT_PUBLIC_BASEURL as string;
  
  return `${baseURL}${path}`;
};

export const formatDateOnly = (date?: string) => {
  if (!date) return "";
  return date.split("T")[0];
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};



// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

export function formatMonth(monthString: string): string {
  const [year, month] = monthString.split('-');
  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}
