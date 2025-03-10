export interface WeatherResponse {
  success: boolean;
  error?: {
    code: number;
    type: string;
    info: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    wind_speed: number;
    humidity: number;
    feelslike: number;
    visibility: number;
    is_day: string;
  };
  location: {
    localtime: string;
  };
}

export interface WeatherError {
  code: number;
  type: string;
  info: string;
}

export interface ErrorResponse {
  success: boolean;
  error: WeatherError;
}
