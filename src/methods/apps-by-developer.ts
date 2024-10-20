import { App } from "../types";
import { AppStoreClientOptions } from "../client";
import { lookup } from "../utils/common";
import { AppNotFoundError, InvalidParameterError } from "../errors";

export interface DeveloperOptions extends AppStoreClientOptions {
  devId: string;
}

export default async function appsByDeveloper(
  options: DeveloperOptions,
): Promise<App[]> {
  if (!options.devId) {
    throw new InvalidParameterError("devId");
  }

  const results = await lookup(
    [options.devId],
    "id",
    options.country,
    options.language,
    options.requestOptions,
    options.throttle ? 1000 : undefined,
  );

  if (results.length === 0) {
    throw new AppNotFoundError(options.devId);
  }

  return results;
}
