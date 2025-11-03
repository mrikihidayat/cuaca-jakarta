import axios, { AxiosError } from 'axios';
import { WeatherApiResponse, WeatherItem, Metadata } from './weather.types';
import { WEATHER_CONFIG } from '../interfaces/weather.constants';

class WeatherService {
  private buildApiUrl(): string {
    const { latitude, longitude } = WEATHER_CONFIG.JAKARTA_COORDS;
    const { TIMEZONE, FORECAST_DAYS } = WEATHER_CONFIG;
    
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: 'temperature_2m',
      timezone: TIMEZONE,
      forecast_days: FORECAST_DAYS.toString(),
    });

    return `${WEATHER_CONFIG.API_BASE_URL}?${params.toString()}`;
  }

  async fetchWeatherData(): Promise<{
    weatherData: WeatherItem[];
    metadata: Metadata;
  }> {
    try {
      const url = this.buildApiUrl();
      const response = await axios.get<WeatherApiResponse>(url);
      const data = response.data;

      if (!data.hourly || !data.hourly.time || !data.hourly.temperature_2m) {
        throw new Error('Struktur data API tidak sesuai.');
      }

      const { time: times, temperature_2m: temperatures } = data.hourly;

      // Map dan filter data
      const rawData = times.map((time, index) => ({
        time,
        temperature_2m: temperatures[index],
      }));

      const weatherData = rawData.filter(
        (item): item is WeatherItem => item.temperature_2m !== null
      );

      const metadata: Metadata = {
        latitude: data.latitude,
        longitude: data.longitude,
        unit: data.hourly_units.temperature_2m,
        timezone: data.timezone || WEATHER_CONFIG.TIMEZONE,
      };

      return { weatherData, metadata };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ reason?: string }>;
      const message =
        axiosError.response?.data?.reason ||
        axiosError.message ||
        'Terjadi kesalahan saat mengambil data.';
      throw new Error(message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Terjadi kesalahan yang tidak diketahui.');
  }
}

export const weatherService = new WeatherService();