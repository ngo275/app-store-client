import { AppNotFoundError } from "../../src/errors";
import { privacy } from "../../src/methods";

describe("privacy", () => {
  it("should be able to get privacy details", async () => {
    const privacyData = await privacy({ id: "6446901002" });
    expect(privacyData).toBeDefined();
    expect(privacyData.privacyTypes.length).toBeGreaterThan(0);
    expect(privacyData.privacyTypes[0].purposes.length).toBeGreaterThan(0);
    expect(
      privacyData.privacyTypes[0].purposes[0].dataCategories.length,
    ).toBeGreaterThan(0);
  });

  it("should raise an error if the app is not found", async () => {
    await expect(privacy({ id: "1200000000" })).rejects.toThrow(
      AppNotFoundError,
    );
  });
});
