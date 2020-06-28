const expect = require('chai').expect;
const { dateDiffInHours, isStrictlyNumeric } = require('../../../src/helpers');

describe('Helpers', () => {
  describe('dateDiffInHours', () => {
    it('should return correct absolute diff in hours', () => {
      const d1 = new Date(2020, 1, 1, 1, 0, 0);
      const d2 = new Date(2020, 1, 1, 2, 0, 0);
      const d3 = new Date(2020, 1, 1, 9, 0, 0);

      expect(dateDiffInHours(d1, d2)).to.be.equal(1);
      expect(dateDiffInHours(d2, d1)).to.be.equal(1);
      expect(dateDiffInHours(d3, d1)).to.be.equal(8);
      expect(dateDiffInHours(d3, d2)).to.be.equal(7);
    });
  });

  describe('isStrictlyNumeric', () => {
    it('should return true when passed a number', () => {
      expect(isStrictlyNumeric(-1)).to.be.true;
      expect(isStrictlyNumeric(10)).to.be.true;
      expect(isStrictlyNumeric(100)).to.be.true;
    });

    it('should return false when passed a non-number', () => {
      expect(isStrictlyNumeric('-1')).to.be.false;
      expect(isStrictlyNumeric('10')).to.be.false;
      expect(isStrictlyNumeric(null)).to.be.false;
      expect(isStrictlyNumeric([])).to.be.false;
      expect(isStrictlyNumeric(undefined)).to.be.false;
    });
  });
});
