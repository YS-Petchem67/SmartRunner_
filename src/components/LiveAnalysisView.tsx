import React, { useEffect, useState } from 'react';
import { ASSETS } from '../constants/assets';
import { LiveRunMetrics } from '../types';

interface LiveAnalysisViewProps {
  metrics: LiveRunMetrics;
  onFinishRun: () => void;
  onBackToMetrics: () => void;
}

export const LiveAnalysisView: React.FC<LiveAnalysisViewProps> = ({
  metrics,
  onFinishRun,
  onBackToMetrics
}) => {
  // Live subtle fluctuation for bar graphs to feel alive
  const [bars, setBars] = useState([40, 55, 65, 72, 85, 96]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars([
        Math.min(100, Math.max(30, 40 + (Math.random() * 8 - 4))),
        Math.min(100, Math.max(40, 55 + (Math.random() * 8 - 4))),
        Math.min(100, Math.max(50, 65 + (Math.random() * 10 - 5))),
        Math.min(100, Math.max(55, 70 + (Math.random() * 10 - 5))),
        Math.min(100, Math.max(75, 85 + (Math.random() * 6 - 3))),
        Math.min(100, Math.max(88, 98 + (Math.random() * 4 - 2)))
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const cadenceDiff = metrics.cadence - metrics.targetCadence; // e.g. 175 - 180 = -5
  const cadenceProgressPercent = Math.min(100, (metrics.cadence / metrics.targetCadence) * 100);

  return (
    <div className="bg-[#121414] text-[#e2e2e2] min-h-screen flex flex-col font-sans select-none pb-32">
      {/* TopAppBar */}
      <header className="bg-[#121414] border-b border-white/10 flex justify-between items-center w-full px-5 h-16 max-w-xl mx-auto z-10 shrink-0">
        <button
          onClick={onBackToMetrics}
          className="flex items-center gap-2 text-[#caf300] hover:opacity-80 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span className="font-display text-xl font-extrabold tracking-tighter uppercase">
            SmartRunner
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMetrics}
            className="text-xs font-mono text-[#caf300] bg-[#caf300]/10 px-2.5 py-1 rounded-full border border-[#caf300]/30"
          >
            페이스 모드
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#333535] border border-white/10">
            <img
              src={ASSETS.femaleRunnerAvatar}
              alt="Runner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 overflow-y-auto w-full max-w-xl mx-auto px-5 py-4 flex flex-col gap-4">
        {/* Live Heart Rate Module */}
        <section className="bg-[#1a1c1c] rounded-xl border border-white/5 p-5 flex flex-col gap-2 relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1">
              <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider">
                실시간 심박수
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-5xl font-extrabold text-[#caf300]">
                  {metrics.heartRate}
                </span>
                <span className="font-mono text-xs font-bold text-[#b0d500]">
                  BPM
                </span>
              </div>
            </div>

            <div className="bg-[#caf300]/20 text-[#caf300] font-mono text-xs font-bold px-3 py-1.5 rounded-full border border-[#caf300]/30 flex items-center gap-1.5 shadow-[0_0_15px_rgba(202,243,0,0.18)]">
              <span
                className="material-symbols-outlined text-sm text-[#caf300]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
              <span>최적 구간</span>
            </div>
          </div>

          {/* Simulated Graph Area */}
          <div className="h-32 w-full mt-3 relative z-10 flex items-end justify-between gap-1.5">
            {bars.map((height, i) => {
              const isHigh = i >= 4;
              return (
                <div
                  key={i}
                  className={`w-full rounded-t transition-all duration-700 ${
                    isHigh
                      ? i === 5
                        ? 'bg-[#caf300] shadow-[0_0_10px_rgba(202,243,0,0.5)]'
                        : 'bg-[#b0d500]'
                      : 'bg-[#333535]'
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
              );
            })}

            {/* Target Zone Overlay lines */}
            <div className="absolute w-full h-[30%] top-[12%] border-y border-dashed border-[#caf300]/30 bg-[#caf300]/5 pointer-events-none rounded"></div>
          </div>
        </section>

        {/* Cadence Meter Module */}
        <section className="bg-[#1a1c1c] rounded-xl border border-white/5 p-5 flex flex-col gap-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase flex items-center gap-2 tracking-wider">
              <span
                className="material-symbols-outlined text-base text-[#c5c9ac]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                footprint
              </span>
              케이던스
            </h2>
            <span className="font-mono text-xs font-bold text-[#c5c9ac]">
              목표: {metrics.targetCadence}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl font-extrabold text-white">
                  {metrics.cadence}
                </span>
                <span className="font-mono text-xs font-bold text-[#c5c9ac]">
                  SPM
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-[#ffb4ab]">
                {cadenceDiff > 0 ? `+${cadenceDiff}` : cadenceDiff}
              </span>
            </div>

            {/* Gauge Progress Bar */}
            <div className="w-full h-2.5 bg-[#333535] rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-[#e2e2e2] rounded-full transition-all duration-500"
                style={{ width: `${cadenceProgressPercent}%` }}
              ></div>
              {/* Target Marker */}
              <div className="absolute top-0 h-full w-1.5 bg-[#caf300] right-0 shadow-[0_0_8px_#caf300]"></div>
            </div>
          </div>
        </section>

        {/* Form Feedback & Tips Module */}
        <section className="flex flex-col gap-3">
          {/* Alert Feedback */}
          <div className="bg-[#1e2020] border-l-4 border-[#ff5555] p-4 rounded-r-xl rounded-l-sm flex items-start gap-3 shadow-md">
            <span
              className="material-symbols-outlined text-[#ffb4ab] text-xl mt-0.5 shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-mono text-xs font-bold text-[#ffb4ab] uppercase tracking-wider">
                자세 알림
              </h3>
              <p className="text-sm text-[#e2e2e2] leading-relaxed">
                케이던스가 약간 낮습니다. 무릎에 가해지는 충격을 줄이기 위해 보폭을 좁히고 발놀림을 빠르게 해보세요.
              </p>
            </div>
          </div>

          {/* Real-time Tip */}
          <div className="bg-[#1a1c1c] border border-white/5 p-4 rounded-xl flex items-start gap-3 shadow-md">
            <span
              className="material-symbols-outlined text-[#caf300] text-xl mt-0.5 shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider">
                부상 방지
              </h3>
              <p className="text-sm text-[#e2e2e2] leading-relaxed">
                현재 구간에서 피로가 쌓이기 시작할 수 있습니다. 코어에 힘을 주고 상체를 곧게 유지하세요.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Contextual Floating Action Button (Exercise Stop) */}
      <div className="fixed bottom-0 w-full left-0 p-5 pb-8 bg-gradient-to-t from-[#121414] via-[#121414]/90 to-transparent z-40 flex justify-center">
        <button
          onClick={onFinishRun}
          className="bg-[#93000a] hover:bg-[#a8000c] text-[#ffdad6] font-mono text-xs font-bold uppercase px-8 py-4 rounded-full shadow-[0_0_20px_rgba(147,0,10,0.4)] flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stop_circle
          </span>
          운동 종료
        </button>
      </div>
    </div>
  );
};
