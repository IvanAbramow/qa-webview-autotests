declare global {
  type TFunction<T = unknown, U extends unknown[] = unknown[]> = (...args: U) => T;
}

export {};

declare module 'lodash/capitalize';
