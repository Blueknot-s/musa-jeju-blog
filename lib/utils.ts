import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_MAP: Record<string, string> = {
  'Adventure place': '여행·관광지',
  'Road Trip': '여행·관광지',
  'Restaurants': '맛집·카페',
  'Cafes': '맛집·카페',
  'Accommodation': '숙소·호텔',
  'Hotels': '숙소·호텔',
  'Daily Life': '생활·일상',
  'Jeju News': '제주뉴스',
  'restaurants-cafes': '맛집·카페',
  'travel': '여행·관광지',
  'accommodation': '숙소·호텔',
  'daily-life': '생활·일상',
  'jeju-news': '제주뉴스',
};

export function translateCategory(category: string): string {
  return CATEGORY_MAP[category] || category;
}
