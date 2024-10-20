import { AppNotFoundError } from "../../src/errors";
import appsByDeveloper from "../../src/methods/apps-by-developer";

describe("appsByDeveloper", () => {
  it("should be able to get apps by a specified developer", async () => {
    const apps = await appsByDeveloper({ devId: "389801255" });
    expect(apps).toBeDefined();
    expect(apps.length).toBeGreaterThan(0);
    const threadsApp = apps.find((app) => app.id === "6446901002");
    expect(threadsApp).toBeDefined();
    expect(threadsApp?.title).toBe("Threads");
    expect(threadsApp?.appId).toBe("com.burbn.barcelona");
    expect(threadsApp?.developer).toBe("Instagram, Inc.");
    expect(threadsApp?.developerId).toBe("389801255");
  });

  it("should raise an error if the developer is not found", async () => {
    await expect(appsByDeveloper({ devId: "1200000000" })).rejects.toThrow(
      AppNotFoundError,
    );
  });
});
