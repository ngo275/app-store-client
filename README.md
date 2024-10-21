# App Store Client

## What is this?

This library is a TypeScript library for retrieving public data from the App Store. For example, you can get app details, ratings, reviews, similar apps, and privacy information.

Note that it is different from App Connect API, which focuses on providing API about your app, such as app sales, ratings, reviews, etc.

## Motivation

This library is inspired by the [app-store-scraper](https://github.com/facundoolano/app-store-scraper) project, which I really appreciate. However, due to recent maintenance issues with the original library, I decided to create this TypeScript version. It includes some breaking changes to enhance TypeScript compatibility and resolve various bugs.

## Features

- 🚀 Full TypeScript support
- 🔄 Built-in request caching
- 🛠 Customizable options
- 📊 Comprehensive API coverage
- 🧪 Well-tested codebase

## Installation

### NPM

```bash
npm install app-store-client
```

### Yarn

```bash
yarn add app-store-client
```

## Usage

First, import and instantiate the AppStoreClient:

```typescript
import { AppStoreClient, Collection, Country } from "app-store-client";

const client = new AppStoreClient();
```

### Get App Details

You can get app details by ID or bundle ID.

```typescript
// Use ID
const appData = await client.app({ id: "6446901002" });

// Or use app ID (bundle ID)
const appData = await client.app({ appId: "com.burbn.barcelona" });

console.log(appData);

// {
//   id: '6446901002',
//   appId: 'com.burbn.barcelona',
//   title: 'Threads',
//   url: 'https://apps.apple.com/us/app/threads/id6446901002?uo=4',
//   description: 'Say more with Threads — Instagram’s text-based conversation app.\n' +
//   ...
// }
```

### Get Apps by Developer

You can get apps by developer ID.

```typescript
// Use developer ID
const apps = await client.appsByDeveloper({ devId: "389801255" });
```

### List Apps

You can list apps by collection name. Please see the `Collection` enum for available collections.

```typescript
// Use collection name
const topFreeApps = await client.list({
  collection: Collection.TOP_FREE_IOS,
  num: 5,
});
```

### Get Privacy Details

You can get privacy details by ID. You must provide the ID.

```typescript
const privacy = await client.privacy({ id: "6446901002" });
```

### Get Ratings

You can get ratings by ID. You must provide the ID.

```typescript
const ratings = await client.ratings({ id: "6446901002" });
```

### Get Reviews

You can get reviews by ID or app ID (bundle ID). You must provide either ID or app ID.

```typescript
// Use ID
const reviews = await client.reviews({ id: "6446901002" });

// Or use app ID (bundle ID)
const reviews = await client.reviews({ appId: "com.burbn.barcelona" });
```

### Search Apps

You can search apps by keyword.

```typescript
const searchResults = await client.search({ term: "chatgpt", num: 5 });
```

### Get Similar Apps

You can get similar apps by ID or app ID (bundle ID). You must provide either ID or app ID.

```typescript
// Use ID
const similarApps = await client.similarApps({ id: "6446901002" });

// Or use app ID (bundle ID)
const similarApps = await client.similarApps({ appId: "com.burbn.barcelona" });
```

### Get Suggested Search Terms

You can get suggested search terms by keyword.

```typescript
const suggestions = await client.suggestedTerms({ term: "threads" });
```

### Caching

The client includes built-in request caching. You can customize the cache max age when instantiating the client:

```typescript
const client = new AppStoreClient({ cacheMaxAge: 1000 * 60 * 5 }); // 5 minutes
```

This helps reduce unnecessary API calls and improve performance for repeated requests. If the request body or parameters are different, it will be treated as a different request.

The default cache max age is 5 minutes and up to 1000 requests.

### Custom Request Options

```typescript
export interface AppStoreClientOptions {
  country?: Country;
  language?: string;
  requestOptions?: any;
  throttle?: number;
  cacheMaxAge?: number;
  cacheMaxSize?: number;
}
```

- `country`: The country to use. Defaults to `Country.US`. You can find the list of available countries [here](https://github.com/ngo275/app-store-client/blob/master/src/constants.ts).
- `language`: The language to use. Defaults to `en-us`.
- `requestOptions`: The request options to use.
- `throttle`: The throttle to use. Defaults to undefined.
- `cacheMaxAge`: The cache max age. Defaults to `1000 * 60 * 5` ms (5 minutes).
- `cacheMaxSize`: The cache max size. Defaults to `1000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
