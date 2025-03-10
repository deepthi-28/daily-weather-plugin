import { createApiRef, ConfigApi, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { WeatherResponse } from './types';
import { WeatherClient } from './WeatherClient';

// Define the API reference
export const weatherApiRef = createApiRef<WeatherApi>({
  id: 'plugin.weather.service',
});

// Define the API interface
export interface WeatherApi {
  getWeather(location: string): Promise<WeatherResponse>;
}

// Export the WeatherClient
export { WeatherClient };

// Create the API factory
export const weatherApiFactory = {
  deps: {
    configApi: createApiRef<ConfigApi>({ id: 'core.config' }),
    discoveryApi: createApiRef<DiscoveryApi>({ id: 'core.discovery' }),
    fetchApi: createApiRef<FetchApi>({ id: 'core.fetch' }),
  },
  factory: ({ configApi, discoveryApi, fetchApi }: { configApi: ConfigApi; discoveryApi: DiscoveryApi; fetchApi: FetchApi }) => {
    const weatherConfig = configApi.getConfig('weather');
    const apiKey = weatherConfig.getString('apiKey');

    return new WeatherClient({
      discoveryApi,
      fetchApi,
      apiKey,
      proxyPath: weatherConfig.getOptionalString('weather.proxyPath') ?? '/weather',
    });
  },
};
