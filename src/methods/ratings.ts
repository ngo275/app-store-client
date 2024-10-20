import * as cheerio from "cheerio";
import { countryName, request } from "../utils/common";
import { RatingsResult } from "../types";
import { AppStoreClientOptions } from "../client";
import { Country } from "../constants";
import { InvalidParameterError, AppNotFoundError } from "../errors";

export interface RatingsOptions extends AppStoreClientOptions {
  id: string;
}

export default async function ratings(
  options: RatingsOptions,
): Promise<RatingsResult> {
  if (!options.id) {
    throw new InvalidParameterError("id");
  }

  const country = options.country || Country.US;
  const countryParam = countryName(country);
  const idValue = options.id;
  const url = `https://itunes.apple.com/${countryParam}/customer-reviews/id${idValue}?displayable-kind=11`;

  const html = await request(
    url,
    {
      "X-Apple-Store-Front": `${country},12`,
    },
    options.requestOptions,
  );

  if (html.length === 0) {
    throw new AppNotFoundError(options.id);
  }

  return parseRatings(html);
}

function parseRatings(html: string): RatingsResult {
  const $ = cheerio.load(html);

  const ratingsMatch = $(".rating-count").text().match(/\d+/);
  const ratings = Array.isArray(ratingsMatch) ? parseInt(ratingsMatch[0]) : 0;

  const ratingsByStar = $(".vote .total")
    .map((i, el) => parseInt($(el).text()))
    .get();

  const histogram = ratingsByStar.reduce<Record<number, number>>(
    (acc, ratingsForStar, index) => {
      return { ...acc, [5 - index]: ratingsForStar };
    },
    {},
  );

  return { ratings, histogram };
}
