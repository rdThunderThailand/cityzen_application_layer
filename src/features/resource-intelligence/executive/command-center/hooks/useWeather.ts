'use client';

import { useEffect, useState } from 'react';

// Phuket City coordinates
const PHUKET_LAT = 7.8804;
const PHUKET_LON = 98.3923;
const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

export interface WeatherData {
  temperatureC: number;
  humidityPct: number;
  windKph: number;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${PHUKET_LAT}&longitude=${PHUKET_LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Asia%2FBangkok`
        );
        if (!res.ok) throw new Error(`weather request failed: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        setWeather({
          temperatureC: Math.round(data.current.temperature_2m),
          humidityPct: Math.round(data.current.relative_humidity_2m),
          windKph: Math.round(data.current.wind_speed_10m),
        });
        setError(false);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { weather, error };
}
