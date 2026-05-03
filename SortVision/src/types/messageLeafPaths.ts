/**
 * Dot-notation paths to string leaf values in a nested message tree.
 * Used to derive compile-time translation keys from the canonical English catalog.
 */
export type MessageLeafPath<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string
        ? `${K}`
        : T[K] extends object
          ? `${K}.${MessageLeafPath<T[K]>}`
          : never;
    }[keyof T & string];
