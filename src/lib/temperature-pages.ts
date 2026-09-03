import { convertFarenheitToCelsius } from "./converter";
import {
  cookingMethodsFor,
  getSafeTemperature,
  type TemperatureGuidance,
} from "./temps";
import { CookingMethod, MeatType } from "./types";

type FoodRoute = {
  foodType: MeatType;
  slug: string;
  defaultMethod: CookingMethod;
};

type PreparationRoute = {
  method: CookingMethod;
  slug: string;
};

export type TemperaturePage = {
  foodType: MeatType;
  method: CookingMethod;
  foodSlug: string;
  preparationSlug: string;
  path: string;
  guidance: TemperatureGuidance;
  title: string;
  heading: string;
  description: string;
  answer: string;
  thermometerInstructions: string;
};

export const SITE_URL = "https://www.thermust.com";
export const SITE_CONTENT_UPDATED_AT = "2026-09-03";

export const foodRoutes: readonly FoodRoute[] = [
  { foodType: MeatType.beef, slug: "beef", defaultMethod: CookingMethod.steak },
  { foodType: MeatType.pork, slug: "pork", defaultMethod: CookingMethod.chops },
  {
    foodType: MeatType.chicken,
    slug: "chicken",
    defaultMethod: CookingMethod.whole,
  },
  { foodType: MeatType.lamb, slug: "lamb", defaultMethod: CookingMethod.chops },
  {
    foodType: MeatType.turkey,
    slug: "turkey",
    defaultMethod: CookingMethod.whole,
  },
  { foodType: MeatType.fish, slug: "fish", defaultMethod: CookingMethod.parts },
  {
    foodType: MeatType.shellfish,
    slug: "shellfish",
    defaultMethod: CookingMethod.crustaceans,
  },
  {
    foodType: MeatType.game_birds,
    slug: "game-birds",
    defaultMethod: CookingMethod.whole,
  },
  {
    foodType: MeatType.game_meat,
    slug: "game-meat",
    defaultMethod: CookingMethod.steak,
  },
  { foodType: MeatType.eggs, slug: "eggs", defaultMethod: CookingMethod.whole },
  {
    foodType: MeatType.rabbit,
    slug: "rabbit",
    defaultMethod: CookingMethod.whole,
  },
];

export const preparationRoutes: readonly PreparationRoute[] = [
  { method: CookingMethod.roast, slug: "roast" },
  { method: CookingMethod.steak, slug: "steak" },
  { method: CookingMethod.chops, slug: "chops" },
  { method: CookingMethod.ground, slug: "ground" },
  { method: CookingMethod.whole, slug: "whole" },
  { method: CookingMethod.parts, slug: "pieces" },
  { method: CookingMethod.leftovers, slug: "leftovers" },
  { method: CookingMethod.egg_dish, slug: "egg-dishes" },
  {
    method: CookingMethod.crustaceans,
    slug: "shrimp-lobster-crab-scallops",
  },
  { method: CookingMethod.bivalves, slug: "clams-oysters-mussels" },
];

function foodRouteFor(foodType: MeatType): FoodRoute {
  const route = foodRoutes.find((candidate) => candidate.foodType === foodType);
  if (!route) {
    throw new Error(`Missing route for food type: ${foodType}`);
  }
  return route;
}

function preparationRouteFor(method: CookingMethod): PreparationRoute {
  const route = preparationRoutes.find(
    (candidate) => candidate.method === method
  );
  if (!route) {
    throw new Error(`Missing route for preparation: ${method}`);
  }
  return route;
}

function temperatureText(guidance: TemperatureGuidance): string | undefined {
  if (guidance.temperatureF === undefined) {
    return undefined;
  }
  const temperatureC = convertFarenheitToCelsius(guidance.temperatureF);
  return `${guidance.temperatureF}°F (${temperatureC}°C)`;
}

function titleFor(
  foodType: MeatType,
  method: CookingMethod,
  guidance: TemperatureGuidance
): string {
  const temperatureF = guidance.temperatureF;
  if (method === CookingMethod.leftovers && temperatureF !== undefined) {
    return `Reheat ${foodType} Leftovers: ${temperatureF}°F | Thermust`;
  }
  if (temperatureF !== undefined) {
    return `${guidance.label} Internal Temperature: ${temperatureF}°F | Thermust`;
  }
  return `${guidance.label} Doneness Guide | Thermust`;
}

function headingFor(
  foodType: MeatType,
  method: CookingMethod,
  guidance: TemperatureGuidance
): string {
  if (method === CookingMethod.leftovers) {
    return `Safe temperature for reheating ${foodType.toLowerCase()} leftovers`;
  }
  if (guidance.temperatureF === undefined) {
    return `${guidance.label} safe cooking doneness`;
  }
  return `${guidance.label} internal temperature`;
}

function descriptionFor(
  foodType: MeatType,
  method: CookingMethod,
  guidance: TemperatureGuidance
): string {
  const temperature = temperatureText(guidance);
  if (method === CookingMethod.leftovers && temperature) {
    return `Reheat ${foodType.toLowerCase()} leftovers to a safe internal temperature of ${temperature}. Check the thickest part with a food thermometer.`;
  }
  if (temperature) {
    const rest = guidance.restMinutes
      ? `, then rest for ${guidance.restMinutes} minutes`
      : "";
    return `Cook ${guidance.label.toLowerCase()} to a safe minimum internal temperature of ${temperature}${rest}. Includes thermometer guidance and the U.S. government source.`;
  }
  return `${guidance.donenessCue} See the U.S. government food-safety source and practical doneness guidance for ${guidance.label.toLowerCase()}.`;
}

function answerFor(
  foodType: MeatType,
  method: CookingMethod,
  guidance: TemperatureGuidance
): string {
  const temperature = temperatureText(guidance);
  if (method === CookingMethod.leftovers && temperature) {
    return `Reheat ${foodType.toLowerCase()} leftovers to ${temperature}.`;
  }
  if (temperature) {
    const rest = guidance.restMinutes
      ? ` Let the food rest for at least ${guidance.restMinutes} minutes after removing it from the heat.`
      : "";
    return `The safe minimum internal temperature for ${guidance.label.toLowerCase()} is ${temperature}.${rest}`;
  }
  return guidance.donenessCue ?? "Follow the doneness guidance below.";
}

function thermometerInstructionsFor(
  foodType: MeatType,
  method: CookingMethod
): string {
  const isWholePoultry =
    method === CookingMethod.whole &&
    (foodType === MeatType.chicken ||
      foodType === MeatType.turkey ||
      foodType === MeatType.game_birds);
  if (isWholePoultry) {
    return "Check the innermost thigh, innermost wing, and thickest part of the breast. Keep the thermometer probe away from bone.";
  }
  if (
    method === CookingMethod.steak ||
    method === CookingMethod.chops ||
    method === CookingMethod.parts
  ) {
    return "Insert the thermometer into the thickest part, away from bone, fat, and gristle. For thin pieces, insert the probe through the side so the sensing area reaches the center.";
  }
  return "Measure the thickest or coolest part of the food with a food thermometer. Avoid touching bone or the cooking surface with the probe.";
}

export function temperaturePagePath(
  foodType: MeatType,
  method: CookingMethod
): string {
  const foodRoute = foodRouteFor(foodType);
  const preparationRoute = preparationRouteFor(method);
  return `/temperatures/${foodRoute.slug}/${preparationRoute.slug}/`;
}

export function temperaturePageFor(
  foodType: MeatType,
  method: CookingMethod
): TemperaturePage | undefined {
  const guidance = getSafeTemperature(foodType, method);
  if (!guidance) {
    return undefined;
  }
  const foodRoute = foodRouteFor(foodType);
  const preparationRoute = preparationRouteFor(method);
  return {
    foodType,
    method,
    foodSlug: foodRoute.slug,
    preparationSlug: preparationRoute.slug,
    path: temperaturePagePath(foodType, method),
    guidance,
    title: titleFor(foodType, method, guidance),
    heading: headingFor(foodType, method, guidance),
    description: descriptionFor(foodType, method, guidance),
    answer: answerFor(foodType, method, guidance),
    thermometerInstructions: thermometerInstructionsFor(foodType, method),
  };
}

export function defaultTemperaturePageFor(
  foodType: MeatType
): TemperaturePage {
  const foodRoute = foodRouteFor(foodType);
  const page = temperaturePageFor(foodType, foodRoute.defaultMethod);
  if (!page) {
    throw new Error(`Missing default temperature page for: ${foodType}`);
  }
  return page;
}

export function temperaturePageFromSlugs(
  foodSlug: string,
  preparationSlug: string
): TemperaturePage | undefined {
  const foodRoute = foodRoutes.find((candidate) => candidate.slug === foodSlug);
  const preparationRoute = preparationRoutes.find(
    (candidate) => candidate.slug === preparationSlug
  );
  if (!foodRoute || !preparationRoute) {
    return undefined;
  }
  return temperaturePageFor(foodRoute.foodType, preparationRoute.method);
}

export function allTemperaturePages(): TemperaturePage[] {
  return foodRoutes.flatMap(({ foodType }) =>
    cookingMethodsFor(foodType).flatMap((method) => {
      const page = temperaturePageFor(foodType, method);
      return page ? [page] : [];
    })
  );
}
