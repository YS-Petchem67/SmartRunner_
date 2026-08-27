import React from 'react';
import { WeatherConditions, RunningRecommendation, UserProfile } from '../types';
import { formatPace, getRunningIndexMeta } from '../utils/runningCalculator';

interface DashboardViewProps {
  weather: WeatherConditions;
  recommendation: RunningRecommendation;
  userProfile: UserProfile;
  targetPaceSec: number;
  onSetTargetPace: (paceSec: number) => void;
  onStartRun: () => void;
  onOpenWeatherModal: () => void;
  onSelectPreset: (preset: Partial<WeatherConditions>) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  weather,
  recommendation,
  userProfile,
  targetPaceSec,
  onSetTargetPace,
  onStartRun,
  onOpenWeatherModal,
  onSelectPreset,
}) => {
  // Gauge angle calculation (0 to 180 degrees) based on indexScore (0 to 100)
  const gaugeDegrees = Math.round((recommendation.indexScore / 100) * 180);
  const indexMeta = getRunningIndexMeta(recommendation.indexScore);

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-5 py-6 flex flex-col gap-6 pb-32">
      {/* Header Greeting */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h1 className="dashboard-greeting font-headline text-2xl md:text-3xl font-bold text-white tracking-tight">
            {userProfile.greeting}
          </h1>
          <p className="text-[#c5c9ac] text-base mt-1">
            {recommendation.intensityRecommendation}
          </p>
        </div>

        {/* Quick Weather Preset Pill Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
          <span className="text-[#8f9378] text-[11px] whitespace-nowrap mr-1">빠른 프리셋:</span>
          <button
            onClick={() => onSelectPreset({ temperature: 22, humidity: 45, windSpeed: 5, airQuality: 'Good' })}
            className={`px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
              weather.temperature === 22 && weather.humidity === 45
                ? 'bg-[#caf300]/20 text-[#caf300] border-[#caf300]/50'
                : 'bg-[#1e2020] text-[#c5c9ac] border-white/5 hover:border-white/20'
            }`}
          >
            쾌적 (22°C/45%)
          </button>
          <button
            onClick={() => onSelectPreset({ temperature: 31, humidity: 85, windSpeed: 8, airQuality: 'Moderate' })}
            className={`px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
              weather.temperature === 31 && weather.humidity === 85
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                : 'bg-[#1e2020] text-[#c5c9ac] border-white/5 hover:border-white/20'
            }`}
          >
            고습도 (31°C/85%)
          </button>
          <button
            onClick={() => onSelectPreset({ temperature: 14, humidity: 35, windSpeed: 18, airQuality: 'Good' })}
            className={`px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
              weather.temperature === 14 && weather.windSpeed === 18
                ? 'bg-sky-400/20 text-sky-300 border-sky-400/50'
                : 'bg-[#1e2020] text-[#c5c9ac] border-white/5 hover:border-white/20'
            }`}
          >
            강풍 (14°C/18km)
          </button>
          <button
            onClick={onOpenWeatherModal}
            className="p-1 rounded-full bg-[#1e2020] text-[#caf300] border border-white/10 hover:border-[#caf300]/40"
            title="상세 날씨 조절"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
          </button>
        </div>
      </header>

      <section className="bg-[#1e2020] border border-white/10 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#caf300] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                settings
              </span>
              <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider">
                페이스 설정
              </h2>
            </div>
            <span className="font-mono text-sm font-bold text-[#caf300]">{formatPace(targetPaceSec)}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            {[270, 300, 330, 360, 390, 420].map((paceSec) => (
              <button
                key={paceSec}
                type="button"
                onClick={() => onSetTargetPace(paceSec)}
                className={`py-2 rounded-lg border transition-all ${
                  targetPaceSec === paceSec
                    ? 'bg-[#caf300] text-[#171e00] border-[#caf300] font-bold'
                    : 'bg-[#282a2b] text-[#c5c9ac] border-white/10 hover:border-white/20'
                }`}
              >
                {formatPace(paceSec)}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-mono text-[#c5c9ac]">
              <span>맞춤 속도</span>
              <span className="text-[#caf300] font-bold">{formatPace(targetPaceSec)}/km</span>
            </div>
            <input
              type="range"
              min={240}
              max={420}
              step={5}
              value={targetPaceSec}
              onChange={(e) => onSetTargetPace(Number(e.target.value))}
              className="accent-[#caf300] w-full cursor-pointer h-2 bg-[#333535] rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Today's Running Index (Main Gauge Card) */}
        <div className="running-index-card col-span-1 md:col-span-8 bg-[#2A2E35] border border-white/10 rounded-xl p-5 flex flex-col items-center relative overflow-hidden shadow-lg">
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-widest">
              오늘의 러닝지수
            </h2>
            <div className="bg-[#caf300]/10 px-3 py-1 rounded-full border border-[#caf300]/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#caf300] animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-[#caf300]">
                GPS 준비 완료
              </span>
            </div>
          </div>

          {/* Dynamic Semi-circle Gauge */}
          <div className="relative w-64 h-32 mb-4">
            {/* Semi-circle Gauge Conic Background */}
            <div
              className="absolute inset-0 rounded-t-full overflow-hidden"
              style={{
                background: `conic-gradient(from 180deg at 50% 100%, ${indexMeta.colorHex} 0deg, ${indexMeta.colorHex} ${gaugeDegrees}deg, rgba(255, 255, 255, 0.12) ${gaugeDegrees}deg, rgba(255, 255, 255, 0.12) 180deg)`,
                transformOrigin: 'bottom center',
              }}
            ></div>

            {/* Inner Cutout */}
            <div className="running-index-inner absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#2A2E35] rounded-t-full border-t border-white/10 flex flex-col items-center justify-end pb-2">
              <span className={`font-mono text-4xl font-extrabold leading-none ${indexMeta.textClass}`}>
                {recommendation.indexScore}
              </span>
              <span className={`font-mono text-xs font-bold mt-1 ${indexMeta.textClass}`}>
                {recommendation.indexLabel}
              </span>
            </div>
          </div>

          {/* Environmental Stats Grid */}
          <div className="w-full grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/5">
            <div className="flex flex-col items-center gap-1">
              <span
                className="material-symbols-outlined text-[#c5c9ac] text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                thermostat
              </span>
              <span className="font-mono text-lg font-bold text-white">
                {weather.temperature}°C
              </span>
              <span className="font-mono text-[10px] font-bold text-[#c5c9ac]">
                기온
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span
                className="material-symbols-outlined text-[#c5c9ac] text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                humidity_percentage
              </span>
              <span className="font-mono text-lg font-bold text-white">
                {weather.humidity}%
              </span>
              <span className="font-mono text-[10px] font-bold text-[#c5c9ac]">
                습도
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span
                className="material-symbols-outlined text-[#c5c9ac] text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                air
              </span>
              <span className="font-mono text-lg font-bold text-white">
                {weather.windSpeed}km/h
              </span>
              <span className="font-mono text-[10px] font-bold text-[#c5c9ac]">
                풍속
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span
                className="material-symbols-outlined text-[#caf300] text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                spa
              </span>
              <span
                className={`font-mono text-lg font-bold ${
                  weather.airQuality === 'Good'
                    ? 'text-[#caf300]'
                    : weather.airQuality === 'Moderate'
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {weather.airQuality}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#c5c9ac]">
                대기질
              </span>
            </div>
          </div>
        </div>

        {/* Recommended Pace Section */}
        <div className="col-span-1 md:col-span-4 bg-[#2A2E35] border border-white/10 rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">speed</span>
              권장 페이스
            </h2>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-5xl font-extrabold text-white leading-none tracking-tight">
                  {recommendation.recommendedPaceFormatted}
                </span>
                <span className="font-mono text-xs font-bold text-[#c5c9ac]">
                  /km
                </span>
              </div>
              <p className="text-[#c5c9ac] text-sm mt-3 leading-relaxed">
                {recommendation.adjustmentReason}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 pt-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-mono text-xs text-[#c5c9ac]">Target HR</span>
              <span className="font-mono text-base font-bold text-white">
                {recommendation.targetHeartRate} BPM
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="font-mono text-xs text-[#c5c9ac]">Est. Duration</span>
              <span className="font-mono text-base font-bold text-white">
                {recommendation.estimatedDuration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button / Quick Start Container */}
      <div className="fixed bottom-20 left-0 w-full px-5 flex justify-center z-40 md:static md:bottom-auto md:px-0 md:max-w-4xl md:mx-auto">
        <button
          onClick={onStartRun}
          className="w-full md:w-auto bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-headline text-xl font-extrabold rounded-lg py-4 px-10 flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all duration-200 glow-primary cursor-pointer shadow-xl"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
          러닝 시작
        </button>
      </div>
    </main>
  );
};
