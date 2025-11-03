export interface WeatherItem {
  time: string;
  temperature_2m: number;
}

export interface Metadata {
  latitude: number;
  longitude: number;
  unit: string;
  timezone: string;
}

export interface DailyForecast {
  dayName: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  avgTemp: number;
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    temperature_2m: (number | null)[];
  };
  hourly_units: {
    temperature_2m: string;
  };
}

export interface WeatherState {
  weatherData: WeatherItem[];
  metadata: Metadata;
  loading: boolean;
  error: string | null;
}

export type TempColorClass = 'temp-danger' | 'temp-warning' | 'temp-primary' | 'temp-medium';