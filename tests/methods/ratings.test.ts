import { AppNotFoundError } from "../../src/errors";
import { ratings } from "../../src/methods";

describe("ratings", () => {
  it("should be able to get ratings", async () => {
    const ratingsData = await ratings({ id: "6446901002" });
    expect(ratingsData).toBeDefined();
    expect(ratingsData.ratings).toBeGreaterThan(0);
    expect(ratingsData.histogram).toBeDefined();
    expect(ratingsData.histogram[5]).toBeGreaterThan(0);
    expect(ratingsData.histogram[4]).toBeGreaterThan(0);
    expect(ratingsData.histogram[3]).toBeGreaterThan(0);
    expect(ratingsData.histogram[2]).toBeGreaterThan(0);
    expect(ratingsData.histogram[1]).toBeGreaterThan(0);
  });

  it("should raise an error if the app is not found", async () => {
    await expect(ratings({ id: "1200000000" })).rejects.toThrow(
      AppNotFoundError,
    );
  });
});
