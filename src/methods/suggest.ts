import { request } from "../utils/common";
import { parseString } from "xml2js";
import { promisify } from "util";
import { Suggestion } from "../types";
import { AppStoreClientOptions } from "../client";
import { Country } from "../constants";
import { InvalidParameterError } from "../errors";
const BASE_URL =
  "https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?clientApplication=Software&term=";

export interface SuggestOptions extends AppStoreClientOptions {
  term: string;
}

const parseXML = promisify(parseString);

function extractSuggestions(xml: any): Suggestion[] {
  const toJSON = (item: any): Suggestion => ({
    term: item.string[0],
  });

  const list = xml.plist.dict[0].array[0].dict || [];
  return list.map(toJSON);
}

export default async function suggest(
  options: SuggestOptions,
): Promise<Suggestion[]> {
  if (!options || !options.term) {
    throw new InvalidParameterError("term");
  }

  const country = options.country || Country.US;
  const url = BASE_URL + encodeURIComponent(options.term);
  const headers = {
    "X-Apple-Store-Front": `${country},29`,
  };

  const xmlResponse = await request(url, headers, options.requestOptions);
  const parsedXML = await parseXML(xmlResponse);
  return extractSuggestions(parsedXML);
}
