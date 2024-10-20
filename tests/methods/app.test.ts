import { AppNotFoundError } from "../../src/errors";
import app from "../../src/methods/app";

describe("app", () => {
  it("should be able to get an app", async () => {
    const appData = await app({ id: "6446901002" });
    expect(appData).toBeDefined();
    expect(appData.id).toBe("6446901002");
    expect(appData.appId).toBe("com.burbn.barcelona");
    expect(appData.title).toBe("Threads");
    expect(appData.url).toContain(
      "https://apps.apple.com/us/app/threads/id6446901002",
    );
    expect(appData.description).toBeDefined();
    expect(appData.icon).toBeDefined();
    expect(appData.genres).toBeDefined();
    expect(appData.genreIds).toBeDefined();
    expect(appData.primaryGenre).toBeDefined();
    expect(appData.primaryGenreId).toBeDefined();
    expect(appData.contentRating).toBeDefined();
    expect(appData.languages).toBeDefined();
    expect(appData.size).toBeDefined();
    expect(appData.requiredOsVersion).toBeDefined();
    expect(appData.released).toBeDefined();
    expect(appData.updated).toBeDefined();
    expect(appData.version).toBeDefined();
    expect(appData.price).toBeDefined();
    expect(appData.currency).toBeDefined();
    expect(appData.free).toBeDefined();
    expect(appData.developerId).toBeDefined();
    // console.log(appData.developerId);
    expect(appData.developer).toBeDefined();
    expect(appData.developerUrl).toBeDefined();
    expect(appData.score).toBeDefined();
    expect(appData.reviews).toBeDefined();
    expect(appData.currentVersionScore).toBeDefined();
    expect(appData.currentVersionReviews).toBeDefined();
    expect(appData.screenshots).toBeDefined();
    expect(appData.ipadScreenshots).toBeDefined();
    expect(appData.appletvScreenshots).toBeDefined();
    expect(appData.supportedDevices).toBeDefined();
  });

  it("should be able to get an app by app ID", async () => {
    const appData = await app({ appId: "com.burbn.barcelona" });
    expect(appData).toBeDefined();
    expect(appData.id).toBe("6446901002");
  });

  it("should raise an error if the app is not found", async () => {
    await expect(app({ id: "1200000000" })).rejects.toThrow(AppNotFoundError);
  });

  it("should raise an error if the app is not found by app ID", async () => {
    await expect(app({ appId: "1200000000" })).rejects.toThrow(
      AppNotFoundError,
    );
  });
});
