/**
 * Utilities for type assertion
 *
 * See <https://2ality.com/2025/02/testing-types-typescript.html>
 */

export type StrictEqual<X, Y>
  = (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

export type SimpleEqual2<X, Y>
  = [X] extends [Y]
    ? ([Y] extends [X] ? true : false)
    : false

export type Assert<T extends true> = T
