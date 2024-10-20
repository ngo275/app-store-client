export interface App {
  id: string;
  appId: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  genres: string[];
  genreIds: string[];
  primaryGenre: string;
  primaryGenreId: number;
  contentRating: string;
  languages: string[];
  size: string;
  requiredOsVersion: string;
  released: string;
  updated: string;
  releaseNotes: string;
  version: string;
  price: number;
  currency: string;
  free: boolean;
  developerId: string;
  developer: string;
  developerUrl: string;
  developerWebsite?: string;
  score: number;
  reviews: number;
  currentVersionScore: number;
  currentVersionReviews: number;
  screenshots: string[];
  ipadScreenshots: string[];
  appletvScreenshots: string[];
  supportedDevices: string[];
}

export interface RatingsResult {
  ratings: number;
  histogram: Record<number, number>;
}

export interface Review {
  id: string;
  userName: string;
  userUrl: string;
  version: string;
  score: number;
  title: string;
  text: string;
  url: string;
  updated: string;
}

export interface Suggestion {
  term: string;
}

export interface PrivacyDetails {
  managePrivacyChoicesUrl: string | null;
  privacyTypes: PrivacyType[];
}

export interface PrivacyType {
  privacyType: string;
  identifier: string;
  description: string;
  dataCategories: Record<string, any>[];
  purposes: Purpose[];
}

interface Purpose {
  purpose: string;
  identifier: string;
  dataCategories: DataCategory[];
}

interface DataCategory {
  dataCategory: string;
  identifier: string;
  dataTypes: string[];
}
