"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MeatButton } from "@/components/MeatButton";
import { MeatCutButton } from "@/components/CutButton";
import { captureProductEvent } from "@/components/AnalyticsProvider";
import { CookingMethod, MeatType, TemperatureUnit } from "@/lib/types";
import {
  cookingMethodsFor,
  FOOD_SAFETY_SOURCE,
  getSafeTemperature,
} from "@/lib/temps";
import { ThermometerIcon } from "lucide-react";
import { convertFarenheitToCelsius } from "@/lib/converter";

export default function Home() {
  const [selectedMeat, setSelectedMeat] = useState<MeatType>(MeatType.beef);
  const [selectedCut, setSelectedCut] = useState<CookingMethod>(
    CookingMethod.steak
  );
  const [selectedUnit, setSelectedUnit] = useState<TemperatureUnit>(
    TemperatureUnit.fahrenheit
  );

  const methods = cookingMethodsFor(selectedMeat);
  const guidance = getSafeTemperature(selectedMeat, selectedCut);

  const handleSetMeat = useCallback((meat: MeatType) => {
    const nextMethod = cookingMethodsFor(meat)[0];
    setSelectedMeat(meat);
    setSelectedCut(nextMethod);
    captureProductEvent("food_type_selected", { food_type: meat });
  }, []);

  const displayTemperature = useMemo(() => {
    if (guidance?.temperatureF === undefined) {
      return undefined;
    }
    return selectedUnit === TemperatureUnit.celsius
      ? convertFarenheitToCelsius(guidance.temperatureF)
      : guidance.temperatureF;
  }, [guidance, selectedUnit]);

  if (!guidance) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted px-4 py-8 dark:bg-background">
      <main className="mx-auto w-full max-w-md bg-card px-6 py-8 shadow-lg dark:bg-card">
        <header className="mb-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">Thermust</p>
          <h1 className="text-2xl font-bold text-primary-foreground">
            Safe minimum cooking temperature
          </h1>
        </header>

        <section
          className="mb-8 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <h2 className="mb-2 text-xl font-bold italic text-primary-foreground">
            {guidance.label}
          </h2>
          {displayTemperature === undefined ? (
            <p className="text-xl font-bold text-primary-foreground">
              Use the doneness cue below
            </p>
          ) : (
            <p className="text-4xl font-bold text-primary-foreground">
              {displayTemperature}°
              {selectedUnit === TemperatureUnit.celsius ? "C" : "F"}
            </p>
          )}
          {guidance.temperatureF !== undefined && (
            <p className="text-sm text-muted-foreground">
              Minimum internal temperature
            </p>
          )}
          {guidance.restMinutes && (
            <p className="mt-3 font-medium">
              Rest for at least {guidance.restMinutes} minutes after removing
              from heat.
            </p>
          )}
          {guidance.donenessCue && (
            <p className="mt-3 text-sm">{guidance.donenessCue}</p>
          )}
        </section>

        <div className="space-y-8">
          <fieldset>
            <legend className="mb-3 text-sm font-medium">Food type</legend>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(MeatType).map((meat) => (
                <MeatButton
                  key={meat}
                  meat={meat}
                  isSelected={selectedMeat === meat}
                  onClick={() => handleSetMeat(meat)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-medium">Preparation</legend>
            <div className="grid grid-cols-2 gap-3">
              {methods.map((method) => (
                <MeatCutButton
                  key={method}
                  cut={method}
                  selected={selectedCut === method}
                  onClick={() => {
                    setSelectedCut(method);
                    captureProductEvent("preparation_selected", {
                      food_type: selectedMeat,
                      preparation: method,
                    });
                  }}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-medium">
              Temperature unit
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(TemperatureUnit).map((unit) => (
                <Button
                  key={unit}
                  variant={selectedUnit === unit ? "outline" : "default"}
                  size="xl"
                  className="flex flex-col items-center justify-center"
                  onClick={() => setSelectedUnit(unit)}
                  aria-pressed={selectedUnit === unit}
                  type="button"
                >
                  <ThermometerIcon className="h-8 w-8" aria-hidden="true" />
                  {unit}
                </Button>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="mt-8 border-t pt-5 text-sm text-muted-foreground">
          <p>
            Check the thickest part with a food thermometer. These are minimum
            safety recommendations, not a substitute for advice tailored to a
            medical condition or local public-health guidance.
          </p>
          <p className="mt-3 text-xs">
            Source: {" "}
            <a
              className="underline underline-offset-2"
              href={FOOD_SAFETY_SOURCE.url}
              rel="noreferrer"
              target="_blank"
            >
              {FOOD_SAFETY_SOURCE.label}
            </a>{" "}
            (reviewed {FOOD_SAFETY_SOURCE.reviewedAt}).
          </p>
        </aside>
      </main>

      <footer className="mx-auto mt-4 max-w-md text-center text-xs text-muted-foreground">
        Built by {" "}
        <a className="underline" href="https://twitter.com/jvivas_official">
          J Vivas
        </a>
        . {" "}
        <a className="underline" href="https://github.com/croppia/thermust">
          Source code
        </a>
        .
      </footer>
    </div>
  );
}
