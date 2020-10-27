# OpenNEM Energy Functions

Energy functions in Javascript.

## Install

```sh
$ yarn add @opennem/energy-tools
```

## Functions

```js
/**
 * Calculate energy sum
 *
 * @param series power values
 * @param bucket_size_minutes size of the bucket in minutes
 */
export function energy_sum(
  series: number[],
  bucket_size_minutes: number,
): number
```

## Usage

```js
import { energy_sum } from "@opennem/energy-tools"

let energy = energy_sum([1, 2], 5)
```
