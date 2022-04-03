const { MemoryCache } = require("#external/cache/memory");

describe("MemoryCache", () => {
  it("should return null if miss cache", () => {
    const underTest = MemoryCache();
    const key = "missing-key";
    const got = underTest.get(key);
    expect(got).toBe(null);
  });
  it("should return cached value", () => {
    const underTest = MemoryCache();

    const want = { test: "test" };
    const key = "some-key";

    underTest.set(key, want);

    const got = underTest.get(key);

    expect(got).toEqual(want);
  });
  describe("when store value without ttl", () => {
    it("should return always cached value", () => {
      const getTime = jest.fn().mockReturnValue(1000);
      const underTest = MemoryCache(getTime);

      const want = { test: "test" };
      const key = "some-key";

      underTest.set(key, want);

      const got1 = underTest.get(key);
      const got2 = underTest.get(key);

      expect(got1).toEqual(want);
      expect(got2).toEqual(want);
      expect(getTime).toBeCalledTimes(1);
    });
  });
  describe("when store value with ttl", () => {
    it("should return cached value if hasn't expired", () => {
      const currentTime = 0;
      const ttl = 2000;
      const timeAfter = currentTime + 1000;

      const getTime = jest
        .fn()
        .mockReturnValueOnce(currentTime)
        .mockReturnValueOnce(timeAfter);

      const underTest = MemoryCache(getTime);

      const want = { test: "test" };
      const key = "some-key";

      underTest.set(key, want, { ttl });

      const got = underTest.get(key);

      expect(got).toEqual(want);
      expect(getTime).toBeCalledTimes(2);
    });
    it("should return null if has expired", () => {
      const currentTime = 0;
      const ttl = 50;
      const timeAfter = currentTime + 1000;

      const getTime = jest
        .fn()
        .mockReturnValueOnce(currentTime)
        .mockReturnValueOnce(timeAfter);

      const underTest = MemoryCache(getTime);

      const data = { test: "test" };
      const key = "some-key";

      underTest.set(key, data, { ttl });

      const got = underTest.get(key);

      expect(got).toEqual(null);
      expect(getTime).toBeCalledTimes(2);
    });
  });
});
