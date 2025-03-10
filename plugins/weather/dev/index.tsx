import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { weatherPlugin, WeatherPage } from '../src/plugin';

createDevApp()
  .registerPlugin(weatherPlugin)
  .addPage({
    element: <WeatherPage />,
    title: 'Root Page',
    path: '/weather',
  })
  .render();
