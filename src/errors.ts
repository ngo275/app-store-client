export class AppStoreClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppStoreClientError";
  }
}

export class AppNotFoundError extends AppStoreClientError {
  // identifier can be an app ID, an app bundle ID, or a developer ID
  constructor(identifier?: string) {
    const message = identifier
      ? `App with ID ${identifier} not found`
      : "App not found";
    super(message);
    this.name = "AppNotFoundError";
  }
}

export class AppStoreAPIError extends AppStoreClientError {
  constructor(message: string) {
    super(`AppStore API error: ${message}`);
    this.name = "AppStoreAPIError";
  }
}

export class InvalidParameterError extends AppStoreClientError {
  constructor(paramName: string) {
    super(`Invalid parameter: ${paramName}`);
    this.name = "InvalidParameterError";
  }
}

export class NetworkError extends AppStoreClientError {
  constructor(message: string) {
    super(`Network error: ${message}`);
    this.name = "NetworkError";
  }
}

export class RateLimitError extends AppStoreClientError {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}
