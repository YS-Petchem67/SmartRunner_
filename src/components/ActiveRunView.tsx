import React from 'react';
import { ASSETS } from '../constants/assets';
import { LiveRunMetrics, RunningRecommendation, WeatherConditions } from '../types';
import { formatTime } from '../utils/runningCalculator';

interface ActiveRunViewProps {
  metrics: LiveRunMetrics;
  recommendation: RunningRecommendation;
  weather: WeatherConditions;
  onPauseToggle: () => void;
  onFinishRun: () => void;
  onSwitchToAnalysis: () => void;
}

export const ActiveRunView: React.FC<ActiveRunViewProps> = ({
  metrics,
  recommendation,
  weather,
  onPauseToggle,
  onFinishRun,
  onSwitchToAnalysis
}) => {
  return (
    <div className="bg-[#121414] text-[#e2e2e2] min-h-screen flex flex-col font-sans select-none pb-32">
      {/* Top Status Bar (Minimal Instrumentation) */}
      <header className="flex justify-between items-center px-5 py-4 z-10 max-w-xl mx-auto w-full">
        <div className="flex items-center gap-3">
          {/* GPS Status Chip */}
          <div className="bg-[#1e2020] rounded-full px-3 py-1 flex items-center gap-2 border border-white/5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#caf300] animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-[#c5c9ac] uppercase">
              GPS 수신 양호
            </span>
          </div>

          {/* Quick Tab to switch between Metrics and Analysis */}
          <button
            onClick={onSwitchToAnalysis}
            className="flex items-center gap-1 bg-[#1e2020] hover:bg-[#282a2b] text-[#caf300] px-3 py-1 rounded-full text-xs font-mono border border-[#caf300]/20 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">monitor_heart</span>
            <span>라이브 분석</span>
          </button>
        </div>

        {/* Recording Indicator */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-white">
            {metrics.isPaused ? 'PAUSED' : 'REC'}
          </span>
          <div
            className={`w-3 h-3 rounded-full relative ${
              metrics.isPaused ? 'bg-amber-400' : 'bg-[#caf300] animate-pulse-ring'
            }`}
          ></div>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <main className="flex-1 px-5 flex flex-col gap-4 max-w-xl mx-auto w-full overflow-y-auto">
        {/* Hero Metric: Current Pace */}
        <section className="bg-[#1e2020] rounded-xl p-6 flex flex-col items-center justify-center relative border border-white/10 shadow-[inset_0_0_40px_rgba(202,243,0,0.05)]">
          <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-widest mb-1">
            현재 페이스
          </h2>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="font-mono text-6xl md:text-7xl font-extrabold text-[#caf300] tracking-tight">
              {metrics.currentPaceFormatted}
            </span>
            <span className="text-base text-[#c5c9ac] font-medium">/km</span>
          </div>

          {/* Target Pace Reference */}
          <div className="mt-2 flex items-center gap-3 bg-[#333535] rounded-lg px-4 py-2 border border-white/5">
            <span
              className="material-symbols-outlined text-base text-[#c5c9ac]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              target
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] leading-tight text-[#c5c9ac] uppercase font-bold">
                목표 페이스 (날씨 보정)
              </span>
              <span className="font-mono text-base font-bold text-white">
                {recommendation.recommendedPaceFormatted}/km
              </span>
            </div>
          </div>
        </section>

        {/* Condition Alert Banner */}
        <section className="bg-[#93000a]/15 border border-[#ffb4ab]/30 rounded-lg p-4 flex items-start gap-3">
          <span
            className="material-symbols-outlined text-[#ffb4ab] text-xl mt-0.5 shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            warning
          </span>
          <div>
            <h3 className="font-mono text-xs font-bold text-[#ffb4ab] uppercase mb-1">
              상태 알림
            </h3>
            <p className="text-sm text-[#ffdad6] leading-snug">
              {weather.humidity >= 45
                ? `높은 습도(${weather.humidity}%)가 감지되었습니다. 최적 구간 유지를 위해 심박수를 160bpm 이하로 유지하세요.`
                : '기온 및 호흡 상태가 안정적입니다. 일정한 스트라이드를 유지하세요.'}
            </p>
          </div>
        </section>

        {/* Secondary Metrics Grid (Bento Style) */}
        <section className="grid grid-cols-2 gap-3">
          {/* Elapsed Time */}
          <div className="bg-[#1e2020] rounded-xl p-4 border border-white/10 flex flex-col justify-between">
            <span
              className="material-symbols-outlined text-[#c5c9ac] mb-3 text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              timer
            </span>
            <div>
              <h3 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase mb-1">
                시간
              </h3>
              <div className="font-mono text-3xl font-extrabold text-white">
                {formatTime(metrics.elapsedSeconds)}
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="bg-[#1e2020] rounded-xl p-4 border border-white/10 flex flex-col justify-between">
            <span
              className="material-symbols-outlined text-[#c5c9ac] mb-3 text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              route
            </span>
            <div>
              <h3 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase mb-1">
                거리
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-3xl font-extrabold text-white">
                  {metrics.distanceKm.toFixed(2)}
                </span>
                <span className="text-sm text-[#c5c9ac] font-medium">km</span>
              </div>
            </div>
          </div>
        </section>

        {/* GPS Map Mini-view */}
        <section
          onClick={onSwitchToAnalysis}
          className="rounded-xl overflow-hidden border border-white/10 relative h-40 w-full bg-[#1e2020] cursor-pointer group shadow-md"
        >
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url('${ASSETS.activeRunMap}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121414]/90 via-transparent to-transparent"></div>

          {/* Map label */}
          <div className="absolute bottom-3 left-3 bg-[#121414]/85 backdrop-blur-md rounded px-2.5 py-1 flex items-center gap-1.5 border border-white/10">
            <span
              className="material-symbols-outlined text-sm text-[#caf300]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              my_location
            </span>
            <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              실시간 추적
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-[#caf300]/20 text-[#caf300] backdrop-blur-md rounded px-2.5 py-1 text-xs font-mono flex items-center gap-1 border border-[#caf300]/30">
            <span>심박 {metrics.heartRate} bpm</span>
          </div>
        </section>
      </main>

      {/* Fixed Action Controls (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#121414]/95 backdrop-blur-lg border-t border-white/5 p-5 pb-safe z-50">
        <div className="flex gap-3 max-w-xl mx-auto w-full">
          {/* Pause / Resume Button */}
          <button
            onClick={onPauseToggle}
            className="flex-1 bg-[#333535] hover:bg-[#37393a] text-white rounded-lg h-16 flex items-center justify-center gap-2 transition-all border border-white/10 active:scale-95 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {metrics.isPaused ? 'play_arrow' : 'pause'}
            </span>
            <span className="font-headline text-lg font-bold">
              {metrics.isPaused ? '계속하기' : '일시정지'}
            </span>
          </button>

          {/* Finish Button */}
          <button
            onClick={onFinishRun}
            className="flex-1 bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] rounded-lg h-16 flex items-center justify-center gap-2 transition-all font-headline text-lg font-bold shadow-[0_0_20px_rgba(202,243,0,0.2)] active:scale-95 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stop
            </span>
            종료
          </button>
        </div>
      </div>
    </div>
  );
};
