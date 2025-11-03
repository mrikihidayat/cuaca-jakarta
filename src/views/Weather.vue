<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="gradient-toolbar">
        <ion-title>
          <div class="header-title">
            <span>{{ UI_TEXT.APP_TITLE }}</span>
            <span class="weather-emoji">🌤️</span>
          </div>
        </ion-title>
      </ion-toolbar>
      <!-- Navbar Created By -->
      <ion-toolbar class="author-toolbar">
        <div class="author-text">
          {{ UI_TEXT.CREATED_BY }}
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="weather-content">
      <div v-if="state.loading" class="loading-container">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
        <p class="loading-text">{{ UI_TEXT.LOADING }}</p>
      </div>

      <div v-else-if="state.error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h2>{{ UI_TEXT.ERROR_TITLE }}</h2>
        <p>{{ state.error }}</p>
        <ion-button @click="loadWeatherData" expand="block" class="retry-button">
          <ion-icon slot="start" :icon="icons.refreshOutline"></ion-icon>
          {{ UI_TEXT.RETRY_BUTTON }}
        </ion-button>
      </div>

      <div v-else class="weather-container">
        <!-- Current Weather Card -->
        <ion-card class="current-weather-card">
          <div class="weather-gradient">
            <div class="weather-main">
              <div class="location-info">
                <h1>Jakarta</h1>
                <p class="location-detail">
                  <ion-icon :icon="icons.locationOutline"></ion-icon>
                  {{ state.metadata.latitude }}°, {{ state.metadata.longitude }}°
                </p>
              </div>
              <div class="current-temp">
                <div class="temp-display">{{ currentTemp }}°</div>
                <ion-icon 
                  :icon="WeatherUtils.getTempIcon(currentTemp)" 
                  :class="['weather-icon', WeatherUtils.getTempColorClass(currentTemp)]">
                </ion-icon>
              </div>
            </div>
            <div class="weather-stats">
              <div class="stat-item">
                <ion-icon :icon="icons.thermometerOutline"></ion-icon>
                <div class="stat-content">
                  <div class="stat-value">{{ maxTemp }}°</div>
                  <div class="stat-label">{{ UI_TEXT.HIGHEST }}</div>
                </div>
              </div>
              <div class="stat-item">
                <ion-icon :icon="icons.thermometerOutline"></ion-icon>
                <div class="stat-content">
                  <div class="stat-value">{{ minTemp }}°</div>
                  <div class="stat-label">{{ UI_TEXT.LOWEST }}</div>
                </div>
              </div>
              <div class="stat-item">
                <ion-icon :icon="icons.timeOutline"></ion-icon>
                <div class="stat-content">
                  <div class="stat-value">{{ currentTime }}</div>
                  <div class="stat-label">WIB</div>
                </div>
              </div>
            </div>
          </div>
        </ion-card>

        <!-- Hourly Forecast -->
        <div class="section-header">
          <h2>{{ UI_TEXT.HOURLY_FORECAST }}</h2>
          <p>{{ todayDate }}</p>
        </div>

        <div class="hourly-container">
          <div class="hourly-scroll">
            <div class="hourly-item" v-for="(item, index) in next24Hours" :key="index">
              <div class="hour-time">{{ formatTime(item.time) }}</div>
              <ion-icon 
                :icon="WeatherUtils.getTempIcon(item.temperature_2m)" 
                :class="['hour-icon', WeatherUtils.getTempColorClass(item.temperature_2m)]">
              </ion-icon>
              <div class="hour-temp">{{ item.temperature_2m }}°</div>
            </div>
          </div>
          <div class="scroll-indicator scroll-indicator-left">
            <ion-icon :icon="icons.chevronBackOutline"></ion-icon>
          </div>
          <div class="scroll-indicator scroll-indicator-right">
            <ion-icon :icon="icons.chevronForwardOutline"></ion-icon>
          </div>
        </div>

        <!-- 7-Day Forecast Card -->
        <div class="section-header" style="margin-top: 24px;">
          <h2>{{ UI_TEXT.WEEKLY_FORECAST }}</h2>
        </div>

        <ion-card class="forecast-card">
          <ion-list lines="none" class="forecast-list">
            <ion-item v-for="(day, index) in dailyForecast" :key="index" class="forecast-item">
              <div class="day-info">
                <div class="day-name">{{ day.dayName }}</div>
                <div class="day-date">{{ day.date }}</div>
              </div>
              <div class="day-icon">
                <ion-icon 
                  :icon="WeatherUtils.getTempIcon(day.avgTemp)" 
                  :class="WeatherUtils.getTempColorClass(day.avgTemp)">
                </ion-icon>
              </div>
              <div class="day-temps">
                <span class="temp-high">{{ day.maxTemp }}°</span>
                <div class="temp-bar">
                  <div class="temp-bar-fill" :style="{ width: getTempBarWidth(day.maxTemp) }"></div>
                </div>
                <span class="temp-low">{{ day.minTemp }}°</span>
              </div>
            </ion-item>
          </ion-list>
        </ion-card>

        <!-- Footer -->
        <div class="footer-info">
          <ion-icon :icon="icons.cloudDownloadOutline"></ion-icon>
          <span>{{ UI_TEXT.FOOTER_TEXT }}</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner,
  IonButton, IonCard, IonList, IonItem, IonIcon
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import { 
  sunnySharp, sunnyOutline, cloudyOutline, thermometerOutline,
  locationOutline, timeOutline, refreshOutline, cloudDownloadOutline,
  chevronBackOutline, chevronForwardOutline
} from 'ionicons/icons';

// Import modules
import { weatherService } from '../services/weather.service';
import { WeatherUtils } from '../configurations/weather.utils';
import { UI_TEXT, WEATHER_CONFIG } from '../interfaces/weather.constants';
import type { WeatherState } from '../services/weather.types';

// Import CSS
import '@/theme/weather.css';

// Icons
const icons = {
  sunnySharp,
  sunnyOutline,
  cloudyOutline,
  thermometerOutline,
  locationOutline,
  timeOutline,
  refreshOutline,
  cloudDownloadOutline,
  chevronBackOutline,
  chevronForwardOutline
};

// State
const state = ref<WeatherState>({
  weatherData: [],
  metadata: { 
    latitude: 0, 
    longitude: 0, 
    unit: '°C',
    timezone: WEATHER_CONFIG.TIMEZONE
  },
  loading: true,
  error: null
});

// Computed Properties
const currentTemp = computed(() => 
  WeatherUtils.getCurrentTemp(state.value.weatherData)
);

const maxTemp = computed(() => 
  WeatherUtils.getMaxTemp(state.value.weatherData)
);

const minTemp = computed(() => 
  WeatherUtils.getMinTemp(state.value.weatherData)
);

const currentTime = computed(() => 
  WeatherUtils.getCurrentTime()
);

const todayDate = computed(() => 
  WeatherUtils.getTodayDate()
);

const next24Hours = computed(() => 
  state.value.weatherData.slice(0, WEATHER_CONFIG.HOURS_TO_DISPLAY)
);

const dailyForecast = computed(() => 
  WeatherUtils.processDailyForecast(state.value.weatherData)
);

// Methods
const formatTime = (isoTime: string): string => {
  return WeatherUtils.formatHourOnly(isoTime, state.value.metadata.timezone);
};

const getTempBarWidth = (temp: number): string => {
  return WeatherUtils.getTempBarWidth(temp, minTemp.value, maxTemp.value);
};

async function loadWeatherData() {
  state.value.loading = true;
  state.value.error = null;
  state.value.weatherData = [];
  
  try {
    const { weatherData, metadata } = await weatherService.fetchWeatherData();
    state.value.weatherData = weatherData;
    state.value.metadata = metadata;
  } catch (e: any) {
    console.error("Fetching data failed:", e);
    state.value.error = e.message || 'Terjadi kesalahan saat mengambil data.';
  } finally {
    state.value.loading = false;
  }
}

// Lifecycle
onMounted(() => {
  loadWeatherData();
});

// Export utils untuk template
defineExpose({ WeatherUtils });
</script>