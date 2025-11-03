export const WEATHER_CONFIG = {
  API_BASE_URL: 'https://api.open-meteo.com/v1/forecast',
  JAKARTA_COORDS: {
    latitude: -6.2,
    longitude: 106.8,
  },
  TIMEZONE: 'Asia/Jakarta',
  FORECAST_DAYS: 7,
  HOURS_TO_DISPLAY: 24,
} as const;

export const TEMPERATURE_THRESHOLDS = {
  DANGER: 33,
  WARNING: 29,
  PRIMARY: 26,
  ICON_HOT: 32,
  ICON_WARM: 28,
} as const;

export const LOCALE_CONFIG = {
  LANGUAGE: 'id-ID',
  TIMEZONE: 'Asia/Jakarta',
} as const;

export const UI_TEXT = {
  APP_TITLE: 'Prakiraan Cuaca Jakarta',
  LOADING: 'Memuat data cuaca...',
  ERROR_TITLE: 'Gagal Memuat Data',
  RETRY_BUTTON: 'Coba Lagi',
  TODAY: 'Hari Ini',
  HOURLY_FORECAST: 'Prakiraan Per Jam',
  WEEKLY_FORECAST: 'Prakiraan 7 Hari',
  HIGHEST: 'Tertinggi',
  LOWEST: 'Terendah',
  FOOTER_TEXT: 'Data dari Open-Meteo API',
  CREATED_BY: 'Dibuat oleh M.Riki Hidayat - 044713922',
} as const;

export const ANIMATION_DURATION = {
  TEMP_BAR: 300,
  PULSE: 2000,
} as const;