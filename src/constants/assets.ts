export const ASSETS = {
  // Brand Logo with runner icon
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdj8qqqq1c06bC8QgXk9j6GIiyCudp61nY7ic01wCcGutUJOgtJqh-DE_tVI46mwAfHKo8hhYcatRC4a4w-HPYOzi1E7Si5wJ5CzJlOlZzBwfDpXobYHgfWZD8KSzKrABSgKWYVWc0XOIq2GsVRXVmaCD-a6VwiwaYPz-w4LWhEOPjTpIRQ2ndF8-nZ6VqfXu2oO-MPisXs9rG7iPLU5mMOIIfIOnBKgsH7AxDZB5ShdcyLYyhdxCA",
  
  // Female Runner Avatar
  femaleRunnerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzNKfxM9yBTWLPy0DqC7jrozPelqSweaqxuKJMUgwUKdEjsg8zqpDFPFoIEUAq4DNlxPlcCsxomSRPV6UKH-0IgDOLx8XwiDYLttL_fYC2jiO0yjTQXTIeISSTTru8LiKGzL5GUf3iYpKiOhaTqqTdGV1poVBALzeyf2m037tTq4gYmkQNF3_vCSC1ZV5E2jB3wX8iLMDULQnnChthLNhdE0eoWLmr978QKQAacZHJbe3upbDa4xHi",

  // Male Runner Avatar
  maleRunnerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwAkTBLa9BOaMvUgORh7s2PExHk1s2WraJ6G1HRGtO3sf5N4c0mR3W_zPZoUcKXkqRAeiJV7FNzHYWrE4EfUS2QCFQUaUqDZkPDOLY-E-witsjE7ZSz6WlFdLpwu6HZvpqZqH7e5b1RjejUMkIGuZnZ3c3yBfZL3XTXhDm6GcsNzjoD4klNlESwnx3-aBDwKkMgVji8Bbvy7qwtDtdQFqzpOszcfNzng7zxmeVAf-aI2YmtCUX-kqb",

  // Live GPS Map
  activeRunMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMEYDZCL-HQiJJDIm8BjiIbP_7MMFJTeNSB1Un2nsMxms1QrJDfaD3d8vcSt9kq6aKD1AsSSeXdC9QX9viBXw8lMqR4G1kRV0jTh1MRZ8aKXtLh32J2kThRHj9qDdqvhRu_O5iVmXd6ettpikWUAlgoGg87z4XWvlysFF0iJ8rityLzhKoW-z1bq8nOqDPbP31u2X6b5EaqHb1FKPQJOFsjqEyLrRCJ3Bc78t2Djh_FHz4OLkpZRVe",

  // Completed Route Topographic Map
  completedRouteMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwhWnjQRS9IqcXGekKbu8wkbIOsJzEB1YTz-rmeEZaYBIo9n1YUBomOqWbcFpXqBI0hBql8qGr1aVa_k3pE4_hkRA7g3xGsDdffnIgHdslsQA95ylijmA9i56nqLpJOVwiAxgCwpYag7A4fi8ptv1f6mier1MXD1keT3ZJEoQilIt8VeqRfxauSea9TPWiMKfbxG0v_FooSrqqhvPD7hJ9x1WZOJNXIcdHPfPguBltFpYcOxas6dYj"
};

export const INITIAL_WEATHER: import('../types').WeatherConditions = {
  temperature: 22,
  humidity: 45,
  windSpeed: 5,
  airQuality: 'Good',
  weatherDesc: '쾌적하고 맑음'
};

export const INITIAL_PROFILE: import('../types').UserProfile = {
  name: "러너",
  greeting: "좋은 아침입니다, 러너님",
  avatarUrl: ASSETS.femaleRunnerAvatar,
  level: "Advanced Runner",
  vo2max: 54,
  totalDistanceKm: 428.5,
  totalRuns: 64,
  shoesMileageKm: 184.2,
  shoesName: "Nike ZoomX Vaporfly 3",
  goalPeriod: 'week',
  targetWeeklyKm: 30,
  targetMonthlyKm: 120,
  targetYearlyKm: 1500,
  currentWeeklyKm: 21.5,
  currentMonthlyKm: 94.3,
  currentYearlyKm: 428.5
};

export const SAMPLE_RUN_HISTORY: import('../types').CompletedRunSummary[] = [
  {
    id: "run-recent-01",
    date: "10월 26일",
    timeOfDay: "07:30 AM",
    distanceKm: 5.0,
    durationSeconds: 1650, // 27:30
    durationFormatted: "27:30",
    avgPaceFormatted: "5:30",
    avgPaceSec: 330,
    predictedPaceFormatted: "5:15",
    predictedPaceSec: 315,
    avgHeartRate: 162,
    predictedHeartRate: 150,
    elevationGainMeters: 42,
    weatherImpactPercent: 85,
    weatherImpactDescription: "높은 습도로 인해 심박수가 약 8bpm 상승했으며, 기준 대비 페이스 효율이 4% 감소했습니다.",
    recoveryScore: 82,
    recoveryDescription: "탁월한 심박수 회복. 신체 능력에 완벽하게 일치하는 운동 강도였습니다.",
    cadenceAvg: 176,
    calories: 385,
    routeMapUrl: ASSETS.completedRouteMap
  },
  {
    id: "run-recent-02",
    date: "10월 24일",
    timeOfDay: "06:45 AM",
    distanceKm: 8.2,
    durationSeconds: 2542, // 42:22
    durationFormatted: "42:22",
    avgPaceFormatted: "5:10",
    avgPaceSec: 310,
    predictedPaceFormatted: "5:12",
    predictedPaceSec: 312,
    avgHeartRate: 154,
    predictedHeartRate: 152,
    elevationGainMeters: 65,
    weatherImpactPercent: 92,
    weatherImpactDescription: "온도 18°C와 습도 38%로 페이스 유지가 매우 수월했던 이상적인 날씨였습니다.",
    recoveryScore: 89,
    recoveryDescription: "안정적인 존 3 페이스 유지로 빠른 젖산 회복 및 심근 피로도가 최소화되었습니다.",
    cadenceAvg: 178,
    calories: 610,
    routeMapUrl: ASSETS.completedRouteMap
  },
  {
    id: "run-recent-03",
    date: "10월 21일",
    timeOfDay: "08:15 PM",
    distanceKm: 10.0,
    durationSeconds: 3240, // 54:00
    durationFormatted: "54:00",
    avgPaceFormatted: "5:24",
    avgPaceSec: 324,
    predictedPaceFormatted: "5:20",
    predictedPaceSec: 320,
    avgHeartRate: 158,
    predictedHeartRate: 155,
    elevationGainMeters: 80,
    weatherImpactPercent: 88,
    weatherImpactDescription: "야간 러닝으로 기온이 내려가 심박수 급상승을 억제했습니다.",
    recoveryScore: 78,
    recoveryDescription: "장거리 훈련 후 충실한 수분 섭취와 스트레칭이 권장됩니다.",
    cadenceAvg: 174,
    calories: 740,
    routeMapUrl: ASSETS.completedRouteMap
  }
];
