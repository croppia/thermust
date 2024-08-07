"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jxvGM8JoNoi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MeatButton } from "@/components/MeatButton";
import { MeatCutButton } from "@/components/CutButton";
import { CookingMethod, MeatType, TemperatureUnit } from "@/lib/types";
import { safeTemperatures } from "@/lib/temps";
import { ThermometerIcon } from "lucide-react";
import { convertFarenheitToCelsius } from "@/lib/converter";

export default function Component() {
  const [selectedMeat, setSelectedMeat] = useState<MeatType>(MeatType.beef);
  const [selectedCut, setSelectedCut] = useState<string>(CookingMethod.steak);
  const [selectedUnit, setSelectedUnit] = useState<TemperatureUnit>(
    TemperatureUnit.fahrenheit
  );

  const handleSetMeat = useCallback(
    (meat: MeatType) => {
      setSelectedMeat(meat);
      if (
        selectedCut &&
        !Object.keys(safeTemperatures[meat]).includes(selectedCut)
      ) {
        setSelectedCut(Object.keys(safeTemperatures[meat])[0]);
      }
    },
    [selectedCut]
  );

  const recommendedTemp = useMemo(() => {
    if (selectedUnit === TemperatureUnit.celsius) {
      return {
        temperature: convertFarenheitToCelsius(
          safeTemperatures[selectedMeat][selectedCut].temperature
        ),
        label: safeTemperatures[selectedMeat][selectedCut].label,
      };
    }
    return safeTemperatures[selectedMeat][selectedCut];
  }, [selectedMeat, selectedCut, selectedUnit]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted dark:bg-background">
      <div className="max-w-md w-full px-6 py-10 bg-card dark:bg-card rounded-lg shadow-lg">
        <h3 className="text-center text-lg font-bold text-primary-foreground dark:text-primary-foreground">
          What temperature to cook
        </h3>
        <h2 className="text-center text-2xl font-bold mb-4 text-primary-foreground dark:text-primary-foreground">
          <span className="italic">{recommendedTemp.label}</span>
        </h2>
        <div className="text-center pb-8">
          <p className="text-4xl font-bold text-primary-foreground dark:text-primary-foreground">
            {recommendedTemp.temperature}°
            {selectedUnit === TemperatureUnit.celsius ? "C" : "F"}
          </p>
          <p className="text-sm text-muted-foreground">Internal temperature</p>
        </div>
        <div className="space-y-8">
          <div>
            <Label htmlFor="meat-type" className="block mb-3">
              Select Meat Type
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {Object.values(MeatType).map((meat) => (
                <MeatButton
                  key={meat}
                  meat={meat}
                  isSelected={selectedMeat === meat}
                  onClick={() => handleSetMeat(meat)}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="meat-cut" className="block mb-3">
              Select Meat Cut
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(safeTemperatures[selectedMeat]).map((cut) => (
                <MeatCutButton
                  key={cut}
                  cut={cut}
                  selected={selectedCut === cut}
                  onClick={() => setSelectedCut(cut)}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="temp-unit" className="block mb-3">
              Select Temperature Unit
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={
                  selectedUnit === TemperatureUnit.fahrenheit
                    ? "outline"
                    : "default"
                }
                size="xl"
                className="flex flex-col items-center justify-center"
                onClick={() => setSelectedUnit(TemperatureUnit.fahrenheit)}
              >
                <ThermometerIcon className="w-8 h-8" />
                {TemperatureUnit.fahrenheit}
              </Button>
              <Button
                variant={
                  selectedUnit === TemperatureUnit.celsius
                    ? "outline"
                    : "default"
                }
                size="xl"
                className="flex flex-col items-center justify-center"
                onClick={() => setSelectedUnit(TemperatureUnit.celsius)}
              >
                <ThermometerIcon className="w-8 h-8" />
                {TemperatureUnit.celsius}
              </Button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Reference: Cook: Heat it Up Chart.Partnership for Food Safety
              Education. May 2011.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
