import { AppNotFoundError } from "../../src/errors";
import reviews from "../../src/methods/reviews";

describe("reviews", () => {
  it("should be able to get reviews", async () => {
    const reviewsData = await reviews({ id: "6446901002" });
    expect(reviewsData).toBeDefined();
    expect(reviewsData.length).toBeGreaterThan(0);
    reviewsData.forEach((review) => {
      expect(review.id).toBeDefined();
      expect(review.userName).toBeDefined();
      expect(review.userUrl).toBeDefined();
      expect(review.version).toBeDefined();
      expect(review.score).toBeGreaterThanOrEqual(1);
      expect(review.score).toBeLessThanOrEqual(5);
      expect(review.title).toBeDefined();
      expect(review.text).toBeDefined();
      expect(review.url).toBeDefined();
      expect(review.updated).toBeDefined();
    });
  });

  it("should return an empty array if the app is not found", async () => {
    await expect(reviews({ id: "12000000000" })).rejects.toThrow(
      AppNotFoundError,
    );
  });

  it("should raise an error if the app is not found", async () => {
    await expect(reviews({ appId: "test.test.test" })).rejects.toThrow(
      AppNotFoundError,
    );
  });
});
