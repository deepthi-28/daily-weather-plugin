# Daily Weather Plugin for Backstage

The Daily Weather Plugin for Backstage provides real-time weather information for a specified location using the Weatherstack API. This plugin includes a secure backend proxy configuration to fetch weather data without exposing your API key.

---

## Installation

To install the plugin, run the following command:

```bash
yarn --cwd packages/app add @infosys_ltd/daily-weather-plugin
```

After installation, create an account on [Weatherstack](https://weatherstack.com/) and generate your API Access Key.

---

## Configuration

### Backend Proxy Configuration

Update your `app-config.yaml` file with the following proxy configuration:

```yaml
proxy:
  endpoints:
    '/weather':
      target: 'http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=YOUR_DEFAULT_LOCATION'
      changeOrigin: true
```

**Important Notes:**
- Replace `YOUR_API_KEY` with your Weatherstack API key.
- Replace `YOUR_DEFAULT_LOCATION` with the desired default location (e.g., `Stockholm`).

This configuration ensures:
- The `access_key` (API key) is securely embedded in the proxy target URL.
- The `query` parameter specifies the default location for weather data.

---

## Using Environment Variables (Optional)

Instead of hardcoding the `access_key` and `query` in the configuration file, you can dynamically set them via environment variables. This approach is more secure and flexible.

Set the following environment variables in your CLI:

```bash
export WEATHERSTACK_ACCESS_KEY=your_api_key_here
export WEATHERSTACK_DEFAULT_LOCATION=your_default_location_here
```

Then update the `app-config.yaml` as follows:

```yaml
proxy:
  endpoints:
    '/weather':
      target: 'http://api.weatherstack.com/current?access_key=${WEATHERSTACK_ACCESS_KEY}&query=${WEATHERSTACK_DEFAULT_LOCATION}'
      changeOrigin: true
```

---

### Example Screenshots

**Weather Plugin Configuration:**

```bash
import { WeatherPage } from '@infosys_ltd/daily-weather-plugin';
```
> [!NOTE]
> You have to import above WeatherPage and use it wherever its needed.

![Weather Plugin Page](https://github.com/Infosys/daily-weather-plugin/blob/main/plugins/weather/src/docs/weatherplugin.png)

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
