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
  const results = [];

  // Run searches sequentially to stay within Render's 512MB RAM limit
  // Running 3 browsers in parallel exhausts memory and causes 502 Bad Gateway (OOM) crashes
  try {
    const amazon = await searchAmazon(clean);
    if (amazon) results.push(amazon);
  } catch (err) {
    console.warn("[searchAllSites] Amazon search failed:", err.message);
  }

  try {
    const flipkart = await searchFlipkart(clean);
    if (flipkart) results.push(flipkart);
  } catch (err) {
    console.warn("[searchAllSites] Flipkart search failed:", err.message);
  }

  try {
    const myntra = await searchMyntra(clean);
    if (myntra) results.push(myntra);
  } catch (err) {
    console.warn("[searchAllSites] Myntra search failed:", err.message);
  }

  return results;
};

