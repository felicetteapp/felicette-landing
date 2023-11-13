export function getRandomItem<T>(items: Array<T>) {
  return items[Math.floor(Math.random() * items.length)];
}
