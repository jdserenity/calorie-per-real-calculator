import { describe, expect, it } from "vitest";
import { addItem, computeCurrentItem, formatRatio, summarizeTrip, toPositiveNumber } from "../src/tripState.js";

describe("toPositiveNumber", () => {
  it("accepts positive numeric values", () => {
    expect(toPositiveNumber("12.5")).toBe(12.5);
  });

  it("rejects zero, negatives, and non-numbers", () => {
    expect(toPositiveNumber("0")).toBeNull();
    expect(toPositiveNumber("-2")).toBeNull();
    expect(toPositiveNumber("abc")).toBeNull();
  });
});

describe("computeCurrentItem", () => {
  it("computes item calories and calories-per-real", () => {
    const item = computeCurrentItem("200", "3", "15");
    expect(item).toEqual({
      totalCalories: 600,
      cost: 15,
      caloriesPerReal: 40
    });
  });

  it("returns null when any input is invalid", () => {
    expect(computeCurrentItem("", "2", "10")).toBeNull();
    expect(computeCurrentItem("100", "0", "10")).toBeNull();
    expect(computeCurrentItem("100", "2", "-1")).toBeNull();
  });
});

describe("cart and trip summaries", () => {
  it("adds valid items to the cart", () => {
    const first = computeCurrentItem("100", "2", "10");
    const second = computeCurrentItem("50", "4", "8");
    const cart = addItem(addItem([], first), second);
    expect(cart).toHaveLength(2);
  });

  it("computes total calories-per-real from total calories and cost", () => {
    const cart = [
      computeCurrentItem("100", "2", "10"),
      computeCurrentItem("200", "1", "20")
    ];
    const summary = summarizeTrip(cart);
    expect(summary.totalCalories).toBe(400);
    expect(summary.totalCost).toBe(30);
    expect(summary.caloriesPerReal).toBeCloseTo(13.3333, 4);
  });
});

describe("formatRatio", () => {
  it("formats numbers with two decimals and fallback placeholder", () => {
    expect(formatRatio(13.3333)).toBe("13.33");
    expect(formatRatio(null)).toBe("--");
  });
});
