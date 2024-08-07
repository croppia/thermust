import { Button } from "@/components/ui/button";
import { CookingMethod } from "@/lib/types";

export function MeatCutButton({
  cut,
  selected,
  onClick,
}: {
  cut: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={selected ? "outline" : "default"}
      size="xl"
      className="flex flex-col items-center justify-center"
      onClick={onClick}
    >
      {cut}
    </Button>
  );
}
