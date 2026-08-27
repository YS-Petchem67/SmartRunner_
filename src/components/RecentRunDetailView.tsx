import React from 'react';
import { CompletedRunSummary, UserProfile } from '../types';

interface RecentRunDetailViewProps {
  summary: CompletedRunSummary;
  userProfile: UserProfile;
  onReturnHome: () => void;
  returnTab?: 'home' | 'stats';
}

const getHeartRateZone = (avgHeartRate: number) => {
  const zones = [
    {
      zone: 1,
      label: 'Zone 1',
      color: 'sky',
      range: '110~128 bpm',
      name: '회복 러닝',
      description: '가볍게 몸을 풀어주는 회복 단계로, 최대 심박수의 50~60%.',
      benefit: '기초 체력과 지구력 향상'
    },
    {
      zone: 2,
      label: 'Zone 2',
      color: 'emerald',
      range: '129~144 bpm',
      name: '유산소 기초',
      description: '안정적인 유산소 지구력 구간으로, 최대 심박수의 60~70%.',
      benefit: '지속 가능한 에너지 대사 개선'
    },
    {
      zone: 3,
      label: 'Zone 3',
      color: 'amber',
      range: '145~158 bpm',
      name: '템포 훈련',
      description: '기본 템포 구간으로, 최대 심박수의 70~80%. 효율적인 훈련.',
      benefit: '무산소 역치 향상 및 페이스 안정성'
    },
    {
      zone: 4,
      label: 'Zone 4',
      color: 'orange',
      range: '159~172 bpm',
      name: '젖산 역치',
      description: '강한 부담 구간으로, 최대 심박수의 80~90%. 속도와 강도 조절 필요.',
      benefit: '고강도 성능 향상 및 빠른 페이스 적응'
    },
    {
      zone: 5,
      label: 'Zone 5',
      color: 'red',
      range: '173+ bpm',
      name: '최대 노력',
      description: '고강도 최대 출력 구간으로, 최대 심박수의 90~100%.',
      benefit: '최대 산소 섭취량(VO2 Max) 향상'
    }
  ];

  if (avgHeartRate <= 128) return zones[0];
  if (avgHeartRate <= 144) return zones[1];
  if (avgHeartRate <= 158) return zones[2];
  if (avgHeartRate <= 172) return zones[3];
  return zones[4];
};

export const RecentRunDetailView: React.FC<RecentRunDetailViewProps> = ({
  summary,
  userProfile,
  onReturnHome,
  returnTab
}) => {
  const zoneInfo = getHeartRateZone(summary.avgHeartRate || 0);

  const getZoneGradientClass = (color: string) => {
    switch (color) {
      case 'sky':
        return 'bg-gradient-to-br from-sky-500 to-blue-600';
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-500 to-green-600';
      case 'amber':
        return 'bg-gradient-to-br from-amber-500 to-yellow-600';
      case 'orange':
        return 'bg-gradient-to-br from-orange-500 to-red-600';
      case 'red':
        return 'bg-gradient-to-br from-red-500 to-red-700';
      default:
        return 'bg-gradient-to-br from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#121414] text-[#e2e2e2] font-sans z-50 overflow-y-auto">
      {/* Fixed Header with Close Button */}
      <header className="sticky top-0 z-50 bg-[#121414] border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#c5c9ac]">최근 러닝 분석</p>
            <h1 className="font-headline text-xl font-extrabold text-white mt-1">{userProfile.name}의 최신 러닝 리포트</h1>
          </div>
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 bg-[#caf300] text-[#171e00] hover:bg-[#b0d500] active:scale-95 rounded-lg px-4 py-2 text-xs font-mono font-bold uppercase transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-base">close</span>
            닫기
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="max-w-4xl mx-auto px-5 py-6 flex flex-col gap-5 pb-10">
        {/* Hero: Zone Classification */}
        <section className={`${getZoneGradientClass(zoneInfo.color)} rounded-2xl p-8 text-white shadow-lg relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-90">심박 존 분류</p>
            <h2 className="font-headline text-5xl font-extrabold mt-2">{zoneInfo.label}</h2>
            <p className="text-lg font-bold mt-1">{zoneInfo.name}</p>
            <p className="text-sm font-mono mt-3 opacity-95">{zoneInfo.range}</p>
            <p className="text-sm mt-4 leading-relaxed max-w-lg">{zoneInfo.description}</p>
            <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 w-fit">
              <span className="material-symbols-outlined text-lg">star</span>
              <span className="font-semibold">{zoneInfo.benefit}</span>
            </div>
          </div>
        </section>

        {/* Primary Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1e2020] border border-white/10 rounded-xl p-5 shadow-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5c9ac]">총 거리</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-mono text-4xl font-extrabold text-white">{summary.distanceKm.toFixed(2)}</span>
              <span className="font-mono text-sm text-[#c5c9ac] mb-1">km</span>
            </div>
          </div>

          <div className="bg-[#1e2020] border border-white/10 rounded-xl p-5 shadow-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5c9ac]">총 시간</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-mono text-4xl font-extrabold text-white">{summary.durationFormatted}</span>
            </div>
          </div>

          <div className="bg-[#1e2020] border border-white/10 rounded-xl p-5 shadow-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5c9ac]">1km당 페이스</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-mono text-4xl font-extrabold text-[#caf300]">{summary.avgPaceFormatted}</span>
              <span className="font-mono text-sm text-[#c5c9ac] mb-1">/km</span>
            </div>
          </div>

          <div className="bg-[#1e2020] border border-white/10 rounded-xl p-5 shadow-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5c9ac]">평균 케이던스</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-mono text-4xl font-extrabold text-white">{summary.cadenceAvg}</span>
              <span className="font-mono text-sm text-[#c5c9ac] mb-1">spm</span>
            </div>
          </div>
        </section>

        {/* Bio Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#2A2E35] border border-white/10 rounded-xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5c9ac]">평균 심박수</p>
              <span className="material-symbols-outlined text-[#ff6b6b] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-mono text-4xl font-extrabold text-white">{summary.avgHeartRate}</span>
              <span className="font-mono text-sm text-[#c5c9ac] mb-1">bpm</span>
            </div>
            <p className="text-xs text-[#c5c9ac] mt-3">
              최대 심박수의 약 {Math.round((summary.avgHeartRate / 190) * 100)}%에 해당하는 강도
            </p>
          </div>

          <div className="bg-[#2A2E35] border border-white/10 rounded-xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5c9ac]">칼로리 소모</p>
              <span className="material-symbols-outlined text-[#ffd93d] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-mono text-4xl font-extrabold text-white">{summary.calories}</span>
              <span className="font-mono text-sm text-[#c5c9ac] mb-1">kcal</span>
            </div>
            <p className="text-xs text-[#c5c9ac] mt-3">
              거리당 약 {(summary.calories / summary.distanceKm).toFixed(0)} kcal/km
            </p>
          </div>
        </section>

        {/* Comprehensive Evaluation */}
        <section className="bg-[#1e2020] border border-white/10 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#caf300] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              insights
            </span>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c5c9ac]">종합 평가</p>
          </div>

          <h3 className="font-headline text-lg font-bold text-white mb-3">
            이번 러닝은 <span className="text-[#caf300]">{zoneInfo.label}</span> ({zoneInfo.name}) 구간의 훈련이었습니다.
          </h3>

          <div className="space-y-3 text-sm text-[#c6c6ca] leading-relaxed">
            <p>
              • <span className="text-[#caf300] font-semibold">운동 강도</span>: 평균 심박수 {summary.avgHeartRate} bpm으로 안정적인 구간 내에서 훈련했습니다.
            </p>
            <p>
              • <span className="text-[#caf300] font-semibold">러닝 효율성</span>: 평균 케이던스 {summary.cadenceAvg} spm, 페이스 {summary.avgPaceFormatted}/km로 
              {summary.cadenceAvg >= 170 && summary.cadenceAvg <= 180
                ? ' 최적의 리듬을 유지했습니다.'
                : summary.cadenceAvg < 170
                ? ' 보폭을 줄이고 더 빠른 스트라이드를 권장합니다.'
                : ' 보폭을 늘려서 더 여유 있는 리듬을 권장합니다.'}
            </p>
            <p>
              • <span className="text-[#caf300] font-semibold">거리 및 시간</span>: {summary.distanceKm.toFixed(2)} km를 {summary.durationFormatted} 동안 완주하며
              총 {summary.calories} kcal을 소모했습니다.
            </p>
            <p>
              • <span className="text-[#caf300] font-semibold">다음 훈련 제안</span>:
              {zoneInfo.zone === 1 && ' 기초 체력이 좋으니, 다음 러닝에서 더 높은 강도(Zone 2~3)를 시도해보세요.'}
              {zoneInfo.zone === 2 && ' 안정적인 지구력 훈련이었습니다. 주 1~2회 더 높은 강도 훈련(Zone 3~4)을 추가하세요.'}
              {zoneInfo.zone === 3 && ' 효율적인 템포 훈련으로, 목표 페이스 유지에 성공했습니다. 계속 유지하세요.'}
              {zoneInfo.zone === 4 && ' 고강도 훈련이었습니다. 충분한 회복 시간을 갖고, 다음 훈련에서는 약간 낮은 강도로 조절하세요.'}
              {zoneInfo.zone === 5 && ' 최대 출력에 가까운 훈련이었습니다. 2~3일 충분한 회복을 거친 후, 다음 고강도 훈련을 실시하세요.'}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
