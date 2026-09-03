import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CookingMethod } from "@/lib/types";

export function MeatCutButton({
  cut,
  selected,
  isCurrent,
  href,
  onClick,
}: {
  cut: CookingMethod;
  selected: boolean;
  isCurrent: boolean;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Button
      asChild
      variant={selected ? "outline" : "default"}
      size="xl"
      className="min-h-11 h-auto whitespace-normal px-3 py-3 text-center leading-tight"
    >
      <Link
        href={href}
        onClick={onClick}
        aria-current={isCurrent ? "page" : undefined}
      >
        {cut}
      </Link>
    </Button>
  );
}
