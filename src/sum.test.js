import sum from "./sum";

describe("sum function", () => {
  test("should sum 2 digits", () => {
    const result = sum(2, 5);
    expect(result).toBe(7);
  });

  test("should return first argument if only that is provided", () => {
      const result = sum(2);
      expect(result).toBe(2);
  });
});
