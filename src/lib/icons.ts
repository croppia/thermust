import {
  Beef,
  Drumstick,
  Ham,
  ChefHat,
  Feather,
  Tent,
  Egg,
  Fish,
  Rabbit,
  Shell,
} from "lucide-react";
import { MeatType } from "./types";

export const meatIcons: Record<string, React.ComponentType> = {
  [MeatType.beef]: Beef,
  [MeatType.chicken]: Drumstick,
  [MeatType.pork]: Ham,
  [MeatType.lamb]: ChefHat,
  [MeatType.turkey]: Drumstick,
  [MeatType.fish]: Fish,
  [MeatType.shellfish]: Shell,
  [MeatType.game_birds]: Feather,
  [MeatType.game_meat]: Tent,
  [MeatType.rabbit]: Rabbit,
  [MeatType.eggs]: Egg,
};
