import { suggestedTerms } from "../../src/methods";

describe("suggestedTerms", () => {
  it("should be able to get suggestions", async () => {
    const suggestions = await suggestedTerms({ term: "threads" });
    expect(suggestions).toBeDefined();
    expect(suggestions.length).toBeGreaterThan(0);
  });

  it("should return an empty array if the suggestions are not found", async () => {
    const suggestions = await suggestedTerms({ term: "1200000000" });
    expect(suggestions).toEqual([]);
  });
});
