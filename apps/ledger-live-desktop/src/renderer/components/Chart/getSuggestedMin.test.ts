import { getSuggestedMin } from "./getSuggestedMin";
import { Data } from "./types";

const point = (value: number, countervalue?: number) => ({
  date: new Date(0),
  value,
  countervalue,
});

describe("getSuggestedMin", () => {
  it("returns the lowest value of a varying series", () => {
    expect(getSuggestedMin([point(12), point(9), point(30)])).toBe(9);
  });

  it("returns undefined for a flat series so the 0 baseline is kept", () => {
    expect(getSuggestedMin([point(5), point(5)])).toBeUndefined();
  });

  it("returns undefined for empty and single-point series", () => {
    expect(getSuggestedMin([])).toBeUndefined();
    expect(getSuggestedMin([point(5)])).toBeUndefined();
  });

  it("ignores non-finite and missing values", () => {
    expect(getSuggestedMin([point(NaN), point(4), point(7)])).toBe(4);
    expect(getSuggestedMin([point(4), point(7)], "countervalue")).toBeUndefined();
  });

  it("reads the requested key", () => {
    expect(getSuggestedMin([point(1, 100), point(2, 80)], "countervalue")).toBe(80);
  });

  it("keeps 0 when the series touches zero", () => {
    expect(getSuggestedMin([point(0), point(40)])).toBe(0);
  });

  it("does not spread large series into Math.min", () => {
    const history = Array.from({ length: 200_000 }, (_, i) => point(i + 1));
    expect(getSuggestedMin(history as Data)).toBe(1);
  });
});
