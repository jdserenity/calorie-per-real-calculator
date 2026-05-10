import { describe, expect, it } from "vitest";
import { clearInputElements } from "../src/inputUtils.js";

describe("clearInputElements", () => {
  it("sets value to empty string for each input-like object", () => {
    const a = { value: "100" };
    const b = { value: "2" };
    const c = { value: "9.5" };
    clearInputElements([a, b, c]);
    expect(a.value).toBe("");
    expect(b.value).toBe("");
    expect(c.value).toBe("");
  });

  it("handles an empty list", () => {
    expect(() => clearInputElements([])).not.toThrow();
  });
});
