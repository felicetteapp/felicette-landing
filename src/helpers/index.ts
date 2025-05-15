export function getRandomItem<T>(items: Array<T>) {
  return items[Math.floor(Math.random() * items.length)];
}

export function easeInCubic(x: number): number {
  return x * x * x;
}
