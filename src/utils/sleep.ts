/**
 * Ожидание в миллисекундах
 * @param ms - milliseconds to sleep
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
