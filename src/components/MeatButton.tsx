import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MeatType } from "@/lib/types";
import { meatIcons } from "@/lib/icons";

export function MeatButton({
  meat,
  isSelected,
  isCurrent,
  href,
  onClick,
}: {
  meat: MeatType;
  isSelected: boolean;
  isCurrent: boolean;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Button
      asChild
      variant={isSelected ? "outline" : "default"}
      size="xl"
      className="flex flex-col items-center justify-center"
    >
      <Link
        href={href}
        onClick={onClick}
        aria-current={isCurrent ? "page" : undefined}
      >
        {React.createElement(meatIcons[meat])}
        {meat}
      </Link>
    </Button>
  );
}
