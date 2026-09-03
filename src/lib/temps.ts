import { CookingMethod, MeatType } from "./types";

export const FOOD_SAFETY_SOURCE = {
  label: "FoodSafety.gov Safe Minimum Internal Temperature Chart",
  url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  reviewedAt: "2024-11-21",
} as const;

export type TemperatureGuidance = {
  label: string;
  temperatureF?: number;
  restMinutes?: number;
  donenessCue?: string;
};

type GuidanceByMethod = Partial<Record<CookingMethod, TemperatureGuidance>>;

const leftovers = (label: string): TemperatureGuidance => ({
  label: `${label} leftovers`,
  temperatureF: 165,
});

export const safeTemperatures: Record<MeatType, GuidanceByMethod> = {
  [MeatType.beef]: {
    [CookingMethod.steak]: { label: "Beef steak", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.roast]: { label: "Beef roast", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.chops]: { label: "Beef chops", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.ground]: { label: "Ground beef", temperatureF: 160 },
    [CookingMethod.leftovers]: leftovers("Beef"),
  },
  [MeatType.pork]: {
    [CookingMethod.steak]: { label: "Pork steak", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.roast]: { label: "Pork roast", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.chops]: { label: "Pork chops", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.ground]: { label: "Ground pork", temperatureF: 160 },
    [CookingMethod.leftovers]: leftovers("Pork"),
  },
  [MeatType.chicken]: {
    [CookingMethod.ground]: { label: "Ground chicken", temperatureF: 165 },
    [CookingMethod.parts]: { label: "Chicken pieces", temperatureF: 165 },
    [CookingMethod.whole]: { label: "Whole chicken", temperatureF: 165 },
    [CookingMethod.leftovers]: leftovers("Chicken"),
  },
  [MeatType.lamb]: {
    [CookingMethod.steak]: { label: "Lamb steak", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.roast]: { label: "Lamb roast", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.chops]: { label: "Lamb chops", temperatureF: 145, restMinutes: 3 },
    [CookingMethod.ground]: { label: "Ground lamb", temperatureF: 160 },
    [CookingMethod.leftovers]: leftovers("Lamb"),
  },
  [MeatType.turkey]: {
    [CookingMethod.ground]: { label: "Ground turkey", temperatureF: 165 },
    [CookingMethod.parts]: { label: "Turkey pieces", temperatureF: 165 },
    [CookingMethod.whole]: { label: "Whole turkey", temperatureF: 165 },
    [CookingMethod.leftovers]: leftovers("Turkey"),
  },
  [MeatType.fish]: {
    [CookingMethod.parts]: { label: "Fish fillet", temperatureF: 145, donenessCue: "Or cook until the flesh is opaque and separates easily with a fork." },
    [CookingMethod.whole]: { label: "Whole fish", temperatureF: 145, donenessCue: "Or cook until the flesh is opaque and separates easily with a fork." },
    [CookingMethod.leftovers]: leftovers("Fish"),
  },
  [MeatType.shellfish]: {
    [CookingMethod.crustaceans]: { label: "Shrimp, lobster, crab, or scallops", donenessCue: "Cook until the flesh is pearly or white and opaque." },
    [CookingMethod.bivalves]: { label: "Clams, oysters, or mussels", donenessCue: "Cook until the shells open; discard any that stay closed." },
    [CookingMethod.leftovers]: leftovers("Shellfish"),
  },
  [MeatType.game_birds]: {
    [CookingMethod.parts]: { label: "Game bird pieces", temperatureF: 165 },
    [CookingMethod.whole]: { label: "Whole game bird", temperatureF: 165 },
    [CookingMethod.leftovers]: leftovers("Game bird"),
  },
  [MeatType.game_meat]: {
    [CookingMethod.steak]: { label: "Venison steak", temperatureF: 160 },
    [CookingMethod.roast]: { label: "Venison roast", temperatureF: 160 },
    [CookingMethod.chops]: { label: "Venison chops", temperatureF: 160 },
    [CookingMethod.ground]: { label: "Ground venison", temperatureF: 160 },
    [CookingMethod.leftovers]: leftovers("Venison"),
  },
  [MeatType.eggs]: {
    [CookingMethod.whole]: { label: "Eggs", donenessCue: "Cook until the yolk and white are firm." },
    [CookingMethod.egg_dish]: { label: "Egg dish", temperatureF: 160 },
    [CookingMethod.leftovers]: leftovers("Egg"),
  },
  [MeatType.rabbit]: {
    [CookingMethod.parts]: { label: "Rabbit pieces", temperatureF: 160 },
    [CookingMethod.whole]: { label: "Whole rabbit", temperatureF: 160 },
    [CookingMethod.ground]: { label: "Ground rabbit", temperatureF: 160 },
    [CookingMethod.leftovers]: leftovers("Rabbit"),
  },
};

export function cookingMethodsFor(meatType: MeatType): CookingMethod[] {
  return Object.keys(safeTemperatures[meatType]) as CookingMethod[];
}

export function getSafeTemperature(
  meatType: MeatType,
  cookingMethod: CookingMethod
): TemperatureGuidance | undefined {
  return safeTemperatures[meatType][cookingMethod];
}
