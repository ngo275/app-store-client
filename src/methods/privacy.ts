import { countryName, request } from "../utils/common";
import { AppStoreClientOptions } from "../client";
import { PrivacyDetails } from "../types";
import { AppNotFoundError, InvalidParameterError } from "../errors";
import { Country } from "../constants";

export interface PrivacyOptions extends AppStoreClientOptions {
  id: string;
}

export default async function privacy(
  options: PrivacyOptions,
): Promise<PrivacyDetails> {
  const country = options.country || Country.US;

  if (!options.id) {
    throw new InvalidParameterError("id");
  }

  const tokenUrl = `https://apps.apple.com/${country}/app/id${options.id}`;
  const html = await request(tokenUrl, {}, options.requestOptions);

  const regExp = /token%22%3A%22([^%]+)%22%7D/g;
  const match = regExp.exec(html);
  if (!match) {
    throw new Error("Unable to extract token from the response");
  }
  const token = match[1];

  const countryParam = countryName(country);
  const url = `https://amp-api.apps.apple.com/v1/catalog/${countryParam}/apps/${options.id}?platform=web&fields=privacyDetails`;
  const json = await request(
    url,
    {
      Origin: "https://apps.apple.com",
      Authorization: `Bearer ${token}`,
    },
    options.requestOptions,
  );

  if (!json.data || json.data.length === 0) {
    throw new AppNotFoundError(options.id);
  }

  return json.data[0].attributes.privacyDetails as PrivacyDetails;
}
