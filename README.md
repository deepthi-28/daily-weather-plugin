# Welcome to the Daily Weather Plugins Repository for Backstage!

The Daily Weather Plugin for Backstage provides real-time weather information for a specified location using the Weatherstack API. This plugin includes a secure backend proxy configuration to fetch weather data without exposing your API key.

## How It Works

1. **Backend Proxy Configuration**:
   - The plugin uses a secure backend proxy to fetch weather data from the Weatherstack API. This ensures that your API key is not exposed to the client-side code.
   - You need to configure the backend proxy in your `app-config.yaml` file to point to the Weatherstack API with your API key.

2. **Fetching Weather Data**:
   - The plugin fetches real-time weather data for a specified location. You can configure the default location in the `app-config.yaml` file.
   - The weather data includes information such as temperature, weather descriptions, wind speed, humidity, visibility, and more.

3. **Displaying Weather Information**:
   - The plugin provides a `WeatherCardComponent` that you can embed in any Backstage page to display the weather information.
   - The component displays the current temperature, weather descriptions, wind speed, humidity, visibility, local time, and whether it is day or night.

4. **Error Handling**:
   - The plugin handles errors gracefully by displaying error messages in the `WeatherCardComponent` if the API call fails or if there is an issue with the configuration.

   FOR MORE INFORMATION AND SETUP PLEASE VISIT PLUGIN DOCS [DAILY WEATHER PLUGIN] (https://github.com/Infosys/daily-weather-plugin/blob/master/plugins/weather/README.md)
