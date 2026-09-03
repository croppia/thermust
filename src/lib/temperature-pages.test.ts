import { describe, expect, it } from "vitest";
import { safeTemperatures } from "./temps";
import {
  allTemperaturePages,
  defaultTemperaturePageFor,
  foodRoutes,
  temperaturePageFromSlugs,
  temperaturePagePath,
} from "./temperature-pages";

describe("temperature page routes", () => {
  it("creates one unique crawlable page per supported food preparation", () => {
    const pages = allTemperaturePages();
    const supportedGuidanceCount = Object.values(safeTemperatures).reduce(
      (count, guidanceByMethod) =>
        count + Object.values(guidanceByMethod).length,
      0
    );

    expect(pages).toHaveLength(supportedGuidanceCount);
    expect(new Set(pages.map((page) => page.path)).size).toBe(pages.length);
  });

  it("round-trips every food and preparation slug", () => {
    for (const page of allTemperaturePages()) {
      expect(
        temperaturePageFromSlugs(page.foodSlug, page.preparationSlug)
      ).toEqual(page);
      expect(temperaturePagePath(page.foodType, page.method)).toBe(page.path);
    }
  });

  it("keeps canonical metadata distinct and concise", () => {
    const pages = allTemperaturePages();
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);

    for (const page of pages) {
      expect(page.title.length).toBeLessThanOrEqual(65);
      expect(page.description.length).toBeLessThanOrEqual(180);
      expect(page.path).toMatch(
        /^\/temperatures\/[a-z-]+\/[a-z-]+\/$/
      );
    }
  });

  it("rejects unsupported food and preparation combinations", () => {
    expect(temperaturePageFromSlugs("chicken", "steak")).toBeUndefined();
    expect(temperaturePageFromSlugs("unknown", "steak")).toBeUndefined();
  });

  it("gives every food selector a supported default page", () => {
    for (const { foodType } of foodRoutes) {
      expect(defaultTemperaturePageFor(foodType).foodType).toBe(foodType);
    }
  });
});
