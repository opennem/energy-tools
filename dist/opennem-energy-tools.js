(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.energyTools = {}));
}(this, (function (exports) { 'use strict';

  /* eslint-disable arrow-body-style */
  /**
   * OpenNEM Energy Functions
   *
   */
  /**
   * Calculate trapezoid area between two points
   *
   * @param p1 first point
   * @param p2 second point
   */
  function trapezoid(p1, p2) {
      var width = p2.y - p1.y;
      var ret = p1.x * width + ((p2.x - p1.x) * width) / 2;
      return ret;
  }
  /**
   * Calculate energy sum
   *
   * @param series power values
   * @param bucket_size_minutes size of the bucket in minutes
   */
  function energy_sum(series, bucket_size_minutes) {
      var number_intervals = series.length;
      var interval_size = bucket_size_minutes / number_intervals;
      var y_series = Array.from(new Array(number_intervals), function (element, index) { return index * interval_size; });
      var series_points = series
          .map(function (x, i) { return ({
          x: x,
          y: y_series[i],
      }); })
          .sort(function (p1, p2) { return (p1.y < p2.y ? -1 : 1); });
      var area = 0.0, p1, p2;
      if (number_intervals > 2) {
          for (var i = 0; i < number_intervals - 1; i++) {
              p1 = series_points[i];
              p2 = series_points[i + 1];
              // @NOTE eventually support variable interval sizes
              area += trapezoid(p1, p2);
          }
      }
      // convert back to hours
      area = area / 60;
      return area;
  }

  exports.energy_sum = energy_sum;
  exports.trapezoid = trapezoid;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=opennem-energy-tools.js.map
