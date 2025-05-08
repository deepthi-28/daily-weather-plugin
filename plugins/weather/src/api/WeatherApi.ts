import { createApiRef, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { WeatherResponse } from './types';
import { WeatherClient } from './WeatherClient';

// Define the API reference
export const weatherApiRef = createApiRef<WeatherApi>({
  id: 'plugin.weather.service',
});

// Define the API interface
export interface WeatherApi {
  getWeather(): Promise<WeatherResponse>;
}

// Export the WeatherClient
export { WeatherClient };

// Create the API factory
export const weatherApiFactory = {
  deps: {
    discoveryApi: createApiRef<DiscoveryApi>({ id: 'core.discovery' }),
    fetchApi: createApiRef<FetchApi>({ id: 'core.fetch' }),
  },
  factory: ({ discoveryApi, fetchApi }: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) => {
    return new WeatherClient({
      discoveryApi,
      fetchApi,
    });
  },
};
