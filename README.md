This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- Getting route information from google maps routes api
- Saving the latest route to the cache
- Show user location and update route on user location change

## Get started

1. Install dependencies

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

2. Configure Google Maps API Key

   Add your the API key to the `app.json`

   ```json
   ...
    [
        "react-native-maps",
        {
          "iosGoogleMapsApiKey": "YOUR_API_KEY",
          "androidGoogleMapsApiKey": "YOUR_API_KEY"
        }
      ],
      ...
   ```

   Also assign the key to the `EXPO_PUBLIC_GOOGLE_MAP_KEY` env variable:

3. Prebuild the project

   ```bash
   npx expo prebuild
   ```

4. Start the app

   **IOS**
   Make sure to select a development team for ios

   ```bash
   npm run ios
   or
   yarn run ios
   ```

   **ANDROID**

   ```bash
   npm run android
   or
   yarn run android
   ```
