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

// You can customize the country and language by a client instance
// const client = new AppStoreClient({
//   country: Country.JP,
//   language: "ja",
// });
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
//   description: 'Say more with Threads — Instagram's text-based conversation app.\n...',
//   icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/60/24/c6/6024c67d-96f2-0977-71de-f5748f72c65f/Prod-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg',
//   genres: ['Social Networking', 'Entertainment'],
//   genreIds: ['6005', '6016'],
//   primaryGenre: 'Social Networking',
//   primaryGenreId: 6005,
//   contentRating: '12+',
//   languages: ['HR', 'CS', 'DA', 'NL', 'EN', '...'],
//   size: '90769408',
//   requiredOsVersion: '15.1',
//   released: '2023-07-05T07:00:00Z',
//   updated: '2024-11-26T19:20:07Z',
//   version: '359.1',
//   price: 0,
//   currency: 'USD',
//   free: true,
//   developerId: '389801255',
//   developer: 'Instagram, Inc.',
//   developerUrl: 'https://apps.apple.com/us/developer/instagram-inc/id389801255?uo=4',
//   score: 4.61366,
//   reviews: 680654,
//   currentVersionScore: 4.61366,
//   currentVersionReviews: 680654,
//   screenshots: [
//     'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ef/ba/cb/efbacb33-5f14-444f-56bd-d477a44b5464/752f57e3-8a0b-4345-88ad-a0047a922262_iOS_SMALL_2.png/392x696bb.png',
//     '...'
//   ],
//   ipadScreenshots: [],
//   appletvScreenshots: [],
//   supportedDevices: [
//     'iPhone5s-iPhone5s',
//     'iPadAir-iPadAir',
//     '...'
//   ]
// }
```

You can also customize the country and language by a function parameter.

```typescript
const appData = await client.app({
  appId: "com.burbn.barcelona",
  country: Country.JP,
  language: "ja",
});
```

### Get Apps by Developer

You can get apps by developer ID.

```typescript
// Use developer ID
const apps = await client.appsByDeveloper({ devId: "389801255" });

console.log(apps);
// [
//   {
//     id: '389801252',
//     appId: 'com.burbn.instagram',
//     title: 'Instagram',
//     url: 'https://apps.apple.com/us/app/instagram/id389801252?uo=4',
//     description: 'Little moments lead to big friendships. Share yours on Instagram...',
//     icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/97/9e/c4/979ec480-795b-371e-ff57-79d532283364/Prod-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg',
//     genres: ['Photo & Video', 'Social Networking'],
//     genreIds: ['6008', '6005'],
//     primaryGenre: 'Photo & Video',
//     primaryGenreId: 6008,
//     contentRating: '12+',
//     languages: ['HR', 'CS', 'DA', 'NL', 'EN', '...'],
//     size: '365233152',
//     requiredOsVersion: '15.1',
//     released: '2010-10-06T08:12:41Z',
//     updated: '2024-11-26T15:14:17Z',
//     version: '359.0.0',
//     price: 0,
//     currency: 'USD',
//     free: true,
//     developerId: '389801255',
//     developer: 'Instagram, Inc.',
//     developerUrl: 'https://apps.apple.com/us/developer/instagram-inc/id389801255?uo=4',
//     score: 4.70782,
//     reviews: 27066795,
//     currentVersionScore: 4.70782,
//     currentVersionReviews: 27066795,
//     screenshots: ['...'],
//     ipadScreenshots: [],
//     appletvScreenshots: [],
//     supportedDevices: ['...']
//   },
//   // ... more apps
// ]
```

You can also customize the country and language by a function parameter.

```typescript
const apps = await client.appsByDeveloper({
  devId: "389801255",
  country: Country.JP,
  language: "ja",
});
```

### List Apps

You can list apps by collection name. Please see the `Collection` enum for available collections.

```typescript
// Use collection name
const topFreeApps = await client.list({
  collection: Collection.TOP_FREE_IOS,
  num: 5,
});

console.log(topFreeApps);
// [
//   {
//     id: '6446901002',
//     appId: 'com.burbn.barcelona',
//     title: 'Threads',
//     url: 'https://apps.apple.com/us/app/threads/id6446901002?uo=2',
//     description: 'Say more with Threads — Instagram's text-based conversation app...',
//     icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/60/24/c6/6024c67d-96f2-0977-71de-f5748f72c65f/Prod-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.png',
//     genres: ['Social Networking'],
//     genreIds: ['6005'],
//     primaryGenre: 'Social Networking',
//     primaryGenreId: '6005',
//     contentRating: 'Application',
//     languages: [],
//     size: '',
//     requiredOsVersion: '',
//     released: 'July 5, 2023',
//     updated: 'July 5, 2023',
//     version: '',
//     price: '0.00',
//     currency: 'USD',
//     free: true,
//     developerId: '389801255',
//     developer: 'Instagram, Inc.',
//     developerUrl: 'https://apps.apple.com/us/developer/instagram-inc/id389801255?uo=2',
//     score: 0,
//     reviews: 0,
//     currentVersionScore: 0,
//     currentVersionReviews: 0,
//     screenshots: ['...'],
//     ipadScreenshots: [],
//     appletvScreenshots: [],
//     supportedDevices: []
//   }
//   // ... more apps
// ]
```

You can also customize the country and language by a function parameter.

```typescript
const topFreeApps = await client.list({
  collection: Collection.TOP_FREE_IOS,
  num: 5,
  country: Country.JP,
  language: "ja",
});
```

### Get Privacy Details

You can get privacy details by ID. You must provide the ID.

```typescript
const privacy = await client.privacy({ id: "6446901002" });

console.log({
  managePrivacyChoicesUrl: null,
  privacyTypes: [
    {
      privacyType: "Data Linked to You",
      identifier: "DATA_LINKED_TO_YOU",
      description:
        "The following data, which may be collected and linked to your identity, may be used for the following purposes:",
      purposes: [
        {
          purpose: "Third-Party Advertising",
          identifier: "THIRD_PARTY_ADVERTISING",
          dataCategories: [
            {
              dataCategory: "Purchases",
              identifier: "PURCHASES",
              dataTypes: ["Purchase History"],
            },
            {
              dataCategory: "Location",
              identifier: "LOCATION",
              dataTypes: ["Precise Location", "Coarse Location"],
            },
            // ... more data categories
          ],
        },
        {
          purpose: "Analytics",
          identifier: "ANALYTICS",
          dataCategories: [
            {
              dataCategory: "Usage Data",
              identifier: "USAGE_DATA",
              dataTypes: ["Product Interaction", "Advertising Data"],
            },
            // ... more data categories
          ],
        },
        // ... more purposes
      ],
    },
  ],
});
```

You can also customize the country and language by a function parameter.

```typescript
const privacy = await client.privacy({
  id: "6446901002",
  country: Country.JP,
  language: "ja",
});
```

### Get Ratings

You can get ratings by ID. You must provide the ID.

```typescript
const ratings = await client.ratings({ id: "6446901002" });

console.log(JSON.stringify(ratings, null, 2));
// Output:
// {
//   "ratings": 680654,
//   "histogram": {
//     "1": 32878,
//     "2": 9794,
//     "3": 25216,
//     "4": 51641,
//     "5": 561125
//   }
// }
```

You can also customize the country and language by a function parameter.

```typescript
const ratings = await client.ratings({
  id: "6446901002",
  country: Country.JP,
  language: "ja",
});
```

### Get Reviews

You can get reviews by ID or app ID (bundle ID). You must provide either ID or app ID.

```typescript
// Use ID
const reviews = await client.reviews({ id: "6446901002" });

// Or use app ID (bundle ID)
const reviews = await client.reviews({ appId: "com.burbn.barcelona" });

console.log(reviews);
// [
//   {
//     "id": "12012163673",
//     "userName": "Moms deepen",
//     "userUrl": "https://itunes.apple.com/us/reviews/id1727492095",
//     "version": "359.1",
//     "score": 5,
//     "title": "So lucky",
//     "text": "When u home",
//     "url": "https://itunes.apple.com/us/review?id=6446901002&type=Purple%20Software",
//     "updated": "2024-11-30T22:47:31-07:00"
//   },
//   // ... more reviews
// ]
```

You can also customize the country and language by a function parameter.

```typescript
const reviews = await client.reviews({
  appId: "com.burbn.barcelona",
  country: Country.JP,
  language: "ja",
});
```

### Search Apps

You can search apps by keyword.

```typescript
const searchResults = await client.search({ term: "chatgpt", num: 5 });

console.log(searchResults);
// [
//   {
//     "id": "6447763703",
//     "appId": "genius.chat",
//     "title": "ChatBox - AI Chat with Chatbot",
//     "url": "https://apps.apple.com/us/app/chatbox-ai-chat-with-chatbot/id6447763703",
//     "description": "Meet ChatBox, your loyal AI chatbot powered by the advanced ChatGPT and GPT-4o models...",
//     "icon": "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9d/40/70/9d407045-ccd8-7672-e208-3f4100cfdbde/AppIcon-0-0-1x_U007ephone-0-0-0-1-0-0-sRGB-85-220.png/512x512bb.jpg",
//     "genres": ["Productivity", "Utilities"],
//     "genreIds": ["6007", "6002"],
//     "primaryGenre": "Productivity",
//     "primaryGenreId": 6007,
//     "contentRating": "12+",
//     "languages": ["EN", "FR", "DE", "IT", "JA", "KO", "ZH", "ES"],
//     "size": "105195520",
//     "requiredOsVersion": "16.0",
//     "released": "2023-04-21T07:00:00Z",
//     "updated": "2024-11-26T15:30:17Z",
//     "version": "1.49",
//     "price": 0,
//     "currency": "USD",
//     "free": true,
//     "developer": "FLORATE LIMITED",
//     "developerUrl": "https://apps.apple.com/us/developer/florate-limited/id1682503272",
//     "score": 4.65819,
//     "reviews": 130542,
//     "currentVersionScore": 4.65819,
//     "currentVersionReviews": 130542
//   },
//   // ... more results
// ]
```

You can also customize the country and language by a function parameter.

```typescript
const searchResults = await client.search({
  term: "chatgpt",
  num: 5,
  country: Country.JP,
  language: "ja",
});
```

### Get Similar Apps

You can get similar apps by ID or app ID (bundle ID). You must provide either ID or app ID.

```typescript
// Use ID
const similarApps = await client.similarApps({ id: "6446901002" });

// Or use app ID (bundle ID)
const similarApps = await client.similarApps({ appId: "com.burbn.barcelona" });

console.log(similarApps);
// [
//   {
//     "id": "6444370199",
//     "appId": "xyz.blueskyweb.app",
//     "title": "Bluesky Social",
//     "url": "https://apps.apple.com/us/app/bluesky-social/id6444370199?uo=4",
//     "description": "Bluesky is THE NEW SOCIAL NETWORK for people who stay online and up-to-date...",
//     "icon": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/cb/3b/73/cb3b73c7-02b4-11a1-2f1f-0721d1af5c14/AppIcon-0-0-1x_U007ephone-0-85-220.png/512x512bb.jpg",
//     "genres": ["Social Networking", "Entertainment"],
//     "genreIds": ["6005", "6016"],
//     "primaryGenre": "Social Networking",
//     "primaryGenreId": 6005,
//     "contentRating": "17+",
//     "languages": ["EN", "FR", "DE", "IT", "JA", "KO", "ZH", "ES"],
//     "size": "45962240",
//     "requiredOsVersion": "15.1",
//     "released": "2023-02-18T08:00:00Z",
//     "updated": "2024-11-27T18:50:41Z",
//     "version": "1.95",
//     "price": 0,
//     "currency": "USD",
//     "free": true,
//     "developer": "Bluesky PBLLC",
//     "developerUrl": "https://apps.apple.com/us/developer/bluesky-pbllc/id1654243552?uo=4",
//     "score": 4.26304,
//     "reviews": 6364,
//     "currentVersionScore": 4.26304,
//     "currentVersionReviews": 6364
//     "screenshots": ["..."],
//     "ipadScreenshots": ["..."],
//     "appletvScreenshots": ["..."],
//     "supportedDevices": ["..."]
//   },
//   // ... more similar apps
// ]
```

You can also customize the country and language by a function parameter.

```typescript
const similarApps = await client.similarApps({
  appId: "com.burbn.barcelona",
  country: Country.JP,
  language: "ja",
});
```

### Get Suggested Search Terms

You can get suggested search terms by keyword.

```typescript
const suggestions = await client.suggestedTerms({ term: "threads" });

console.log(suggestions);
// [
//   {
//     "term": "threads"
//   },
//   {
//     "term": "threads app"
//   },
//   // ... more suggestions
// ]
```

You can also customize the country and language by a function parameter.

```typescript
const suggestions = await client.suggestedTerms({
  term: "threads",
  country: Country.JP,
  language: "ja",
});
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
