export function toPositiveNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function computeCurrentItem(caloriesPerPortion, portions, costReais) {
  const calories = toPositiveNumber(caloriesPerPortion);
  const portionCount = toPositiveNumber(portions);
  const cost = toPositiveNumber(costReais);
  if (!calories || !portionCount || !cost) return null;
  const totalCalories = calories * portionCount;
  const caloriesPerReal = totalCalories / cost;
  return { totalCalories, cost, caloriesPerReal };
}

export function addItem(cartItems, item) {
  if (!item) return cartItems;
  return [...cartItems, item];
}

export function summarizeTrip(cartItems) {
  const totals = cartItems.reduce(
    (acc, item) => {
      acc.totalCalories += item.totalCalories;
      acc.totalCost += item.cost;
      return acc;
    },
    { totalCalories: 0, totalCost: 0 }
  );
  const caloriesPerReal = totals.totalCost > 0 ? totals.totalCalories / totals.totalCost : null;
  return { ...totals, caloriesPerReal };
}

export function formatRatio(value) {
  if (value == null) return "--";
  return value.toFixed(2);
}
