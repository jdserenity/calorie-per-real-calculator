import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearCart, loadCart, saveCart } from "../src/storage.js";

describe("storage", () => {
  let store;

  beforeEach(() => {
    store = new Map();
    globalThis.localStorage = {
      getItem: vi.fn((key) => (store.has(key) ? store.get(key) : null)),
      setItem: vi.fn((key, value) => {
        store.set(key, value);
      }),
      removeItem: vi.fn((key) => {
        store.delete(key);
      })
    };
  });

  it("saves and loads cart items", () => {
    const cart = [{ totalCalories: 500, cost: 12.5, caloriesPerReal: 40 }];
    saveCart(cart);
    expect(loadCart()).toEqual(cart);
  });

  it("clears persisted cart", () => {
    saveCart([{ totalCalories: 100, cost: 5, caloriesPerReal: 20 }]);
    clearCart();
    expect(loadCart()).toEqual([]);
  });
});
