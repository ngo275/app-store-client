import { lookup } from "../utils/common";
import { request } from "../utils/request";
import { App } from "../types";
import { AppStoreClientOptions } from "../client";
import { Country } from "../constants";
import { InvalidParameterError } from "../errors";

const BASE_URL =
  "https://search.itunes.apple.com/WebObjects/MZStore.woa/wa/search?clientApplication=Software&media=software&term=";

export interface SearchOptions extends AppStoreClientOptions {
  term: string;
  num?: number;
  page?: number;
  idsOnly?: boolean;
}

export default async function search(
  options: SearchOptions,
): Promise<App[] | string[]> {
  const country = options.country || Country.US;

  if (!options.term) {
    throw new InvalidParameterError("term");
  }

  const url = BASE_URL + encodeURIComponent(options.term);

  const response = await request(
    url,
    {
      "X-Apple-Store-Front": `${country},24 t:native`,
      "Accept-Language": options.language || "en-us",
    },
    options.requestOptions,
  );

  const results = (response.bubbles[0] && response.bubbles[0].results) || [];
  const pageStart = (options.page || 1) * (options.num || 50);
  const pageEnd = pageStart + (options.num || 50);
  const ids = results
    .slice(pageStart, pageEnd)
    .map((result: Record<string, any>) => result.id);

  if (options.idsOnly) {
    return ids;
  }

  return await lookup(
    ids,
    "id",
    options.country,
    options.language,
    options.requestOptions,
    options.throttle,
  );
}
