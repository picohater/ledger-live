import { Data } from "./types";

/**
 * Lower bound for the y-axis so a balance history far from zero isn't drawn as a
 * flat line. Returns undefined for flat series, which keeps the 0 baseline.
 */
export function getSuggestedMin(data: Data, valueKey: "value" | "countervalue" = "value") {
  let min = Infinity;
  let max = -Infinity;
  for (const item of data) {
    const value = item[valueKey];
    if (typeof value !== "number" || !Number.isFinite(value)) continue;
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return Number.isFinite(min) && min !== max ? min : undefined;
}
