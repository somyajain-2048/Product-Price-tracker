import { scrapeFlipkart, searchFlipkart } from "./flipkart.scraper.js";
import { scrapeAmazon, searchAmazon } from "./amazon.scraper.js";
import { searchMyntra } from "./myntra.scraper.js";
import { scrapeGeneric } from "./generic.scraper.js";

export const scrapeProduct = async (url) => {
  const lower = url.toLowerCase();
  if (lower.includes("flipkart")) return scrapeFlipkart(url);
  if (lower.includes("amazon")) return scrapeAmazon(url);
  return scrapeGeneric(url);
};

export const searchProduct = async (query, targetSite) => {
  if (targetSite === "flipkart") return searchFlipkart(query);
  if (targetSite === "amazon") return searchAmazon(query);
  if (targetSite === "myntra") return searchMyntra(query);
  if (targetSite === "all") return searchAllSites(query);
  throw new Error("Unsupported target site");
};

export const searchAllSites = async (query) => {
  const results = await Promise.allSettled([
    searchAmazon(query),
    searchFlipkart(query),
    searchMyntra(query),
  ]);
  return results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);
};
