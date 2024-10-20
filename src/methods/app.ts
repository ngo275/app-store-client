import { lookup } from "../utils/common";
import { App } from "../types";
import ratings from "./ratings";
import { AppStoreClientOptions } from "../client";
import { Country } from "../constants";
import { AppNotFoundError, InvalidParameterError } from "../errors";

export interface AppOptions extends AppStoreClientOptions {
  id?: string;
  appId?: string;
  ratings?: boolean;
}

export default async function app(options: AppOptions): Promise<App> {
  if (!options.id && !options.appId) {
    throw new InvalidParameterError("id or appId");
  }

  const idField = options.id ? "id" : "bundleId";
  const idValue = options.id || options.appId;
  const country = options.country || Country.US;
  const language = options.language || "en-us";
  const requestOptions = options.requestOptions;
  const throttle = options.throttle || 1000;

  const results = await lookup(
    [idValue!],
    idField,
    country,
    language,
    requestOptions,
    throttle,
  );

  if (results.length === 0) {
    throw new AppNotFoundError(idValue!);
  }

  const result = results[0];

  if (options.ratings) {
    const ratingsResult = await ratings({ id: result.id.toString() });
    return { ...result, ...ratingsResult };
  }

  return result;
}
