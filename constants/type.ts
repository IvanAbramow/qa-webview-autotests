import config from 'config';

import type * as schema from '../config/default.json';

export type TConfig = typeof schema;

type TFlattenObjectKeys<T extends Record<string, unknown>, Key = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${TFlattenObjectKeys<T[Key]>}` | `${Key}`
    : `${Key}`
  : never;

type TRecursiveLookup<C, K> = K extends `${infer A}.${infer B}`
  ? A extends keyof C
    ? B extends keyof C[A]
      ? C[A][B]
      : TRecursiveLookup<C[A], B>
    : never
  : K extends keyof C
  ? C[K]
  : never;

export default {
  get: <K extends TFlattenObjectKeys<TConfig>>(key: K): TRecursiveLookup<TConfig, K> => config.get(key),
};
