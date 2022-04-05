export function changeClassToClass(container, remClass, addClass) {
  container.classList.remove(`${remClass}`);
  container.classList.add(`${addClass}`);
}
