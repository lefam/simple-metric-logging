const ONE_HOUR_MS = 60 * 60 * 1000;

function dateDiffInHours(date1, date2) {
  return (date1 - date2) / ONE_HOUR_MS;
}

module.exports = {
  dateDiffInHours,
};
