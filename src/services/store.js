const { dateDiffInHours } = require('../helpers');

/**
 * StoreService is responsible for the core business logic of the app.
 * It maintains an in-memory structure which keeps record of all registered
 * metrics, and as new metrics are registered it removes the old ones.
 */
class StoreService {
  constructor() {
    this.store = {};
  }

  /**
   * Resets the store
   */
  clear() {
    this.store = {};
  }

  /**
   * Remove old entries of the passed key
   * @param key The key whose old entries should be removed.
   */
  clearOldEntries(key) {
    const keyRecords = this.store[key];
    let clearUpToIndexExclusive = -1;

    // We follow a simple algorithm: we start looping from the first entries of
    // the array (there should be oldest entries), and we stop when we find the
    // first non-old entry (less than or equal to 1 hour). The found index is
    // exclusive, so we should remove all items up to that index.
    // Please note that the entries are naturally ordered by time.

    for (let i = 0; i < keyRecords.length; i++) {
      const now = new Date();
      if (dateDiffInHours(now, keyRecords[i].timestamp) <= 1) {
        clearUpToIndexExclusive = i;
        break;
      }
    }

    if (clearUpToIndexExclusive > 0) {
      this.store[key].splice(0, clearUpToIndexExclusive);
    }
  }

  /**
   * Returns the sum of all metrics reported for the given key over the past hour
   * @param key
   * @returns {number}
   */
  getKeySum(key) {
    if (!this.store[key]) {
      return 0;
    }

    this.clearOldEntries(key);

    return this.store[key].reduce((acc, elem) => acc + elem.value, 0);
  }

  /**
   * Registers a metric for the given key
   * @param key
   * @param value
   */
  postKeyValue(key, value) {
    if (!this.store[key]) {
      this.store[key] = [];
    } else {
      this.clearOldEntries(key);
    }

    this.store[key].push({
      timestamp: new Date(),
      value: Math.round(value),
    });
  }
}

module.exports = new StoreService();
