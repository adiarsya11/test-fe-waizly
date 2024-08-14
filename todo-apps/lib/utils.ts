import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Todo } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addTodosToLocalStorage = (key: string, data: Todo[]): void => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
};

export const getFromLocalStorage = (key: string): Todo[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as Todo[]) : [];
  } catch (error) {
    console.error("Error getting data from local storage", error);
    return [];
  }
};
