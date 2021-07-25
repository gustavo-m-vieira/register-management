export function handleReset() {
  Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  );
};