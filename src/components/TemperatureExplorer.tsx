"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MeatButton } from "@/components/MeatButton";
import { MeatCutButton } from "@/components/CutButton";
import { captureProductEvent } from "@/components/AnalyticsProvider";
import { ThermometerIcon } from "lucide-react";
import { convertFarenheitToCelsius } from "@/lib/converter";
import {
  FOOD_SAFETY_SOURCE,
  cookingMethodsFor,
} from "@/lib/temps";
import {
  defaultTemperaturePageFor,
  temperaturePagePath,
  type TemperaturePage,
} from "@/lib/temperature-pages";
import { CookingMethod, MeatType, TemperatureUnit } from "@/lib/types";

type TemperatureExplorerProps = {
  page: TemperaturePage;
  isLandingPage?: boolean;
};

function unitFromLocation(): TemperatureUnit {
  const unit = new URLSearchParams(window.location.search).get("unit");
  return unit === "celsius"
    ? TemperatureUnit.celsius
    : TemperatureUnit.fahrenheit;
}

export function TemperatureExplorer({
  page,
  isLandingPage = false,
}: TemperatureExplorerProps) {
  const [selectedUnit, setSelectedUnit] = useState<TemperatureUnit>(
    TemperatureUnit.fahrenheit
  );
  const methods = cookingMethodsFor(page.foodType);

  useEffect(() => {
    const syncUnitFromUrl = () => setSelectedUnit(unitFromLocation());
    syncUnitFromUrl();
    window.addEventListener("popstate", syncUnitFromUrl);
    return () => window.removeEventListener("popstate", syncUnitFromUrl);
  }, []);

  const displayTemperature = useMemo(() => {
    if (page.guidance.temperatureF === undefined) {
      return undefined;
    }
    return selectedUnit === TemperatureUnit.celsius
      ? convertFarenheitToCelsius(page.guidance.temperatureF)
      : page.guidance.temperatureF;
  }, [page.guidance.temperatureF, selectedUnit]);

  const pathWithUnit = (path: string): string =>
    selectedUnit === TemperatureUnit.celsius
      ? `${path}?unit=celsius`
      : path;

  const selectUnit = (unit: TemperatureUnit) => {
    setSelectedUnit(unit);
    const url = new URL(window.location.href);
    if (unit === TemperatureUnit.celsius) {
      url.searchParams.set("unit", "celsius");
    } else {
      url.searchParams.delete("unit");
    }
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    captureProductEvent("temperature_unit_selected", {
      temperature_unit: unit,
    });
  };

  return (
    <div className="min-h-screen bg-muted px-4 py-8 dark:bg-background">
      <main className="mx-auto w-full max-w-md bg-card px-6 py-8 shadow-lg dark:bg-card">
        <header className="mb-6 text-center">
          <Link
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
            href="/"
          >
            Thermust
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-primary-foreground">
            {isLandingPage
              ? "Safe minimum cooking temperature chart"
              : page.heading}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {isLandingPage
              ? "Choose a food and preparation to get its safe internal temperature in Fahrenheit or Celsius."
              : page.answer}
          </p>
        </header>

        <section
          className="mb-8 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <h2 className="mb-2 text-xl font-bold italic text-primary-foreground">
            {page.guidance.label}
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
          {page.guidance.temperatureF !== undefined && (
            <p className="text-sm text-muted-foreground">
              Safe minimum internal temperature
            </p>
          )}
          {page.guidance.restMinutes && (
            <p className="mt-3 font-medium">
              Rest for at least {page.guidance.restMinutes} minutes after
              removing from heat.
            </p>
          )}
          {page.guidance.donenessCue && (
            <p className="mt-3 text-sm">{page.guidance.donenessCue}</p>
          )}
        </section>

        <div className="space-y-8">
          <fieldset>
            <legend className="mb-3 text-sm font-medium">Food type</legend>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(MeatType).map((foodType) => {
                const targetPage =
                  page.foodType === foodType && !isLandingPage
                    ? page
                    : defaultTemperaturePageFor(foodType);
                return (
                  <MeatButton
                    key={foodType}
                    meat={foodType}
                    isSelected={page.foodType === foodType}
                    isCurrent={page.foodType === foodType && !isLandingPage}
                    href={pathWithUnit(targetPage.path)}
                    onClick={() =>
                      captureProductEvent("food_type_selected", {
                        food_type: foodType,
                      })
                    }
                  />
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-medium">Preparation</legend>
            <div className="grid grid-cols-2 gap-3">
              {methods.map((method) => (
                <MeatCutButton
                  key={method}
                  cut={method}
                  selected={page.method === method}
                  isCurrent={page.method === method && !isLandingPage}
                  href={pathWithUnit(
                    temperaturePagePath(page.foodType, method)
                  )}
                  onClick={() =>
                    captureProductEvent("preparation_selected", {
                      food_type: page.foodType,
                      preparation: method,
                    })
                  }
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
                  onClick={() => selectUnit(unit)}
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

        <section className="mt-8 border-t pt-5">
          <h2 className="font-bold text-primary-foreground">
            How to check {page.guidance.label.toLowerCase()}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {page.thermometerInstructions}
          </p>
        </section>

        <aside className="mt-5 border-t pt-5 text-sm text-muted-foreground">
          <p>
            These are U.S. government minimum safety recommendations. They are
            not a substitute for medical advice or local public-health guidance.
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
