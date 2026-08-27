export interface WeatherConditions {
  temperature: number; // in Celsius e.g. 22
  humidity: number; // percentage e.g. 45
  windSpeed: number; // in km/h e.g. 5
  airQuality: 'Good' | 'Moderate' | 'Unhealthy';
  weatherDesc: string;
}

export interface RunningRecommendation {
  indexScore: number; // 0 - 100 e.g. 85
  indexLabel: string; // '매우 좋음' | '좋음' | '보통' | '주의'
  recommendedPaceSec: number; // pace in total seconds e.g. 330 for 5'30"
  recommendedPaceFormatted: string; // "5'30\""
  targetHeartRate: number; // e.g. 145 BPM
  estimatedDuration: string; // "45:00"
  adjustmentReason: string; // e.g. "현재 습도를 고려해 존 3 심박수 유지를 위해 10초 조정되었습니다."
  intensityRecommendation: string; // "고강도 훈련을 하기에 최적의 조건입니다."
}

export interface LiveRunMetrics {
  isActive: boolean;
  isPaused: boolean;
  elapsedSeconds: number;
  distanceKm: number;
  currentPaceSec: number;
  currentPaceFormatted: string;
  heartRate: number;
  cadence: number;
  targetCadence: number;
  caloriesBurned: number;
  elevationGain: number;
  routeCoordinates: Array<{ lat: number; lng: number; time: string }>;
  currentAlert?: {
    type: 'warning' | 'info' | 'tip';
    title: string;
    message: string;
  };
}

export interface CompletedRunSummary {
  id: string;
  date: string;
  timeOfDay: string;
  distanceKm: number;
  durationSeconds: number;
  durationFormatted: string;
  avgPaceFormatted: string;
  avgPaceSec: number;
  predictedPaceFormatted: string;
  predictedPaceSec: number;
  avgHeartRate: number;
  predictedHeartRate: number;
  elevationGainMeters: number;
  weatherImpactPercent: number;
  weatherImpactDescription: string;
  recoveryScore: number;
  recoveryDescription: string;
  cadenceAvg: number;
  calories: number;
  routeMapUrl: string;
}

export type GoalPeriod = 'week' | 'month' | 'year';

export interface UserProfile {
  name: string;
  greeting: string;
  avatarUrl: string;
  level: string;
  vo2max: number;
  totalDistanceKm: number;
  totalRuns: number;
  shoesMileageKm: number;
  shoesName: string;
  goalPeriod: GoalPeriod;
  targetWeeklyKm: number;
  targetMonthlyKm: number;
  targetYearlyKm: number;
  currentWeeklyKm: number;
  currentMonthlyKm: number;
  currentYearlyKm: number;
}
