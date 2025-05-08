import {
  createPlugin,
  createRoutableExtension,
  createApiFactory,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';
import {
  WeatherClient,
  weatherApiRef,
} from './api/WeatherApi';

export const weatherPlugin = createPlugin({
  id: 'weather',
  apis: [
    createApiFactory({
      api: weatherApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new WeatherClient({
          discoveryApi,
          fetchApi,
        }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const WeatherPage = weatherPlugin.provide(
  createRoutableExtension({
    name: 'WeatherPage',
    component: () =>
      import('./components/WeatherCardComponent/WeatherCardComponent').then(m => m.WeatherCardComponent),
    mountPoint: rootRouteRef,
  }),
);
