import type { ReactElement } from "react";
import { IconBadge } from "../../components/card-components/IconBadge";

export const getHealtScore = (
  healthScore: number | undefined
): ReactElement | undefined => {
  if (typeof healthScore !== "number") return undefined;
  // Professional label without emoji
  return IconBadge({
    icon: "",
    text: `Punteggio salute: ${healthScore}`,
    color: "bg-blue-100 text-blue-950",
  }) as unknown as ReactElement;
};
