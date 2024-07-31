/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jxvGM8JoNoi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
              >
                <MilkIcon className="w-6 h-6" />
                Beef
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
              >
                <BirdIcon className="w-6 h-6" />
                Chicken
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
              >
                <PiggyBankIcon className="w-6 h-6" />
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
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
              >
                Ground
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
              >
                Steak
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
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
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
              >
                <ThermometerIcon className="w-6 h-6" />
                Celsius
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-3"
              >
                <ThermometerIcon className="w-6 h-6" />
                Fahrenheit
              </Button>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="w-full">
              Get Recommended Temperature
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BirdIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 7h.01" />
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
      <path d="m20 7 2 .5-2 .5" />
      <path d="M10 18v3" />
      <path d="M14 17.75V21" />
      <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
  );
}

function MilkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2h8" />
      <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
      <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
    </svg>
  );
}

function PiggyBankIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
      <path d="M16 11h0" />
    </svg>
  );
}

function ThermometerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
