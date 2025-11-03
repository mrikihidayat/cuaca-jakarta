import { 
  sunnySharp, 
  sunnyOutline, 
  cloudyOutline 
} from 'ionicons/icons';
import { 
  WeatherItem, 
  DailyForecast, 
  TempColorClass 
} from '../services/weather.types';
import { 
  TEMPERATURE_THRESHOLDS, 
  LOCALE_CONFIG,
  UI_TEXT 
} from '../interfaces/weather.constants';

export class WeatherUtils {
  /**
   * Format waktu ke format jam saja (HH:mm)
   */
  static formatHourOnly(isoTime: string, timezone: string): string {
    const date = new Date(isoTime);
    return date.toLocaleTimeString(LOCALE_CONFIG.LANGUAGE, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timezone,
    });
  }

  /**
   * Dapatkan waktu saat ini
   */
  static getCurrentTime(): string {
    return new Date().toLocaleTimeString(LOCALE_CONFIG.LANGUAGE, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: LOCALE_CONFIG.TIMEZONE,
    });
  }

  /**
   * Dapatkan tanggal hari ini
   */
  static getTodayDate(): string {
    return new Date().toLocaleDateString(LOCALE_CONFIG.LANGUAGE, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: LOCALE_CONFIG.TIMEZONE,
    });
  }

  /**
   * Dapatkan icon berdasarkan suhu
   */
  static getTempIcon(temp: number | null): string {
    if (temp === null) return cloudyOutline;
    if (temp >= TEMPERATURE_THRESHOLDS.ICON_HOT) return sunnySharp;
    if (temp >= TEMPERATURE_THRESHOLDS.ICON_WARM) return sunnyOutline;
    return cloudyOutline;
  }

  /**
   * Dapatkan class warna berdasarkan suhu
   */
  static getTempColorClass(temp: number | null): TempColorClass {
    if (temp === null) return 'temp-medium';
    if (temp >= TEMPERATURE_THRESHOLDS.DANGER) return 'temp-danger';
    if (temp >= TEMPERATURE_THRESHOLDS.WARNING) return 'temp-warning';
    if (temp >= TEMPERATURE_THRESHOLDS.PRIMARY) return 'temp-primary';
    return 'temp-medium';
  }

  /**
   * Hitung persentase lebar bar suhu
   */
  static getTempBarWidth(temp: number, min: number, max: number): string {
    const range = max - min || 1;
    const percentage = ((temp - min) / range) * 100;
    return `${Math.max(20, Math.min(100, percentage))}%`;
  }

  /**
   * Hitung temperatur maksimum dari array data
   */
  static getMaxTemp(data: WeatherItem[]): number {
    if (data.length === 0) return 0;
    return Math.round(Math.max(...data.map(d => d.temperature_2m)));
  }

  /**
   * Hitung temperatur minimum dari array data
   */
  static getMinTemp(data: WeatherItem[]): number {
    if (data.length === 0) return 0;
    return Math.round(Math.min(...data.map(d => d.temperature_2m)));
  }

  /**
   * Dapatkan temperatur saat ini
   */
  static getCurrentTemp(data: WeatherItem[]): number {
    if (data.length === 0) return 0;
    return Math.round(data[0].temperature_2m);
  }

  /**
   * Proses data untuk prakiraan harian 7 hari
   */
  static processDailyForecast(weatherData: WeatherItem[]): DailyForecast[] {
    const days: DailyForecast[] = [];
    const daysMap = new Map<string, number[]>();

    // Kelompokkan suhu berdasarkan hari
    weatherData.forEach(item => {
      const date = new Date(item.time);
      const dayKey = date.toLocaleDateString(LOCALE_CONFIG.LANGUAGE, {
        timeZone: LOCALE_CONFIG.TIMEZONE,
      });

      if (!daysMap.has(dayKey)) {
        daysMap.set(dayKey, []);
      }
      daysMap.get(dayKey)!.push(item.temperature_2m);
    });

    // Konversi ke format DailyForecast
    let dayCount = 0;
    daysMap.forEach((temps, dayKey) => {
      if (dayCount >= 7) return;

      const date = new Date(
        weatherData.find(
          w =>
            new Date(w.time).toLocaleDateString(LOCALE_CONFIG.LANGUAGE, {
              timeZone: LOCALE_CONFIG.TIMEZONE,
            }) === dayKey
        )!.time
      );

      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

      days.push({
        dayName:
          dayCount === 0
            ? UI_TEXT.TODAY
            : date.toLocaleDateString(LOCALE_CONFIG.LANGUAGE, {
                weekday: 'long',
                timeZone: LOCALE_CONFIG.TIMEZONE,
              }),
        date: date.toLocaleDateString(LOCALE_CONFIG.LANGUAGE, {
          day: 'numeric',
          month: 'short',
          timeZone: LOCALE_CONFIG.TIMEZONE,
        }),
        maxTemp: Math.round(maxTemp),
        minTemp: Math.round(minTemp),
        avgTemp: Math.round(avgTemp),
      });
      dayCount++;
    });

    return days;
  }
}