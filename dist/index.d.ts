/**
 * OpenNEM Energy Functions
 *
 */
interface Point {
    x: number;
    y: number;
}
/**
 * Calculate trapezoid area between two points
 *
 * @param p1 first point
 * @param p2 second point
 */
export declare function trapezoid(p1: Point, p2: Point): number;
/**
 * Calculate energy sum
 *
 * @param series power values
 * @param bucket_size_minutes size of the bucket in minutes
 */
export declare function energy_sum(series: number[], bucket_size_minutes: number): number;
export {};
