import { Button } from "@/components/ui/button";
import { CookingMethod } from "@/lib/types";

export function MeatCutButton({
  cut,
  selected,
  onClick,
}: {
  cut: CookingMethod;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={selected ? "outline" : "default"}
      size="xl"
      className="min-h-11 h-auto whitespace-normal px-3 py-3 text-center leading-tight"
      onClick={onClick}
      aria-pressed={selected}
      type="button"
    >
      {cut}
    </Button>
  );
}
