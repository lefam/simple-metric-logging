const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Returns the absolute difference in hours between two date objects.
 * @param date1 {Date}
 * @param date2 {Date}
 * @returns {number}
 */
function dateDiffInHours(date1, date2) {
  return Math.abs(date1 - date2) / ONE_HOUR_MS;
}

function isStrictlyNumeric(value) {
  return typeof value === 'number';
}

module.exports = {
  dateDiffInHours,
  isStrictlyNumeric,
};
