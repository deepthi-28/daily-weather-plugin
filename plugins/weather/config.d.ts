/**
 * This file defines the configuration schema for the Weather plugin.
 */
export interface Config {
  weather?: {
    /**
     * The API key for accessing the WeatherStack API.
     * @visibility frontend
     */
    apiKey: string;
    /**
     * The default location for fetching weather data.
     * @visibility frontend
     */
    defaultLocation: string;
    /**
     * Path to use for requests via the proxy, defaults to /weather
     * @visibility frontend
     */
    proxyPath?: string;
  };
}
