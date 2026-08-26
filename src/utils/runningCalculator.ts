import { WeatherConditions, RunningRecommendation } from '../types';

export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatPace(paceInSeconds: number): string {
  const mins = Math.floor(paceInSeconds / 60);
  const secs = Math.round(paceInSeconds % 60);
  return `${mins}'${secs.toString().padStart(2, '0')}"`;
}

export function calculateRunningIndex(weather: WeatherConditions): RunningRecommendation {
  // Base index 95
  let score = 95;

  // Temperature penalty: optimal is 12°C - 18°C
  if (weather.temperature > 18) {
    score -= (weather.temperature - 18) * 1.5;
  } else if (weather.temperature < 5) {
    score -= (5 - weather.temperature) * 2;
  }

  // Humidity penalty: optimal is 30% - 50%
  if (weather.humidity > 50) {
    score -= (weather.humidity - 50) * 0.35;
  } else if (weather.humidity < 25) {
    score -= (25 - weather.humidity) * 0.2;
  }

  // Wind penalty: optimal is 2 - 8 km/h
  if (weather.windSpeed > 15) {
    score -= (weather.windSpeed - 15) * 0.8;
  }

  // Air Quality penalty
  if (weather.airQuality === 'Moderate') {
    score -= 10;
  } else if (weather.airQuality === 'Unhealthy') {
    score -= 25;
  }

  // Clamp score between 20 and 99
  const finalScore = Math.max(20, Math.min(99, Math.round(score)));

  // Pace adjustments
  let basePaceSec = 320; // 5'20"
  let paceAdjustmentSec = 0;
  let reason = "현재 날씨가 러닝에 이상적입니다.";

  if (weather.humidity >= 45 && weather.temperature >= 20) {
    paceAdjustmentSec = 10;
    reason = `현재 습도(${weather.humidity}%) 및 기온을 고려해 존 3 심박수 유지를 위해 10초 조정되었습니다.`;
  } else if (weather.humidity > 60 || weather.temperature > 25) {
    paceAdjustmentSec = 20;
    reason = "고온다습한 환경으로 인해 과열 방지를 위해 페이스가 20초 늦춰졌습니다.";
  } else if (weather.windSpeed > 20) {
    paceAdjustmentSec = 15;
    reason = "강한 맞바람으로 인해 에너지 소모를 줄이도록 15초 조정되었습니다.";
  }

  const recommendedPaceSec = basePaceSec + paceAdjustmentSec;
  const recommendedPaceFormatted = formatPace(recommendedPaceSec);

  let indexLabel = '매우 좋음';
  let intensity = '고강도 훈련을 하기에 최적의 조건입니다.';
  if (finalScore >= 80) {
    indexLabel = '매우 좋음';
    intensity = '고강도 훈련을 하기에 최적의 조건입니다.';
  } else if (finalScore >= 65) {
    indexLabel = '좋음';
    intensity = '중강도 템포 런 또는 지속주에 적합합니다.';
  } else if (finalScore >= 50) {
    indexLabel = '보통';
    intensity = '회복을 위한 가벼운 조깅(LSD)을 권장합니다.';
  } else {
    indexLabel = '주의';
    intensity = '기상 악화 또는 미세먼지로 인해 실내 트레드밀을 추천합니다.';
  }

  return {
    indexScore: finalScore,
    indexLabel,
    recommendedPaceSec,
    recommendedPaceFormatted,
    targetHeartRate: 145,
    estimatedDuration: "45:00",
    adjustmentReason: reason,
    intensityRecommendation: intensity
  };
}
