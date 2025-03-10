import { ConfigApi, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import { WeatherApi } from './WeatherApi';
import { WeatherResponse } from './types';

const DEFAULT_PROXY_PATH = '/weather';

export class WeatherClient implements WeatherApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;
  private readonly apiKey: string;
  private readonly proxyPath: string;

  static fromConfig(configApi: ConfigApi, dependencies: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
    const weatherConfig = configApi.getConfig('weather');
    const apiKey: string = weatherConfig.getString('apiKey');

    return new WeatherClient({
      discoveryApi: dependencies.discoveryApi,
      fetchApi: dependencies.fetchApi,
      apiKey,
      proxyPath: weatherConfig.getOptionalString('proxyPath') ?? DEFAULT_PROXY_PATH,
    });
  }

  constructor(opts: { discoveryApi: DiscoveryApi; fetchApi: FetchApi; apiKey: string; proxyPath: string }) {
    this.discoveryApi = opts.discoveryApi;
    this.fetchApi = opts.fetchApi;
    this.apiKey = opts.apiKey;
    this.proxyPath = opts.proxyPath;
  }

  private async getServiceUrl(): Promise<string> {
    const proxyUrl = await this.discoveryApi.getBaseUrl('proxy');
    console.log(`Proxy URL: ${proxyUrl}`);
    return `${proxyUrl}${this.proxyPath}`;
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    const serviceUrl = await this.getServiceUrl();
    const apiUrl = `${serviceUrl}${input}`;
    console.log(`Fetching from URL: ${apiUrl}`);
    const response = await this.fetchApi.fetch(apiUrl, init);
    console.log(`Response Status: ${response.status}`);
    if (!response.ok) {
      console.error(`Response Error: ${response.statusText}`);
      throw await ResponseError.fromResponse(response);
    }

    const jsonResponse = await response.json();
    console.log(`Response JSON: ${JSON.stringify(jsonResponse)}`);
    return jsonResponse;
  }

  public async getWeather(location: string): Promise<WeatherResponse> {
    const url = `/current?access_key=${this.apiKey}&query=${location}`;
    console.log(`Constructed URL: ${url}`);

    const response = await this.fetch<WeatherResponse>(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return response;
  }
}
