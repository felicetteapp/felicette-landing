export function getRandomItem<T>(items: Array<T>) {
  return items[Math.floor(Math.random() * items.length)];
}

export function easeInCubic(x: number): number {
  return x * x * x;
}

export function easeInOutBack(x: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export const easeTo = ({
  start,
  end,
  duration,
  startTime,
  easingFunction = easeInCubic,
}: {
  start: number;
  end: number;
  duration: number;
  startTime: number;
  easingFunction?: (x: number) => number;
}) => {
  const currentTime = Date.now();
  const timeElapsed = currentTime - startTime;
  const progress = Math.min(timeElapsed / duration, 1);
  const easedProgress = easingFunction(progress);

  return start + (end - start) * easedProgress;
};
