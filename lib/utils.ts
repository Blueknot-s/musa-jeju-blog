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

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'restaurants-cafes': '/category-food.webp',
  'travel': '/category-travel.webp',
  'accommodation': '/category-hotel.webp',
  'daily-life': '/category-life.webp',
  'jeju-news': '/category-news.webp',
  // Map English names too just in case
  'Adventure place': '/category-travel.webp',
  'Road Trip': '/category-travel.webp',
  'Restaurants': '/category-food.webp',
  'Cafes': '/category-food.webp',
  'Accommodation': '/category-hotel.webp',
  'Hotels': '/category-hotel.webp',
  'Daily Life': '/category-life.webp',
  'Jeju News': '/category-news.webp',
};

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGE_MAP[category] || '/hero.webp';
}

export function translateCategory(category: string): string {
  return CATEGORY_MAP[category] || category;
}
