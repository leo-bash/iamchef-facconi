import type { ReactElement } from "react";
import { IconBadge } from "../../components/card-components/IconBadge";

export const getHealtScore = (
  healthScore: number | undefined
): ReactElement | undefined => {
  if (typeof healthScore !== "number") return undefined;
  // Call the component as a function to avoid JSX in a .ts file
  return IconBadge({
    icon: "💚",
    text: `Health Score ${healthScore}`,
    color: "bg-blue-100 text-blue-950",
  }) as unknown as ReactElement;
};
