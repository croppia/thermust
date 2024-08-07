import React from "react";
import { Button } from "@/components/ui/button";
import { MeatType } from "@/lib/types";
import { meatIcons } from "@/lib/icons";

export function MeatButton({
  meat,
  isSelected,
  onClick,
}: {
  meat: MeatType;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={isSelected ? "outline" : "default"}
      size="xl"
      className="flex flex-col items-center justify-center"
      onClick={onClick}
    >
      {React.createElement(meatIcons[meat])}
      {meat}
    </Button>
  );
}
