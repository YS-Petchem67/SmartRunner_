import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CompletedRunSummary } from '../types';

interface WorkoutSummaryViewProps {
  summary: CompletedRunSummary;
  onShare: () => void;
  onViewDetailedStats: () => void;
  onReturnHome: () => void;
}

export const WorkoutSummaryView: React.FC<WorkoutSummaryViewProps> = ({
  summary,
  onShare,
  onViewDetailedStats,
  onReturnHome
}) => {
  useEffect(() => {
    // Joyful celebration confetti on completion
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#caf300', '#b0d500', '#ffffff', '#4ade80']
      });
    } catch {
      // ignore in tests/unsupported
    }
  }, []);

  return (
    <div className="bg-[#121414] text-[#e2e2e2] min-h-screen font-sans pb-32">
      {/* Top Header bar with Home return */}
      <header className="bg-[#121414] border-b border-white/10 flex justify-between items-center w-full px-5 h-16 max-w-5xl mx-auto">
        <button
          onClick={onReturnHome}
          className="flex items-center gap-2 text-[#caf300] hover:opacity-80 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="font-display text-xl font-extrabold tracking-tighter uppercase">
            SmartRunner
          </span>
        </button>

        <button
          onClick={onReturnHome}
          className="text-xs font-mono text-[#c5c9ac] hover:text-white bg-[#1e2020] px-3 py-1.5 rounded-lg border border-white/10"
        >
          홈으로 가기
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-6 px-5 max-w-2xl md:max-w-4xl mx-auto flex flex-col gap-6">
        {/* Hero Summary */}
        <section className="flex flex-col items-center text-center py-4">
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            러닝 완료
          </h1>
          <div className="flex items-baseline gap-6 md:gap-10 mt-4">
            <div className="flex flex-col items-center">
              <span className="font-mono text-4xl md:text-5xl font-extrabold text-[#caf300]">
                {summary.distanceKm.toFixed(2)}
              </span>
              <span className="font-mono text-xs font-bold text-[#c5c9ac] mt-1 tracking-wider">
                KM
              </span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-4xl md:text-5xl font-extrabold text-[#caf300]">
                {summary.durationFormatted}
              </span>
              <span className="font-mono text-xs font-bold text-[#c5c9ac] mt-1 tracking-wider">
                TIME
              </span>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Map & Pace Background Card */}
          <div className="col-span-1 md:col-span-2 relative h-48 rounded-xl overflow-hidden border border-white/10 bg-[#282a2b] group shadow-lg">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500"
              style={{ backgroundImage: `url('${summary.routeMapUrl}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/40 to-transparent"></div>

            <div className="absolute top-3 left-4 text-xs font-mono text-[#c5c9ac] bg-[#121414]/70 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
              <span>{summary.date}</span> | <span>{summary.timeOfDay}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#c5c9ac] uppercase">
                  평균 페이스
                </span>
                <span className="font-mono text-2xl md:text-3xl font-extrabold text-white">
                  {summary.avgPaceFormatted}{' '}
                  <span className="text-sm font-normal text-[#c6c6ca]">/km</span>
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs font-bold text-[#c5c9ac] uppercase">
                  고도
                </span>
                <span className="font-mono text-2xl md:text-3xl font-extrabold text-white">
                  +{summary.elevationGainMeters}{' '}
                  <span className="text-sm font-normal text-[#c6c6ca]">m</span>
                </span>
              </div>
            </div>
          </div>

          {/* Weather Impact Card */}
          <div className="bg-[#282a2b] rounded-xl p-5 border border-white/10 flex flex-col gap-2 h-full shadow-md">
            <div className="flex justify-between items-start">
              <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider">
                날씨 영향
              </h2>
              <span
                className="material-symbols-outlined text-[#ffb4ab] text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                water_drop
              </span>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-2">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#333535]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="100, 100"
                    strokeWidth="3"
                  ></path>
                  <path
                    className="text-[#ffb4ab]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${summary.weatherImpactPercent}, 100`}
                    strokeWidth="3"
                  ></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-[#ffb4ab]">
                    {summary.weatherImpactPercent}%
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-[#c6c6ca] leading-relaxed">
                {summary.weatherImpactDescription}
              </p>
            </div>
          </div>

          {/* Recovery Score Card */}
          <div className="bg-[#282a2b] rounded-xl p-5 border border-white/10 flex flex-col gap-2 h-full glow-primary relative overflow-hidden shadow-md">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#caf300]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex justify-between items-start relative z-10">
              <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider">
                회복 점수
              </h2>
              <span
                className="material-symbols-outlined text-[#caf300] text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                monitor_heart
              </span>
            </div>

            <div className="flex flex-col mt-auto pt-2 relative z-10">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-4xl font-extrabold text-white">
                  {summary.recoveryScore}
                </span>
                <span className="text-sm text-[#c5c9ac] font-mono">/100</span>
              </div>
              <p className="text-xs md:text-sm text-[#caf300] mt-1 leading-relaxed">
                {summary.recoveryDescription}
              </p>
            </div>
          </div>

          {/* Comparison Charts */}
          <div className="col-span-1 md:col-span-2 bg-[#282a2b] rounded-xl p-5 border border-white/10 flex flex-col gap-4 shadow-md">
            <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider">
              예측 대비 실제 퍼포먼스
            </h2>
            <div className="flex flex-col gap-4">
              {/* Pace Metric */}
              <div>
                <div className="flex justify-between mb-1.5 text-xs md:text-sm">
                  <span className="text-[#c6c6ca]">페이스 (평균)</span>
                  <span className="text-white font-mono font-bold">
                    {summary.avgPaceFormatted}{' '}
                    <span className="text-[#ffb4ab] text-xs ml-1 font-mono font-normal">
                      vs {summary.predictedPaceFormatted} (예측)
                    </span>
                  </span>
                </div>
                <div className="w-full bg-[#0c0f0f] h-2.5 rounded-full overflow-hidden flex relative">
                  {/* Predicted Marker */}
                  <div className="absolute left-[70%] top-0 bottom-0 w-1 bg-white/40 z-20"></div>
                  {/* Actual Performance Bar */}
                  <div className="bg-[#caf300] h-full w-[65%] z-10 opacity-90 rounded-r-full shadow-[0_0_8px_#caf300]"></div>
                </div>
              </div>

              {/* Heart Rate Metric */}
              <div>
                <div className="flex justify-between mb-1.5 text-xs md:text-sm">
                  <span className="text-[#c6c6ca]">심박수 (평균)</span>
                  <span className="text-white font-mono font-bold">
                    {summary.avgHeartRate} bpm{' '}
                    <span className="text-[#ffb4ab] text-xs ml-1 font-mono font-normal">
                      vs {summary.predictedHeartRate} bpm (예측)
                    </span>
                  </span>
                </div>
                <div className="w-full bg-[#0c0f0f] h-2.5 rounded-full overflow-hidden flex relative">
                  {/* Target/Predicted Marker */}
                  <div className="absolute left-[60%] top-0 bottom-0 w-1 bg-white/40 z-20"></div>
                  {/* Actual Performance Bar (Overshot) */}
                  <div className="bg-[#ffb4ab] h-full w-[78%] z-10 opacity-90 rounded-r-full shadow-[0_0_8px_#ffb4ab]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onShare}
              className="flex-1 h-12 rounded-lg border border-[#caf300]/40 text-[#caf300] font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-[#caf300]/10 hover:border-[#caf300] transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-base">share</span>
              결과 공유
            </button>
            <button
              onClick={onViewDetailedStats}
              className="flex-1 h-12 rounded-lg border border-white/10 bg-[#1e2020] hover:bg-[#37393a] text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-base">analytics</span>
              상세 보기
            </button>
            <button
              onClick={onReturnHome}
              className="flex-1 h-12 rounded-lg bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-base">check_circle</span>
              완료 및 홈으로
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
