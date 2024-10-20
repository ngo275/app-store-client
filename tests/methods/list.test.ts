import { AppStoreClient } from "../../src";
import { Collection } from "../../src/constants";
import { AppNotFoundError, InvalidParameterError } from "../../src/errors";
import list from "../../src/methods/list";

describe("list", () => {
  it("should be able to list apps", async () => {
    const apps = await list({ collection: Collection.TOP_FREE_IOS, num: 5 });
    expect(apps).toBeDefined();
    expect(apps.length).toBe(5);
    apps.forEach((app) => {
      expect(app.id).toBeDefined();
      expect(app.appId).toBeDefined();
      expect(app.title).toBeDefined();
      expect(app.url).toBeDefined();
      expect(app.description).toBeDefined();
      expect(app.icon).toBeDefined();
      expect(app.genres).toBeDefined();
      expect(app.genreIds).toBeDefined();
      expect(app.primaryGenre).toBeDefined();
      expect(app.primaryGenreId).toBeDefined();
      expect(app.contentRating).toBeDefined();
      expect(app.languages).toBeDefined();
      expect(app.size).toBeDefined();
      expect(app.requiredOsVersion).toBeDefined();
      expect(app.released).toBeDefined();
      expect(app.updated).toBeDefined();
      expect(app.version).toBeDefined();
      expect(app.price).toBeDefined();
      expect(app.currency).toBeDefined();
      expect(app.free).toBeDefined();
      expect(app.developerId).toBeDefined();
      expect(app.developer).toBeDefined();
      expect(app.developerUrl).toBeDefined();
      // expect(app.developerWebsite).toBeDefined();
      expect(app.score).toBeDefined();
      expect(app.reviews).toBeDefined();
      expect(app.currentVersionScore).toBeDefined();
      expect(app.currentVersionReviews).toBeDefined();
      expect(app.screenshots).toBeDefined();
      expect(app.ipadScreenshots).toBeDefined();
      expect(app.appletvScreenshots).toBeDefined();
      expect(app.supportedDevices).toBeDefined();
    });
  });

  it("should raise an error if the collection is not found", async () => {
    await expect(
      list({ collection: "1200000000" as Collection }),
    ).rejects.toThrow(InvalidParameterError);
  });

  it("should raise an error if the num is greater than 200", async () => {
    await expect(list({ num: 201 })).rejects.toThrow(InvalidParameterError);
  });
});
