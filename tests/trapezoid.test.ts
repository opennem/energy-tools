import { trapezoid } from "../src"

describe("test trapezoid simple two points square", () => {
  const points = [
    { x: 1, y: 0 },
    { x: 1, y: 5 },
  ]

  it("should calculate the correct trapezoid", () => {
    const result = trapezoid(points[0], points[1])

    expect(result).toBe(5)
  })
})

describe("test trapezoid simple two points", () => {
  const points = [
    { x: 1, y: 0 },
    { x: 2, y: 5 },
  ]

  it("should calculate the correct trapezoid", () => {
    const result = trapezoid(points[0], points[1])

    expect(result).toBe(7.5)
  })
})

describe("test trapezoid simple two points reversed", () => {
  const points = [
    { x: 2, y: 0 },
    { x: 1, y: 5 },
  ]

  it("should calculate the correct trapezoid", () => {
    const result = trapezoid(points[0], points[1])

    expect(result).toBe(7.5)
  })
})

describe("test trapezoid simple", () => {
  const points = [
    { x: 10946.91, y: 0 },
    { x: 10777.92, y: 5 },
  ]

  it("should calculate the correct trapezoid", () => {
    const result = trapezoid(points[0], points[1])

    expect(Math.round(result)).toBe(54312)
  })
})
