import memoizee from "memoizee";
import * as methods from "./methods";
import {
  App,
  PrivacyDetails,
  RatingsResult,
  Review,
  Suggestion,
} from "./types";
import { Country } from "./constants";

export interface AppStoreClientOptions {
  country?: Country;
  language?: string;
  requestOptions?: any;
  throttle?: number;
  cacheMaxAge?: number;
  cacheMaxSize?: number;
}

export class AppStoreClient {
  private options: AppStoreClientOptions;

  constructor(options: AppStoreClientOptions = {}) {
    this.options = {
      country: Country.US,
      language: "en-us",
      cacheMaxAge: 1000 * 60 * 5, // 5 minutes
      cacheMaxSize: 1000,
      ...options,
    };

    // Bind and memoize all methods
    for (const [key, method] of Object.entries(methods)) {
      (this as any)[key] = this.memoizeMethod(method);
    }
  }

  private memoizeMethod(method: Function) {
    return memoizee(
      (methodOptions: AppStoreClientOptions) =>
        method({ ...this.options, ...methodOptions }),
      {
        normalizer: (args) => JSON.stringify(args[0]),
        maxAge: this.options.cacheMaxAge,
        max: this.options.cacheMaxSize,
        promise: true, // Since methods return promises
      },
    );
  }

  // Declare method signatures
  public app!: (options: methods.AppOptions) => Promise<App>;
  public list!: (options: methods.ListOptions) => Promise<App[]>;
  public search!: (options: methods.SearchOptions) => Promise<App[] | string[]>;
  public appsByDeveloper!: (
    options: methods.DeveloperOptions,
  ) => Promise<App[]>;
  public privacy!: (options: methods.PrivacyOptions) => Promise<PrivacyDetails>;
  public suggestedTerms!: (
    options: methods.SuggestOptions,
  ) => Promise<Suggestion[]>;
  public similarApps!: (options: methods.SimilarOptions) => Promise<App[]>;
  public reviews!: (options: methods.ReviewOptions) => Promise<Review[]>;
  public ratings!: (options: methods.RatingsOptions) => Promise<RatingsResult>;
}
