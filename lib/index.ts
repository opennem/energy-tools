/* eslint-disable arrow-body-style */
/**
 * OpenNEM Energy Functions
 *
 */

interface Point {
  x: number
  y: number
}

/**
 * Calculate trapezoid area between two points
 *
 * @param p1 first point
 * @param p2 second point
 */
export function trapezoid(p1: Point, p2: Point): number {
  const width = p2.y - p1.y

  const ret = p1.x * width + ((p2.x - p1.x) * width) / 2

  return ret
}

/**
 * Calculate energy sum
 *
 * @param series power values
 * @param bucket_size_minutes size of the bucket in minutes
 */
export function energy_sum(
  series: number[],
  bucket_size_minutes: number,
): number {
  const number_intervals = series.length
  const interval_size = bucket_size_minutes / number_intervals

  const y_series = Array.from(
    new Array(number_intervals),
    (element, index) => index * interval_size,
  )

  const series_points: Point[] = series
    .map((x, i) => ({
      x,
      y: y_series[i],
    }))
    .sort((p1, p2) => (p1.y < p2.y ? -1 : 1))

  let area = 0.0,
    p1,
    p2

  if (number_intervals > 2) {
    for (let i = 0; i < number_intervals - 1; i++) {
      p1 = series_points[i]
      p2 = series_points[i + 1]

      // @NOTE eventually support variable interval sizes
      area += trapezoid(p1, p2)
    }
  }

  // convert back to hours
  area = area / 60

  return area
}
