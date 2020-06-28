const expect = require('chai').expect;
const sinon = require('sinon');

const storeService = require('../../../src/services/store');

describe('Store Service', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    storeService.clear();
  });

  afterEach(() => {
    clock.restore();
  });

  describe('Key sum fetching', () => {
    it('should return 0 for a non-existent key', () => {
      expect(storeService.getKeySum('dummy')).to.be.equal(0);
    });

    it('should return the sum of all values added in previous hour', () => {
      storeService.postKeyValue('foo', 1);
      storeService.postKeyValue('bar', 1);

      expect(storeService.getKeySum('foo')).to.be.equal(1);
      expect(storeService.getKeySum('bar')).to.be.equal(1);

      // Advance clock 10 min
      clock.tick(1000 * 60 * 10);

      storeService.postKeyValue('foo', 2);
      storeService.postKeyValue('bar', 2);

      expect(storeService.getKeySum('foo')).to.be.equal(3);
      expect(storeService.getKeySum('bar')).to.be.equal(3);

      // Advance clock 30 min
      clock.tick(1000 * 60 * 30);

      storeService.postKeyValue('foo', 3);
      storeService.postKeyValue('bar', 3);

      expect(storeService.getKeySum('foo')).to.be.equal(6);
      expect(storeService.getKeySum('bar')).to.be.equal(6);

      // Advance clock 30 min
      clock.tick(1000 * 60 * 30);

      storeService.postKeyValue('foo', 4);
      storeService.postKeyValue('bar', 4);

      expect(storeService.getKeySum('foo')).to.be.equal(9);
      expect(storeService.getKeySum('bar')).to.be.equal(9);
    });
  });
});
