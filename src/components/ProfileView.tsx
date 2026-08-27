import React from 'react';
import { ASSETS } from '../constants/assets';
import { GoalPeriod, UserProfile } from '../types';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const POPULAR_RUNNING_SHOES = [
  'Nike ZoomX Vaporfly 3',
  'Nike Alphafly 2',
  'Adidas Adizero Prime X 2',
  'New Balance SuperComp Elite v2',
  'Brooks Hyperion Max',
  'Saucony Endorphin Pro 3',
  'ASICS MetaRide'
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  theme,
  onToggleTheme
}) => {
  const [goalPeriod, setGoalPeriod] = React.useState<GoalPeriod>(userProfile.goalPeriod || 'week');
  const [shoeSearchOpen, setShoeSearchOpen] = React.useState(false);
  const [shoeSearch, setShoeSearch] = React.useState('');

  const periodConfig = {
    week: {
      label: '이번 주',
      current: userProfile.currentWeeklyKm,
      target: userProfile.targetWeeklyKm,
      unit: 'km'
    },
    month: {
      label: '이번 달',
      current: userProfile.currentMonthlyKm,
      target: userProfile.targetMonthlyKm,
      unit: 'km'
    },
    year: {
      label: '올해',
      current: userProfile.currentYearlyKm,
      target: userProfile.targetYearlyKm,
      unit: 'km'
    }
  } as const;

  const activeGoal = periodConfig[goalPeriod];
  const progress = Math.min(100, (activeGoal.current / activeGoal.target) * 100);

  const metricCards = [
    {
      key: 'week' as const,
      label: '이번 주',
      current: userProfile.currentWeeklyKm,
      target: userProfile.targetWeeklyKm,
      accent: 'bg-[#caf300]/10 text-[#caf300] border-[#caf300]/30'
    },
    {
      key: 'month' as const,
      label: '이번 달',
      current: userProfile.currentMonthlyKm,
      target: userProfile.targetMonthlyKm,
      accent: 'bg-[#55d6ff]/10 text-[#55d6ff] border-[#55d6ff]/30'
    },
    {
      key: 'year' as const,
      label: '올해',
      current: userProfile.currentYearlyKm,
      target: userProfile.targetYearlyKm,
      accent: 'bg-[#ffb84d]/10 text-[#ffb84d] border-[#ffb84d]/30'
    }
  ];

  const updateGoalTarget = (nextTarget: number) => {
    if (goalPeriod === 'week') {
      onUpdateProfile({ targetWeeklyKm: nextTarget });
    } else if (goalPeriod === 'month') {
      onUpdateProfile({ targetMonthlyKm: nextTarget });
    } else {
      onUpdateProfile({ targetYearlyKm: nextTarget });
    }
  };

  const handleShoeReplacement = (shoeName: string) => {
    onUpdateProfile({
      shoesName: shoeName,
      shoesMileageKm: 0
    });
    setShoeSearchOpen(false);
    setShoeSearch('');
  };

  const filteredShoes = POPULAR_RUNNING_SHOES.filter((shoe) =>
    shoe.toLowerCase().includes(shoeSearch.toLowerCase())
  );

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-5 py-6 flex flex-col gap-6 pb-32">
      {/* Profile Header */}
      <section className="bg-[#2A2E35] border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-[#1e2020] border-2 border-[#caf300]/50 overflow-hidden shadow-[0_0_15px_rgba(202,243,0,0.2)]">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() =>
              onUpdateProfile({
                avatarUrl:
                  userProfile.avatarUrl === ASSETS.femaleRunnerAvatar
                    ? ASSETS.maleRunnerAvatar
                    : ASSETS.femaleRunnerAvatar
              })
            }
            className="absolute bottom-0 right-0 bg-[#caf300] text-[#171e00] p-1.5 rounded-full shadow hover:scale-110 active:scale-95 transition-all"
            title="프로필 사진 변경"
          >
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="font-headline text-2xl font-bold text-white">
                {userProfile.name}
              </h1>
              <span className="text-xs font-mono text-[#caf300] bg-[#caf300]/10 px-2.5 py-0.5 rounded-full border border-[#caf300]/30 inline-block mt-1">
                {userProfile.level}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={onToggleTheme}
                className="flex items-center justify-center w-9 h-9 bg-[#1e2020] hover:bg-[#282a2b] text-[#caf300] border border-white/10 hover:border-[#caf300]/40 rounded-full transition-all active:scale-95"
                title={theme === 'dark' ? '다크모드 (달 아이콘)' : '라이트모드 (해 아이콘)'}
                aria-label={theme === 'dark' ? '다크모드' : '라이트모드'}
              >
                <span className="material-symbols-outlined text-base">
                  {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                </span>
              </button>
              <span className="font-mono text-xs text-[#c5c9ac]">VO2 Max:</span>
              <span className="font-mono text-xl font-extrabold text-[#caf300]">
                {userProfile.vo2max}
              </span>
              <span className="text-xs text-[#c5c9ac]">ml/kg/min</span>
            </div>
          </div>

          <p className="text-sm text-[#c5c9ac] mt-2">
            날씨 및 생체 데이터를 기반으로 맞춤형 러닝 페이스와 자세 피드백을 수신하고 있습니다.
          </p>
        </div>
      </section>

      {/* Goal Progress */}
      <section className="bg-[#1e2020] border border-white/10 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#caf300] text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              flag
            </span>
            <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              목표 마일리지
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-[#caf300]">
            {activeGoal.current.toFixed(1)} / {activeGoal.target} km ({progress.toFixed(0)}%)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {metricCards.map((card) => {
            const cardProgress = Math.min(100, (card.current / card.target) * 100);
            const isActive = card.key === goalPeriod;

            return (
              <button
                key={card.key}
                type="button"
                onClick={() => {
                  setGoalPeriod(card.key);
                  onUpdateProfile({ goalPeriod: card.key });
                }}
                className={`rounded-xl border p-3 text-left transition-all ${
                  isActive
                    ? 'bg-[#2d3124] border-[#caf300]/60 shadow-[0_0_12px_rgba(202,243,0,0.15)]'
                    : 'bg-[#27292b] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#c5c9ac]">
                    {card.label}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-mono ${card.accent}`}>
                    {cardProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="mt-3 text-2xl font-bold text-white">
                  {card.current.toFixed(1)} <span className="text-sm text-[#c5c9ac]">km</span>
                </div>
                <div className="mt-2 text-xs text-[#c5c9ac] font-mono">
                  목표: <span className="text-[#caf300] font-bold">{card.target} km</span>
                </div>
                <div className="mt-3 h-2 bg-[#1d1f20] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#caf300] shadow-[0_0_10px_#caf300] transition-all"
                    style={{ width: `${cardProgress}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#26292b] p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-[#c5c9ac]">{periodConfig[goalPeriod].label} 목표 조정</span>
            <span className="text-xs font-mono text-[#caf300] font-bold">{activeGoal.target} km</span>
          </div>

          <input
            type="range"
            min={10}
            max={goalPeriod === 'year' ? 5000 : goalPeriod === 'month' ? 500 : 100}
            step={5}
            value={activeGoal.target}
            onChange={(e) => updateGoalTarget(Number(e.target.value))}
            className="accent-[#caf300] w-full cursor-pointer h-2 bg-[#333535] rounded-lg"
          />

          <div className="mt-2 flex justify-between text-[10px] text-[#8f9378] font-mono">
            <span>10 km</span>
            <span>{goalPeriod === 'year' ? '5000 km' : goalPeriod === 'month' ? '500 km' : '100 km'}</span>
          </div>
        </div>
      </section>

      {/* Grid: Gear & Heart Rate Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gear Tracker */}
        <section className="bg-[#2A2E35] border border-white/10 rounded-xl p-5 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-base">steps</span>
                러닝화 마일리지
              </h2>
              <span className="font-mono text-xs text-[#caf300]">교체 권장 600km</span>
            </div>
            <h3 className="text-base font-bold text-white">{userProfile.shoesName}</h3>
            <p className="text-xs text-[#c5c9ac] mt-1">
              최상의 쿠셔닝과 에너지 리턴을 유지하고 있습니다.
            </p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-[#c5c9ac]">누적 주행거리</span>
              <span className="text-white font-bold">{userProfile.shoesMileageKm} km / 600 km</span>
            </div>
            <div className="w-full h-2 bg-[#1e2020] rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#caf300] rounded-full"
                style={{ width: `${(userProfile.shoesMileageKm / 600) * 100}%` }}
              ></div>
            </div>

            {/* Shoe Replacement Button & Search */}
            <div className="space-y-2">
              <button
                onClick={() => setShoeSearchOpen(!shoeSearchOpen)}
                className="w-full bg-[#caf300] text-[#171e00] py-2 px-3 rounded-lg font-mono text-xs font-bold hover:bg-[#b3d900] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">swap_horizontal_circle</span>
                러닝화 교체
              </button>

              {/* Shoe Search Dropdown */}
              {shoeSearchOpen && (
                <div className="bg-[#1e2020] border border-[#caf300]/30 rounded-lg p-3 space-y-2">
                  <input
                    type="text"
                    placeholder="러닝화 검색..."
                    value={shoeSearch}
                    onChange={(e) => setShoeSearch(e.target.value)}
                    className="w-full bg-[#282a2b] border border-white/10 text-white text-xs px-2.5 py-1.5 rounded font-mono focus:outline-none focus:border-[#caf300]"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {filteredShoes.length > 0 ? (
                      filteredShoes.map((shoe) => (
                        <button
                          key={shoe}
                          onClick={() => handleShoeReplacement(shoe)}
                          className="w-full text-left px-3 py-1.5 bg-[#282a2b] hover:bg-[#333535] text-[#c5c9ac] hover:text-[#caf300] text-xs font-mono rounded transition-all"
                        >
                          {shoe}
                        </button>
                      ))
                    ) : (
                      <div className="text-xs text-[#c5c9ac] text-center py-2">
                        검색 결과가 없습니다
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Heart Rate Zones Target */}
        <section className="bg-[#2A2E35] border border-white/10 rounded-xl p-5 shadow-md">
          <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">favorite</span>
            개인 심박 존 (Heart Rate Zones)
          </h2>
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="flex justify-between items-center p-2 bg-[#1e2020] rounded">
              <span className="text-sky-400">Zone 1 (회복 조깅)</span>
              <span className="text-white">110 ~ 128 bpm</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1e2020] rounded">
              <span className="text-emerald-400">Zone 2 (유산소 지구력)</span>
              <span className="text-white">129 ~ 144 bpm</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1e2020] rounded border border-[#caf300]/30">
              <span className="text-[#caf300] font-bold">Zone 3 (템포 러닝 - 목표)</span>
              <span className="text-[#caf300] font-bold">145 ~ 158 bpm</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1e2020] rounded">
              <span className="text-amber-400">Zone 4 (젖산 역치)</span>
              <span className="text-white">159 ~ 172 bpm</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1e2020] rounded">
              <span className="text-red-400">Zone 5 (최대 산소 섭취)</span>
              <span className="text-white">173+ bpm</span>
            </div>
          </div>
        </section>
      </div>

      {/* AI Coach Audio Feedback Settings */}
      <section className="bg-[#1e2020] border border-white/10 rounded-xl p-5 shadow-lg flex flex-col gap-3">
        <h2 className="font-mono text-xs font-bold text-[#c5c9ac] uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#caf300]">volume_up</span>
          AI 보이스 코치 & 피드백 설정
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-[#282a2b] rounded-lg border border-white/5">
            <span className="text-white">케이던스 실시간 음성 코칭</span>
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#caf300] w-4 h-4 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-[#282a2b] rounded-lg border border-white/5">
            <span className="text-white">습도/기온 심박수 경고 알림</span>
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#caf300] w-4 h-4 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-[#282a2b] rounded-lg border border-white/5">
            <span className="text-white">1km 마다 페이스 스플릿 브리핑</span>
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#caf300] w-4 h-4 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-[#282a2b] rounded-lg border border-white/5">
            <span className="text-white">러닝 후 회복 점수 리포트</span>
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#caf300] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
