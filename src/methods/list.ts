import { lookup, mapApp } from "../utils/common";
import { Collection, Category, Country } from "../constants";
import { request } from "../utils/request";
import { App } from "../types";
import { AppStoreClientOptions } from "../client";
import { InvalidParameterError } from "../errors";

export interface ListOptions extends AppStoreClientOptions {
  collection?: Collection;
  category?: Category;
  num?: number;
  fullDetail?: boolean;
}

export default async function list(options: ListOptions): Promise<App[]> {
  options.collection = options.collection || Collection.TOP_FREE_IOS;
  options.num = options.num || 50;

  if (options.num > 200) {
    throw new InvalidParameterError("num");
  }

  if (!Object.values(Collection).includes(options.collection)) {
    throw new InvalidParameterError("collection");
  }

  const categoryPath = options.category ? `/genre=${options.category}` : "";
  const url = `http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/${options.collection}/${categoryPath}/limit=${options.num}/json?s=${options.country || Country.US}`;

  const results = await request(url, {}, options.requestOptions);
  const apps = results.feed.entry;
  if (options.fullDetail) {
    const ids = apps.map(
      (app: Record<string, any>) => app.id.attributes["im:id"],
    );
    return await lookup(
      ids,
      "id",
      options.country,
      options.language,
      options.requestOptions,
      options.throttle,
    );
  }

  return apps.map(mapApp);
}
