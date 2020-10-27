import { energy_sum } from "../lib/index"

describe("Base tests", () => {
  it("should create and return a float", () => {
    const energy_result = energy_sum([0], 5)

    expect(energy_result).toBe(0.0)
  })
})
