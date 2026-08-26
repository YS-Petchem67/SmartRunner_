import React, { useState } from 'react';
import { CompletedRunSummary } from '../types';

interface StatsHistoryViewProps {
  history: CompletedRunSummary[];
  onSelectRun: (run: CompletedRunSummary) => void;
}

export const StatsHistoryView: React.FC<StatsHistoryViewProps> = ({
  history,
  onSelectRun
}) => {
  const [filter, setFilter] = useState<'all' | '5k' | '10k'>('all');

  const filteredHistory = history.filter((run) => {
    if (filter === '5k') return run.distanceKm >= 4.5 && run.distanceKm <= 6.0;
    if (filter === '10k') return run.distanceKm >= 9.0;
    return true;
  });

  const totalDistance = history.reduce((acc, r) => acc + r.distanceKm, 0);
  const totalCalories = history.reduce((acc, r) => acc + r.calories, 0);
  const avgPaceSec = Math.round(
    history.reduce((acc, r) => acc + r.avgPaceSec, 0) / (history.length || 1)
  );
  const avgPaceFormatted = `${Math.floor(avgPaceSec / 60)}'${(avgPaceSec % 60)
    .toString()
    .padStart(2, '0')}"`;

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-5 py-6 flex flex-col gap-6 pb-32">
      {/* Title */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-white tracking-tight">
            러닝 분석 & 통계
          </h1>
          <p className="text-[#c5c9ac] text-sm mt-1">
            환경 데이터와 연동된 정밀 러닝 로그 및 성과 지표
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === 'all'
                ? 'bg-[#caf300] text-[#171e00] border-[#caf300] font-bold'
                : 'bg-[#1e2020] text-[#c5c9ac] border-white/10 hover:border-white/20'
            }`}
          >
            전체 ({history.length})
          </button>
          <button
            onClick={() => setFilter('5k')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === '5k'
                ? 'bg-[#caf300] text-[#171e00] border-[#caf300] font-bold'
                : 'bg-[#1e2020] text-[#c5c9ac] border-white/10 hover:border-white/20'
            }`}
          >
            5K 세션
          </button>
          <button
            onClick={() => setFilter('10k')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === '10k'
                ? 'bg-[#caf300] text-[#171e00] border-[#caf300] font-bold'
                : 'bg-[#1e2020] text-[#c5c9ac] border-white/10 hover:border-white/20'
            }`}
          >
            10K+ 장거리
          </button>
        </div>
      </header>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#2A2E35] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <span className="font-mono text-xs text-[#c5c9ac] uppercase">누적 거리</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-mono text-3xl font-extrabold text-[#caf300]">
              {totalDistance.toFixed(1)}
            </span>
            <span className="font-mono text-xs text-[#c5c9ac]">km</span>
          </div>
        </div>

        <div className="bg-[#2A2E35] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <span className="font-mono text-xs text-[#c5c9ac] uppercase">평균 페이스</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-mono text-3xl font-extrabold text-white">
              {avgPaceFormatted}
            </span>
            <span className="font-mono text-xs text-[#c5c9ac]">/km</span>
          </div>
        </div>

        <div className="bg-[#2A2E35] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <span className="font-mono text-xs text-[#c5c9ac] uppercase">총 소모 칼로리</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-mono text-3xl font-extrabold text-white">
              {totalCalories}
            </span>
            <span className="font-mono text-xs text-[#c5c9ac]">kcal</span>
          </div>
        </div>

        <div className="bg-[#2A2E35] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <span className="font-mono text-xs text-[#c5c9ac] uppercase">평균 회복 점수</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-mono text-3xl font-extrabold text-[#caf300]">
              83
            </span>
            <span className="font-mono text-xs text-[#c5c9ac]">/100</span>
          </div>
        </div>
      </div>

      {/* Environmental Correlation Insight */}
      <section className="bg-[#1e2020] border border-white/10 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="material-symbols-outlined text-[#caf300] text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            insights
          </span>
          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            날씨 조건과 페이스 상관관계 분석
          </h2>
        </div>
        <p className="text-sm text-[#c5c9ac] leading-relaxed mb-4">
          최근 30일간 습도 70% 이상 환경에서 평균 심박수가 <span className="text-[#ffb4ab] font-bold">+7.4 bpm</span> 상승했으며, 기온 15~18°C 구간에서 가장 높은 페이스 효율(평균 5'10"/km)을 기록했습니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#282a2b] p-3 rounded-lg border border-white/5 flex flex-col">
            <span className="text-xs text-[#c5c9ac]">최적 기온 구간</span>
            <span className="font-mono text-lg font-bold text-[#caf300] mt-1">14°C ~ 18°C</span>
          </div>
          <div className="bg-[#282a2b] p-3 rounded-lg border border-white/5 flex flex-col">
            <span className="text-xs text-[#c5c9ac]">습도 페이스 저하율</span>
            <span className="font-mono text-lg font-bold text-[#ffb4ab] mt-1">-3.8% (습도 &gt; 60%)</span>
          </div>
          <div className="bg-[#282a2b] p-3 rounded-lg border border-white/5 flex flex-col">
            <span className="text-xs text-[#c5c9ac]">평균 케이던스</span>
            <span className="font-mono text-lg font-bold text-white mt-1">176 SPM</span>
          </div>
        </div>
      </section>

      {/* Workout Logs List */}
      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-widest">
          최근 러닝 기록 ({filteredHistory.length})
        </h2>

        <div className="flex flex-col gap-3">
          {filteredHistory.map((run) => (
            <div
              key={run.id}
              onClick={() => onSelectRun(run)}
              className="bg-[#2A2E35] hover:bg-[#333740] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all hover:border-[#caf300]/40 shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1e2020] border border-white/10 flex flex-col items-center justify-center shrink-0">
                  <span className="font-mono text-xs text-[#c5c9ac]">
                    {run.date.split(' ')[0]}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#caf300]">
                    {run.date.split(' ')[1]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-extrabold text-white">
                      {run.distanceKm.toFixed(2)} km
                    </span>
                    <span className="text-xs font-mono text-[#caf300] bg-[#caf300]/10 px-2 py-0.5 rounded border border-[#caf300]/20">
                      회복 {run.recoveryScore}점
                    </span>
                  </div>
                  <p className="text-xs text-[#c5c9ac] mt-0.5 line-clamp-1">
                    {run.weatherImpactDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                <div className="flex flex-col md:items-end">
                  <span className="font-mono text-xs text-[#c5c9ac]">시간</span>
                  <span className="font-mono text-base font-bold text-white">
                    {run.durationFormatted}
                  </span>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="font-mono text-xs text-[#c5c9ac]">평균 페이스</span>
                  <span className="font-mono text-base font-bold text-[#caf300]">
                    {run.avgPaceFormatted}/km
                  </span>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="font-mono text-xs text-[#c5c9ac]">심박수</span>
                  <span className="font-mono text-base font-bold text-white">
                    {run.avgHeartRate} bpm
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#c5c9ac] group-hover:text-[#caf300] group-hover:translate-x-1 transition-all hidden md:block">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
