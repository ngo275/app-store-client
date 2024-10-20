import { countryName, request } from "../utils/common";
import { Country, Sort } from "../constants";
import app from "./app";
import { Review } from "../types";
import { AppStoreClientOptions } from "../client";
import { AppNotFoundError, InvalidParameterError } from "../errors";

export interface ReviewOptions extends AppStoreClientOptions {
  id?: string;
  appId?: string;
  sort?: string;
  page?: number;
}

function ensureArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function cleanList(results: Record<string, any>): Review[] {
  const reviews = ensureArray(results.feed.entry);
  return reviews.map((review: Record<string, any>) => ({
    id: review.id.label,
    userName: review.author.name.label,
    userUrl: review.author.uri.label,
    version: review["im:version"].label,
    score: parseInt(review["im:rating"].label),
    title: review.title.label,
    text: review.content.label,
    url: review.link.attributes.href,
    updated: review.updated.label,
  }));
}

function validate(options: ReviewOptions): void {
  if (!options.id && !options.appId) {
    throw new Error("Either id or appId is required");
  }

  if (options.sort && !Object.values(Sort).includes(options.sort as Sort)) {
    throw new Error("Invalid sort " + options.sort);
  }

  if (options.page && options.page < 1) {
    throw new Error("Page cannot be lower than 1");
  }

  if (options.page && options.page > 10) {
    throw new Error("Page cannot be greater than 10");
  }
}

export default async function reviews(
  options: ReviewOptions,
): Promise<Review[]> {
  validate(options);

  let id: string;
  if (options.id) {
    id = options.id;
  } else if (options.appId) {
    const appData = await app(options);
    id = appData.id.toString();
  } else {
    throw new InvalidParameterError("Either id or appId is required");
  }

  options.sort = options.sort || Sort.RECENT;
  options.page = options.page || 1;
  const country = options.country || Country.US;
  const countryParam = countryName(country);

  const url = `https://itunes.apple.com/${countryParam}/rss/customerreviews/page=${options.page}/id=${id}/sortby=${options.sort}/json`;
  const response = await request(url, {}, options.requestOptions);
  if (response.feed.entry === undefined) {
    throw new AppNotFoundError(id);
  }
  return cleanList(response);
}
