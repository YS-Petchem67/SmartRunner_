import React, { useState } from 'react';
import { CompletedRunSummary } from '../types';
import { ASSETS } from '../constants/assets';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: CompletedRunSummary;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  summary
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `🏃‍♂️ [SmartRunner] ${summary.distanceKm}km 러닝 완료!\n⏱️ 시간: ${summary.durationFormatted}\n⚡ 평균 페이스: ${summary.avgPaceFormatted}/km\n❤️ 회복 점수: ${summary.recoveryScore}점\n스마트러너 날씨 기반 코칭으로 달렸습니다.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1e2020] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-5 text-[#e2e2e2]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#caf300]">share</span>
            <h2 className="font-headline text-lg font-bold text-white">러닝 결과 공유</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#c5c9ac] hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Athletic Card Preview */}
        <div className="bg-[#121414] border border-[#caf300]/40 rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.logo}
                alt="Logo"
                className="w-6 h-6 rounded-full border border-[#caf300]/50"
              />
              <span className="font-display font-extrabold text-[#caf300] tracking-tighter text-sm">
                SMARTRUNNER
              </span>
            </div>
            <span className="text-xs font-mono text-[#c5c9ac]">
              {summary.date} • {summary.timeOfDay}
            </span>
          </div>

          <div className="py-2 text-center">
            <span className="font-mono text-5xl font-extrabold text-white tracking-tight">
              {summary.distanceKm.toFixed(2)}
              <span className="text-xl text-[#caf300] ml-1">KM</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 bg-[#1e2020] rounded-lg border border-white/5 text-center">
            <div>
              <span className="text-[10px] font-mono text-[#c5c9ac] block">시간</span>
              <span className="font-mono text-sm font-bold text-white">
                {summary.durationFormatted}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#c5c9ac] block">평균 페이스</span>
              <span className="font-mono text-sm font-bold text-[#caf300]">
                {summary.avgPaceFormatted}/km
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#c5c9ac] block">회복 점수</span>
              <span className="font-mono text-sm font-bold text-white">
                {summary.recoveryScore}점
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#c5c9ac] italic text-center">
            "{summary.recoveryDescription}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-lg bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? '클립보드에 복사됨!' : '요약 텍스트 복사'}
          </button>
        </div>
      </div>
    </div>
  );
};
