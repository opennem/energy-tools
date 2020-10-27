/* eslint-disable import/no-unresolved */
import { energy_sum } from "../src/index"

import coal_black_1_day from "./coal_black_1_day.json"
import battery_charging_1_day from "./battery_charging_1_day.json"

const MINUTES_IN_DAY = 1440

describe("Base tests", () => {
  it("should create and return a float", () => {
    const energy_result = energy_sum([0], 5)

    expect(typeof energy_result).toBe("number")
  })
})

describe("One day 5 minute interval tests", () => {
  it("should return the right number of intervals", () => {
    expect(coal_black_1_day.length).toBe(288)
  })

  it("should a number that is close to correct", () => {
    const energy_value = energy_sum(coal_black_1_day, MINUTES_IN_DAY)
    const actual_value = 248.88 * 1000
    const variation_p = (energy_value - actual_value) / actual_value

    expect(typeof energy_value).toBe("number")
    expect(variation_p).toBeLessThan(0.2)
  })
})

describe("One day 5 minute interval battery charging (negative) tests", () => {
  it("should return the right number of intervals", () => {
    expect(battery_charging_1_day.length).toBe(288)
  })

  it("should a number that is close to correct", () => {
    const energy_value = energy_sum(battery_charging_1_day, MINUTES_IN_DAY)
    const actual_value = -0.21 * 1000
    const variation_p = (energy_value - actual_value) / actual_value

    expect(typeof energy_value).toBe("number")
    expect(variation_p).toBeLessThan(0.2)
  })
})

describe("test null value in series", () => {
  const series = [1, null, 1]

  it("should calculate the correct trapezoid", () => {
    const result = energy_sum(series, 60)

    expect(result).toBe(1 / 3)
  })
})

describe("test two values in series", () => {
  const series = [1, 2]

  it("should calculate the correct trapezoid", () => {
    const result = energy_sum(series, 60)

    expect(result).toBe(0.75)
  })
})

describe("test two values in series simple", () => {
  const series = [1, 1, 1]

  it("should calculate the correct trapezoid", () => {
    const result = energy_sum(series, 60)

    expect(result).toBe((1 / 3) * 2)
  })
})

describe("test three values in series floats", () => {
  const series = [1.0, 2.0, 1.0]

  it("should calculate the correct trapezoid", () => {
    const result = energy_sum(series, 60)

    expect(result).toBe(1)
  })
})
