const STORAGE_KEY = "calorie-per-real-cart";

export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cartItems) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

export function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
}
