import {
  AppStoreClient,
  App,
  RatingsResult,
  Review,
  Suggestion,
} from "../src/index";

describe("entry point", () => {
  it("should be able to be instantiated", () => {
    const client = new AppStoreClient();
    expect(client).toBeDefined();
  });

  it("can import and use interfaces", () => {
    const app: App = {
      id: "123",
      appId: "com.example.app",
      title: "Example App",
      url: "https://apps.apple.com/us/app/example-app/id123",
      description: "This is an example app",
      icon: "https://example.com/icon.png",
      genres: ["Productivity"],
      genreIds: ["6007"],
      primaryGenre: "Productivity",
      primaryGenreId: 6007,
      contentRating: "4+",
      languages: ["EN"],
      size: "10 MB",
      requiredOsVersion: "14.0",
      released: "2023-01-01",
      updated: "2023-06-01",
      releaseNotes: "Bug fixes and improvements",
      version: "1.0.1",
      price: 0,
      currency: "USD",
      free: true,
      developerId: "987654321",
      developer: "Example Developer",
      developerUrl:
        "https://apps.apple.com/us/developer/example-developer/id987654321",
      developerWebsite: "https://www.example.com",
      score: 4.5,
      reviews: 1000,
      currentVersionScore: 4.7,
      currentVersionReviews: 100,
      screenshots: ["https://example.com/screenshot1.png"],
      ipadScreenshots: [],
      appletvScreenshots: [],
      supportedDevices: ["iPhone", "iPad"],
    };
    expect(app).toBeDefined();

    const ratingsResult: RatingsResult = {
      ratings: 1000,
      histogram: {
        1: 50,
        2: 100,
        3: 200,
        4: 300,
        5: 350,
      },
    };
    expect(ratingsResult).toBeDefined();

    const review: Review = {
      id: "review123",
      userName: "John Doe",
      userUrl: "https://apps.apple.com/us/user/john-doe",
      version: "1.0.1",
      score: 5,
      title: "Great app!",
      text: "This app is amazing and very useful.",
      url: "https://apps.apple.com/us/review/id123",
      updated: "2023-06-15",
    };
    expect(review).toBeDefined();

    const suggestion: Suggestion = {
      term: "example app",
    };
    expect(suggestion).toBeDefined();
  });
});
