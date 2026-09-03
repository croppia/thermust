import { describe, expect, it } from "vitest";
import { CookingMethod, MeatType } from "./types";
import {
  cookingMethodsFor,
  getSafeTemperature,
  safeTemperatures,
} from "./temps";

describe("food safety guidance", () => {
  it("reheats every leftover category to 165°F", () => {
    for (const foodType of Object.values(MeatType)) {
      expect(
        getSafeTemperature(foodType, CookingMethod.leftovers)?.temperatureF
      ).toBe(165);
    }
  });

  it("includes the required three-minute rest for 145°F whole cuts", () => {
    for (const foodType of [MeatType.beef, MeatType.pork, MeatType.lamb]) {
      for (const method of [
        CookingMethod.steak,
        CookingMethod.roast,
        CookingMethod.chops,
      ]) {
        expect(getSafeTemperature(foodType, method)).toMatchObject({
          temperatureF: 145,
          restMinutes: 3,
        });
      }
    }
  });

  it("uses doneness cues for shellfish rather than inventing a temperature", () => {
    const shellfishGuidance = cookingMethodsFor(MeatType.shellfish).map(
      (method) => safeTemperatures[MeatType.shellfish][method]
    );
    for (const guidance of shellfishGuidance.slice(0, 2)) {
      expect(guidance).not.toHaveProperty("temperatureF");
      expect(guidance).toEqual(
        expect.objectContaining({ donenessCue: expect.any(String) })
      );
    }
  });
});
