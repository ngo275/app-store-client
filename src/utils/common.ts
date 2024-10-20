import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { LOOKUP_URL, Country } from "../constants";
import { App } from "../types";
import {
  AppNotFoundError,
  AppStoreAPIError,
  AppStoreClientError,
  NetworkError,
} from "../errors";

export function mapApp(payload: Record<string, any>): App {
  return {
    id: payload.id.attributes["im:id"],
    appId: payload.id.attributes["im:bundleId"],
    title: payload["im:name"]?.label,
    url: Array.isArray(payload.link)
      ? payload.link[0]?.attributes.href
      : payload.link?.attributes.href,
    description: payload.summary?.label,
    icon: payload["im:image"][2]?.label,
    genres: [payload.category?.attributes?.label],
    genreIds: [payload.category?.attributes["im:id"]],
    primaryGenre: payload.category?.attributes?.label,
    primaryGenreId: payload.category?.attributes["im:id"],
    contentRating: payload["im:contentType"]?.attributes?.label,
    languages: [], // Not available in this payload
    size: "", // Not available in this payload
    requiredOsVersion: "", // Not available in this payload
    released: payload["im:releaseDate"]?.attributes?.label,
    updated: payload["im:releaseDate"]?.attributes?.label,
    releaseNotes: "", // Not available in this payload
    version: "", // Not available in this payload
    price: payload["im:price"]?.attributes?.amount,
    currency: payload["im:price"]?.attributes?.currency,
    free: payload["im:price"]?.attributes?.amount === "0.00",
    developerId: `${payload["im:artist"].attributes.href.split("/id")[1].split("?")[0]}`,
    developer: payload["im:artist"].label,
    developerUrl: payload["im:artist"].attributes.href,
    developerWebsite: "", // Not available in this payload
    score: 0, // Not available in this payload
    reviews: 0, // Not available in this payload
    currentVersionScore: 0, // Not available in this payload
    currentVersionReviews: 0, // Not available in this payload
    screenshots: Array.isArray(payload.link)
      ? [payload.link[1]?.attributes.href]
      : [], // Preview image URL
    ipadScreenshots: [], // Not available in this payload
    appletvScreenshots: [], // Not available in this payload
    supportedDevices: [], // Not available in this payload
  };
}

export function cleanApp(app: Record<string, any>): App {
  return {
    id: `${app.trackId}`,
    appId: `${app.bundleId}`,
    title: app.trackName,
    url: app.trackViewUrl,
    description: app.description,
    icon: app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60,
    genres: app.genres,
    genreIds: app.genreIds,
    primaryGenre: app.primaryGenreName,
    primaryGenreId: app.primaryGenreId,
    contentRating: app.contentAdvisoryRating,
    languages: app.languageCodesISO2A,
    size: app.fileSizeBytes,
    requiredOsVersion: app.minimumOsVersion,
    released: app.releaseDate,
    updated: app.currentVersionReleaseDate || app.releaseDate,
    releaseNotes: app.releaseNotes,
    version: app.version,
    price: app.price,
    currency: app.currency,
    free: app.price === 0,
    developerId: `${app.artistId}`,
    developer: app.artistName,
    developerUrl: app.artistViewUrl,
    developerWebsite: app.sellerUrl,
    score: app.averageUserRating,
    reviews: app.userRatingCount,
    currentVersionScore: app.averageUserRatingForCurrentVersion,
    currentVersionReviews: app.userRatingCountForCurrentVersion,
    screenshots: app.screenshotUrls,
    ipadScreenshots: app.ipadScreenshotUrls,
    appletvScreenshots: app.appletvScreenshotUrls,
    supportedDevices: app.supportedDevices,
  };
}

// Create a throttled axios instance
const createThrottledAxiosInstance = (limit: number): AxiosInstance => {
  const queue: Array<() => void> = [];
  let activeRequests = 0;

  const processQueue = () => {
    if (queue.length > 0 && activeRequests < limit) {
      const request = queue.shift();
      if (request) {
        activeRequests++;
        request();
      }
    }
  };

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      const request = () => {
        resolve(config);
        setTimeout(() => {
          activeRequests--;
          processQueue();
        }, 1000 / limit);
      };

      queue.push(request);
      processQueue();
    });
  });

  return axiosInstance;
};

export const request = async (
  url: string,
  headers: Record<string, string>,
  requestOptions: AxiosRequestConfig = {},
  limit?: number,
): Promise<any> => {
  const axiosConfig: AxiosRequestConfig = {
    ...requestOptions,
    method: requestOptions.method || "GET",
    url,
    headers,
  };

  let axiosInstance: AxiosInstance = axios;

  if (limit) {
    axiosInstance = createThrottledAxiosInstance(limit);
  }

  try {
    const response = await axiosInstance(axiosConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new AppNotFoundError(error.response.data.id);
      } else if (error.response.status >= 400) {
        throw new AppStoreAPIError(`${error.response.statusText}`);
      }
    }
    throw error;
  }
};

export async function lookup(
  ids: string[],
  idField: string = "id",
  country: Country = Country.US,
  lang: string = "en",
  requestOptions: AxiosRequestConfig = {},
  limit?: number,
): Promise<App[]> {
  const langParam = lang ? `&lang=${lang}` : "";
  const joinedIds = ids.join(",");
  const countryParam = countryName(country);
  const url = `${LOOKUP_URL}?${idField}=${joinedIds}&country=${countryParam}&entity=software${langParam}`;

  try {
    const response = await request(url, {}, requestOptions, limit);
    const filteredApps = response.results.filter(
      (app: Record<string, any>) =>
        typeof app.wrapperType === "undefined" ||
        app.wrapperType === "software",
    );
    return filteredApps.map(cleanApp);
  } catch (error: any) {
    if (error instanceof AppStoreClientError) {
      throw error;
    } else {
      throw new NetworkError(error.message);
    }
  }
}

export function countryName(countryId: Country): string {
  const countryEntries = Object.entries(Country);
  const entry = countryEntries.find(([, value]) => value === countryId);
  return entry ? entry[0].toLowerCase() : "";
}
