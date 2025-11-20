import type { ComponentType } from "react";

export const preload = (importer: () => Promise<{ default: ComponentType }>) => {
  if (typeof importer === "function") {
    importer();
  }
};
