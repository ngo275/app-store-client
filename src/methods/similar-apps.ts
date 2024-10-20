import app from "./app";
import { request, lookup } from "../utils/common";
import { AppStoreClientOptions } from "../client";
import { Country } from "../constants";
import { App } from "../types";
import { AppNotFoundError, InvalidParameterError } from "../errors";

const BASE_URL = "https://itunes.apple.com/us/app/app/id";

export interface SimilarOptions extends AppStoreClientOptions {
  id?: string;
  appId?: string;
}

export default async function similarApps(
  options: SimilarOptions,
): Promise<App[]> {
  let id: string;

  if (options.id) {
    id = options.id;
  } else if (options.appId) {
    const appData = await app(options);
    id = appData.id.toString();
  } else {
    throw new InvalidParameterError("Either id or appId is required");
  }
  const country = options.country || Country.US;

  const text = await request(
    `${BASE_URL}${id}`,
    {
      "X-Apple-Store-Front": `${country},32`,
    },
    options.requestOptions,
  );

  // Check if the app is not available
  if (text.includes("itemNotAvailable")) {
    throw new AppNotFoundError(id);
  }

  const index = text.indexOf("customersAlsoBoughtApps");
  if (index === -1) {
    return [];
  }

  const regExp = /customersAlsoBoughtApps":(.*?\])/g;
  const match = regExp.exec(text);
  if (!match) {
    return [];
  }

  const ids = JSON.parse(match[1]);

  return lookup(
    ids,
    "id",
    options.country,
    options.language,
    options.requestOptions,
    options.throttle,
  );
}
