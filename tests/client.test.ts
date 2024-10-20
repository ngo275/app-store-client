// This test file checks if the AppStoreClient is able to access functions properly.
// The detailed test cases are in the methods folder.
import { AppStoreClient, Collection } from "../src/index";
import * as methods from "../src/methods";

describe("AppStoreClient", () => {
  it("should be able to be instantiated", () => {
    const client = new AppStoreClient();
    expect(client).toBeDefined();
  });

  describe("memoization", () => {
    let appSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.clearAllMocks();
      // Spy on the actual app method inside methods to track its calls
      appSpy = jest.spyOn(methods, "app");
    });

    it("should reuse the cached result on subsequent calls", async () => {
      const client = new AppStoreClient();

      const app1 = await client.app({ id: "6446901002" });
      expect(app1).toBeDefined();
      const app2 = await client.app({ id: "6446901002" });
      expect(app2).toBeDefined();

      // The app method should only be called once due to memoization
      expect(appSpy).toHaveBeenCalledTimes(1);
    });

    it(
      "should not reuse the cached result on subsequent calls after expiration",
      async () => {
        const client = new AppStoreClient({ cacheMaxAge: 1000 * 1 }); // 1 second
        const app1 = await client.app({ id: "6446901002" });
        expect(app1).toBeDefined();
        await new Promise((resolve) => setTimeout(resolve, 1000 * 1.1)); // 1.1 seconds
        const app2 = await client.app({ id: "6446901002" });
        expect(app2).toBeDefined();
        expect(appSpy).toHaveBeenCalledTimes(2);
      },
      1000 * 10,
    );

    it("should not reuse the cached result on different arguments", async () => {
      const client = new AppStoreClient();

      const app1 = await client.app({ id: "6446901002" });
      expect(app1).toBeDefined();
      const app2 = await client.app({ id: "6448311069" });
      expect(app2).toBeDefined();

      expect(appSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("app", () => {
    it("should be able to get an app", async () => {
      const client = new AppStoreClient();
      const app = await client.app({ id: "6446901002" });
      expect(app).toBeDefined();
    });
  });

  describe("appsByDeveloper", () => {
    it("should be able to get apps by a developer", async () => {
      const client = new AppStoreClient();
      const apps = await client.appsByDeveloper({ devId: "389801255" });
      expect(apps).toBeDefined();
    });
  });

  describe("list", () => {
    it("should be able to list apps", async () => {
      const client = new AppStoreClient();
      const apps = await client.list({
        collection: Collection.TOP_FREE_IOS,
        num: 5,
      });
      expect(apps).toBeDefined();
      expect(apps.length).toBe(5);
    });
  });

  describe("privacy", () => {
    it("should be able to get privacy details", async () => {
      const client = new AppStoreClient();
      const privacy = await client.privacy({ id: "6446901002" });
      expect(privacy).toBeDefined();
    });
  });

  describe("ratings", () => {
    it("should be able to get ratings", async () => {
      const client = new AppStoreClient();
      const ratings = await client.ratings({ id: "6446901002" });
      expect(ratings).toBeDefined();
    });
  });

  describe("reviews", () => {
    it("should be able to get reviews", async () => {
      const client = new AppStoreClient();
      const reviews = await client.reviews({ id: "6446901002" });
      expect(reviews).toBeDefined();
    });
  });

  describe("search", () => {
    it("should be able to search apps", async () => {
      const client = new AppStoreClient();
      const apps = await client.search({ term: "chatgpt", num: 5 });
      expect(apps).toBeDefined();
      expect(apps.length).toBe(5);
    });
  });

  describe("similarApps", () => {
    it("should be able to get similar apps", async () => {
      const client = new AppStoreClient();
      const apps = await client.similarApps({ id: "6446901002" });
      expect(apps).toBeDefined();
    });
  });

  describe("suggestedTerms", () => {
    it("should be able to get suggestions", async () => {
      const client = new AppStoreClient();
      const suggestions = await client.suggestedTerms({ term: "threads" });
      expect(suggestions).toBeDefined();
    });
  });
});
