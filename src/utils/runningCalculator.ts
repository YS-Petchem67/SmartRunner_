import { WeatherConditions, RunningRecommendation } from '../types';

type RunningIndexMeta = {
  label: string;
  intensity: string;
  textClass: string;
  colorHex: string;
};

export function getRunningIndexMeta(score: number): RunningIndexMeta {
  if (score >= 85) {
    return {
      label: '매우좋음',
      intensity: '고강도 훈련을 하기에 최적의 조건입니다.',
      textClass: 'text-emerald-300',
      colorHex: '#6ee7b7'
    };
  }

  if (score >= 70) {
    return {
      label: '좋음',
      intensity: '중강도 템포 런 또는 지속주에 적합합니다.',
      textClass: 'text-[#caf300]',
      colorHex: '#caf300'
    };
  }

  if (score >= 50) {
    return {
      label: '보통',
      intensity: '회복을 위한 가벼운 조깅(LSD)을 권장합니다.',
      textClass: 'text-amber-300',
      colorHex: '#fcd34d'
    };
  }

  if (score >= 35) {
    return {
      label: '나쁨',
      intensity: '기상 조건이 좋지 않아 운동 강도를 낮추는 것을 권장합니다.',
      textClass: 'text-orange-400',
      colorHex: '#fb923c'
    };
  }

  return {
    label: '매우 나쁨',
    intensity: '기상 악화 또는 미세먼지로 인해 실내 트레드밀을 추천합니다.',
    textClass: 'text-red-400',
    colorHex: '#f87171'
  };
}

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

  // Clamp score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

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

  const indexMeta = getRunningIndexMeta(finalScore);

  return {
    indexScore: finalScore,
    indexLabel: indexMeta.label,
    recommendedPaceSec,
    recommendedPaceFormatted,
    targetHeartRate: 145,
    estimatedDuration: "45:00",
    adjustmentReason: reason,
    intensityRecommendation: indexMeta.intensity
  };
}
