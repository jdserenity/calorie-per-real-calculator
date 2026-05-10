/** @param {{ value: string }[]} inputs */
export function clearInputElements(inputs) {
  for (const input of inputs) input.value = "";
}
