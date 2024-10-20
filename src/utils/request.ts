import axios, { AxiosRequestConfig } from "axios";

export async function request(
  url: string,
  headers: Record<string, string> = {},
  options: AxiosRequestConfig = {},
) {
  const response = await axios({
    method: "GET",
    url,
    headers,
    ...options,
  });
  return response.data;
}
