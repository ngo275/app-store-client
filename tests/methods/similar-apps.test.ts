import { AppNotFoundError } from "../../src/errors";
import { similarApps } from "../../src/methods";

describe("similarApps", () => {
  it("should be able to get similar apps", async () => {
    const similarAppsData = await similarApps({ id: "6446901002" });
    expect(similarAppsData).toBeDefined();
    expect(similarAppsData.length).toBeGreaterThan(0);
    similarAppsData.forEach((app) => {
      expect(app.id).toBeDefined();
      expect(app.title).toBeDefined();
      expect(app.url).toBeDefined();
    });
  });

  it("should raise an error if the app is not found", async () => {
    await expect(similarApps({ id: "1200000000" })).rejects.toThrow(
      AppNotFoundError,
    );
  });
});
