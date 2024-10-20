import search from "../../src/methods/search";

describe("search", () => {
  it("should be able to search apps", async () => {
    const apps = await search({ term: "chatgpt", num: 5 });
    expect(apps).toBeDefined();
    expect(apps.length).toBe(5);
    apps.forEach((app) => {
      if (typeof app === "string") {
        return;
      }
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
    });
  });
});
