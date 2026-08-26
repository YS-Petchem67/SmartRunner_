import React from 'react';
import { ASSETS } from '../constants/assets';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: 'home' | 'stats' | 'profile';
  onSelectTab: (tab: 'home' | 'stats' | 'profile') => void;
  userProfile: UserProfile;
  onOpenWeatherModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  userProfile,
  onOpenWeatherModal
}) => {
  return (
    <header className="bg-[#121414] border-b border-white/10 w-full top-0 sticky z-50 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-5 h-16 max-w-5xl mx-auto">
        {/* Logo & Brand */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 hover:opacity-85 active:scale-95 transition-all cursor-pointer text-left group"
        >
          <img
            src={ASSETS.logo}
            alt="SmartRunner Logo"
            className="w-8 h-8 rounded-full border border-[#caf300]/30 object-cover group-hover:border-[#caf300] transition-colors"
          />
          <span className="font-display font-extrabold text-2xl tracking-tighter text-[#caf300] uppercase">
            SmartRunner
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <button
              onClick={() => onSelectTab('home')}
              className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'home'
                  ? 'text-[#caf300] bg-[#caf300]/10 border border-[#caf300]/30'
                  : 'text-[#c5c9ac] hover:text-[#caf300]'
              }`}
            >
              홈
            </button>
            <button
              onClick={() => onSelectTab('stats')}
              className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'stats'
                  ? 'text-[#caf300] bg-[#caf300]/10 border border-[#caf300]/30'
                  : 'text-[#c5c9ac] hover:text-[#caf300]'
              }`}
            >
              통계
            </button>
            <button
              onClick={() => onSelectTab('profile')}
              className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                currentTab === 'profile'
                  ? 'text-[#caf300] bg-[#caf300]/10 border border-[#caf300]/30'
                  : 'text-[#c5c9ac] hover:text-[#caf300]'
              }`}
            >
              프로필
            </button>
          </nav>
        </div>

        {/* Right Action Icons: Weather simulation toggle & Profile Avatar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWeatherModal}
            title="날씨 환경 시뮬레이션 설정"
            className="flex items-center gap-1.5 text-xs font-mono bg-[#1e2020] hover:bg-[#282a2b] text-[#caf300] border border-white/10 hover:border-[#caf300]/40 px-2.5 py-1.5 rounded-full transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span className="hidden sm:inline">날씨 변경</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className="w-10 h-10 rounded-full bg-[#282a2b] border border-white/10 overflow-hidden cursor-pointer hover:opacity-85 transition-opacity relative group"
            title="프로필 보기"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
