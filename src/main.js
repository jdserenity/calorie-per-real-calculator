import { addItem, computeCurrentItem, formatRatio, summarizeTrip } from "./tripState.js";
import { clearInputElements } from "./inputUtils.js";
import { clearCart, loadCart, saveCart } from "./storage.js";

const caloriesInput = document.querySelector("#caloriesPerPortion");
const portionsInput = document.querySelector("#portions");
const costInput = document.querySelector("#cost");
const clearEntriesButton = document.querySelector("#clearEntries");
const currentRatioEl = document.querySelector("#currentRatio");
const addToCartButton = document.querySelector("#addToCart");
const cartList = document.querySelector("#cartList");
const tripTotalRatioEl = document.querySelector("#tripTotalRatio");
const clearCartButton = document.querySelector("#clearCart");

let cartItems = loadCart();

function currentDraftItem() {
  return computeCurrentItem(
    caloriesInput.value,
    portionsInput.value,
    costInput.value
  );
}

function renderCart() {
  cartList.innerHTML = "";
  clearCartButton.disabled = cartItems.length === 0;
  if (cartItems.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No items yet.";
    cartList.append(empty);
  } else {
    cartItems.forEach((item, index) => {
      const row = document.createElement("li");
      row.textContent = `#${index + 1}: ${formatRatio(item.caloriesPerReal)} cal/R$`;
      cartList.append(row);
    });
  }
  const summary = summarizeTrip(cartItems);
  tripTotalRatioEl.textContent = formatRatio(summary.caloriesPerReal);
}

function renderCurrentRatio() {
  const item = currentDraftItem();
  currentRatioEl.textContent = formatRatio(item?.caloriesPerReal ?? null);
  addToCartButton.disabled = !item;
}

function clearInputs() {
  clearInputElements([caloriesInput, portionsInput, costInput]);
}

[caloriesInput, portionsInput, costInput].forEach((input) => {
  input.addEventListener("input", renderCurrentRatio);
});

clearEntriesButton.addEventListener("click", () => {
  clearInputs();
  renderCurrentRatio();
});

addToCartButton.addEventListener("click", () => {
  const item = currentDraftItem();
  if (!item) return;
  cartItems = addItem(cartItems, item);
  saveCart(cartItems);
  clearInputs();
  renderCurrentRatio();
  renderCart();
});

clearCartButton.addEventListener("click", () => {
  if (cartItems.length === 0) return;
  const shouldClear = window.confirm("Are you sure you want to clear the cart?");
  if (!shouldClear) return;
  cartItems = [];
  clearCart();
  renderCart();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

renderCurrentRatio();
renderCart();
