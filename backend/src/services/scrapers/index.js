import { scrapeFlipkart, searchFlipkart } from "./flipkart.scraper.js";
import { scrapeAmazon, searchAmazon } from "./amazon.scraper.js";
import { searchMyntra } from "./myntra.scraper.js";
import { scrapeGeneric } from "./generic.scraper.js";

export const cleanSearchQuery = (title) => {
  if (!title) return "";

  let clean = title.replace(/\.\.\.\s*more/gi, "");
  clean = clean.replace(/\([^)]*\)/g, " ");
  clean = clean.replace(/\[[^\]]*\]/g, " ");
  clean = clean.replace(/\b(combo|pack)\s+of\s+\d+\b/gi, " ");

  const parts = clean.split(/\s+[-–|:]\s+/);
  if (parts.length > 0 && parts[0].trim().length >= 8) {
    clean = parts[0].trim();
  }

  clean = clean.replace(/[,;]/g, " ").replace(/\s+/g, " ").trim();

  const words = clean.split(" ");
  if (words.length > 7) {
    clean = words.slice(0, 7).join(" ");
  }

  return clean;
};

export const scrapeProduct = async (url) => {
  const lower = url.toLowerCase();
  if (lower.includes("flipkart")) return scrapeFlipkart(url);
  if (lower.includes("amazon")) return scrapeAmazon(url);
  return scrapeGeneric(url);
};

export const searchProduct = async (query, targetSite) => {
  const clean = cleanSearchQuery(query);
  if (targetSite === "flipkart") return searchFlipkart(clean);
  if (targetSite === "amazon") return searchAmazon(clean);
  if (targetSite === "myntra") return searchMyntra(clean);
  if (targetSite === "all") return searchAllSites(clean);
  throw new Error("Unsupported target site");
};

export const searchAllSites = async (query) => {
  const clean = cleanSearchQuery(query);
  const results = await Promise.allSettled([
    searchAmazon(clean),
    searchFlipkart(clean),
    searchMyntra(clean),
  ]);
  return results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);
};

