# Daily Weather Plugin for Backstage

The Daily Weather Plugin for Backstage provides real-time weather information for a specified location using the Weatherstack API. This plugin includes a secure backend proxy configuration to fetch weather data without exposing your API key.

## Installation

To install the plugin, run the following command:

```bash
yarn --cwd packages/app add @infosys_ltd/daily-weather-plugin
```

After installation, create an account on [Weatherstack](https://weatherstack.com/) and generate your API Access Key.

## Client Configuration

Update your `app-config.yaml` file with the following changes:

![Proxy Configuration](https://github.com/Infosys/daily-weather-plugin-backstage/blob/main/plugins/weather/src/docs/proxyconfig.png)

![Weather Plugin Configuration](https://github.com/Infosys/daily-weather-plugin-backstage/blob/main/plugins/weather/src/docs/weathepluginconfig.png)

**Note:** You can change the city name as per your weather check requirements.

## Using the Plugin

You can use the weather card component anywhere in your Backstage pages, such as in the `EntityPage`. Here is an example:

```typescript
import { WeatherCardComponent } from '@infosys_ltd/daily-weather-plugin';
import { Grid } from '@material-ui/core';

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item md={6} xs={12}>
      <EntityCatalogGraphCard variant="gridItem" height={400} />
    </Grid>
    <Grid item md={4} xs={12}>
      <WeatherCardComponent />
    </Grid>
    <Grid item md={6} xs={12}>
      <OpaMetadataAnalysisCard />
    </Grid>
    <Grid item md={4} xs={12}>
      <EntityLinksCard />
    </Grid>
    <Grid item md={8} xs={12}>
      <EntityHasSubcomponentsCard variant="gridItem" />
    </Grid>
  </Grid>
);
```

### Example Screenshots

**Weather Card in Entity Page:**

![Weather Card in Entity Page](https://github.com/Infosys/daily-weather-plugin-backstage/blob/main/plugins/weather/src/docs/weathercardentity.png)

**Weather Plugin Configuration:**

![Weather Plugin page](https://github.com/Infosys/daily-weather-plugin-backstage/blob/main/plugins/weather/src/docs/weatherplugin.png)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
