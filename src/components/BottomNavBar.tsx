import React from 'react';

interface BottomNavBarProps {
  currentTab: 'home' | 'stats' | 'profile';
  onSelectTab: (tab: 'home' | 'stats' | 'profile') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab
}) => {
  return (
    <nav className="bg-[#1a1c1c] border-t border-white/5 shadow-2xl fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2.5 pb-safe rounded-t-xl md:hidden">
      {/* Tab: Home */}
      <button
        onClick={() => onSelectTab('home')}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
          currentTab === 'home'
            ? 'bg-[#caf300] text-[#171e00] rounded-xl px-5 py-1.5 shadow-[0_0_12px_rgba(202,243,0,0.25)]'
            : 'text-[#c5c9ac] hover:text-[#caf300] px-3 py-1'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{
            fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0"
          }}
        >
          home_app_logo
        </span>
        <span className="font-mono text-[11px] font-bold mt-0.5 tracking-wider">
          홈
        </span>
      </button>

      {/* Tab: Stats */}
      <button
        onClick={() => onSelectTab('stats')}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
          currentTab === 'stats'
            ? 'bg-[#caf300] text-[#171e00] rounded-xl px-5 py-1.5 shadow-[0_0_12px_rgba(202,243,0,0.25)]'
            : 'text-[#c5c9ac] hover:text-[#caf300] px-3 py-1'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{
            fontVariationSettings: currentTab === 'stats' ? "'FILL' 1" : "'FILL' 0"
          }}
        >
          insights
        </span>
        <span className="font-mono text-[11px] font-bold mt-0.5 tracking-wider">
          통계
        </span>
      </button>

      {/* Tab: Profile */}
      <button
        onClick={() => onSelectTab('profile')}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
          currentTab === 'profile'
            ? 'bg-[#caf300] text-[#171e00] rounded-xl px-5 py-1.5 shadow-[0_0_12px_rgba(202,243,0,0.25)]'
            : 'text-[#c5c9ac] hover:text-[#caf300] px-3 py-1'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{
            fontVariationSettings: currentTab === 'profile' ? "'FILL' 1" : "'FILL' 0"
          }}
        >
          person
        </span>
        <span className="font-mono text-[11px] font-bold mt-0.5 tracking-wider">
          프로필
        </span>
      </button>
    </nav>
  );
};
