import { MeatType, CookingMethod } from "./types";

export const safeTemperatures: Record<
  MeatType,
  Record<string, { temperature: number; label: string }>
> = {
  [MeatType.beef]: {
    [CookingMethod.steak]: {
      temperature: 160,
      label: "Beef Steak",
    },
    [CookingMethod.roast]: {
      temperature: 145,
      label: "Beef Roast",
    },
    [CookingMethod.chops]: {
      temperature: 160,
      label: "Beef Chops",
    },
    [CookingMethod.ground]: {
      temperature: 160,
      label: "Ground Beef",
    },
    [CookingMethod.leftovers]: {
      temperature: 165,
      label: "Beef Leftovers",
    },
  },
  [MeatType.pork]: {
    [CookingMethod.steak]: {
      temperature: 145,
      label: "Pork Steak",
    },
    [CookingMethod.roast]: {
      temperature: 145,
      label: "Pork Roast",
    },
    [CookingMethod.chops]: {
      temperature: 145,
      label: "Pork Chops",
    },
    [CookingMethod.ground]: {
      temperature: 160,
      label: "Ground Pork",
    },
    [CookingMethod.leftovers]: {
      temperature: 165,
      label: "Pork Leftovers",
    },
  },
  [MeatType.chicken]: {
    [CookingMethod.ground]: {
      temperature: 165,
      label: "Ground Chicken",
    },
    [CookingMethod.parts]: {
      temperature: 165,
      label: "Chicken Parts(Wings, Thighs, etc.)",
    },
    [CookingMethod.whole]: {
      temperature: 165,
      label: "Whole Chicken",
    },
    [CookingMethod.leftovers]: {
      temperature: 165,
      label: "Chicken Leftovers",
    },
  },
  [MeatType.lamb]: {
    [CookingMethod.steak]: {
      temperature: 145,
      label: "Lamb Steak",
    },
    [CookingMethod.roast]: {
      temperature: 145,
      label: "Lamb Roast",
    },
    [CookingMethod.chops]: {
      temperature: 145,
      label: "Lamb Chops",
    },
    [CookingMethod.ground]: {
      temperature: 160,
      label: "Ground Lamb",
    },
    [CookingMethod.leftovers]: {
      temperature: 165,
      label: "Lamb Leftovers",
    },
  },
  [MeatType.turkey]: {
    [CookingMethod.ground]: {
      temperature: 165,
      label: "Ground Turkey",
    },
    [CookingMethod.parts]: {
      temperature: 165,
      label: "Turkey Parts(Wings, Thighs, etc.)",
    },
    [CookingMethod.whole]: {
      temperature: 165,
      label: "Whole Turkey",
    },
    [CookingMethod.leftovers]: {
      temperature: 165,
      label: "Turkey Leftovers",
    },
  },
  [MeatType.fish]: {
    [CookingMethod.ground]: {
      temperature: 145,
      label: "Ground Fish",
    },
    [CookingMethod.parts]: {
      temperature: 145,
      label: "Fish Parts(Fillets, etc.)",
    },
    [CookingMethod.whole]: {
      temperature: 145,
      label: "Whole Fish",
    },
    [CookingMethod.leftovers]: {
      temperature: 145,
      label: "Fish Leftovers",
    },
  },
  [MeatType.shellfish]: {
    [CookingMethod.ground]: {
      temperature: 145,
      label: "Ground Shellfish",
    },
    [CookingMethod.parts]: {
      temperature: 145,
      label: "Shellfish Parts(Clams, etc.)",
    },
    [CookingMethod.whole]: {
      temperature: 145,
      label: "Whole Shellfish",
    },
    [CookingMethod.leftovers]: {
      temperature: 145,
      label: "Shellfish Leftovers",
    },
  },
  [MeatType.game_birds]: {
    [CookingMethod.ground]: {
      temperature: 165,
      label: "Ground Game Birds",
    },
    [CookingMethod.parts]: {
      temperature: 165,
      label: "Game Birds Parts(Wings, Thighs, etc.)",
    },
    [CookingMethod.whole]: {
      temperature: 165,
      label: "Whole Game Birds",
    },
    [CookingMethod.leftovers]: {
      temperature: 165,
      label: "Game Birds Leftovers",
    },
  },
  [MeatType.game_meat]: {
    [CookingMethod.steak]: {
      temperature: 145,
      label: "Game Meat Steak",
    },
    [CookingMethod.roast]: {
      temperature: 145,
      label: "Game Meat Roast",
    },
    [CookingMethod.chops]: {
      temperature: 145,
      label: "Game Meat Chops",
    },
    [CookingMethod.ground]: {
      temperature: 160,
      label: "Ground Game Meat",
    },
    [CookingMethod.leftovers]: {
      temperature: 165,
      label: "Game Meat Leftovers",
    },
  },
  [MeatType.eggs]: {
    [CookingMethod.whole]: {
      temperature: 160,
      label: "Whole Eggs",
    },
    [CookingMethod.leftovers]: {
      temperature: 160,
      label: "Eggs Leftovers",
    },
  },
  [MeatType.rabbit]: {
    [CookingMethod.ground]: {
      temperature: 160,
      label: "Ground Rabbit",
    },
    [CookingMethod.parts]: {
      temperature: 160,
      label: "Rabbit Parts(Breasts, etc.)",
    },
    [CookingMethod.whole]: {
      temperature: 160,
      label: "Whole Rabbit",
    },
    [CookingMethod.leftovers]: {
      temperature: 160,
      label: "Rabbit Leftovers",
    },
  },
};

export function getSafeTemperature(
  meatType: MeatType,
  cookingMethod: CookingMethod
) {
  if (!safeTemperatures[meatType]) {
    return 0;
  }

  return safeTemperatures[meatType][cookingMethod];
}
