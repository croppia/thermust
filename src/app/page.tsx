/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jxvGM8JoNoi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  BeefIcon,
  DrumstickIcon,
  PiggyBank,
  ThermometerIcon,
} from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted dark:bg-background">
      <div className="max-w-md w-full px-6 py-10 bg-card dark:bg-card rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-primary-foreground dark:text-primary-foreground">
          Safe temperature
        </h2>
        <div className="text-center pb-8">
          <p className="text-4xl font-bold text-primary-foreground dark:text-primary-foreground">
            160°F
          </p>
        </div>
        <div className="space-y-8">
          <div>
            <Label htmlFor="meat-type" className="block mb-3">
              Select Meat Type
            </Label>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="default"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                <BeefIcon className="w-8 h-8" />
                Beef
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                <DrumstickIcon className="w-8 h-8" />
                Chicken
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                <PiggyBank className="w-8 h-8" />
                Pork
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="meat-cut" className="block mb-3">
              Select Meat Cut
            </Label>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                Ground
              </Button>
              <Button
                variant="default"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                Steak
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                Stew
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="temp-unit" className="block mb-3">
              Select Temperature Unit
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                <ThermometerIcon className="w-8 h-8" />
                Celsius
              </Button>
              <Button
                variant="default"
                size="xl"
                className="flex flex-col items-center justify-center"
              >
                <ThermometerIcon className="w-8 h-8" />
                Fahrenheit
              </Button>
            </div>
          </div>
          <div className="text-center">
            <Button size="xl" variant="destructive" className="w-full">
              Get Recommended Temperature
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
