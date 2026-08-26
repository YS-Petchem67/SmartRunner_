import React from 'react';
import { WeatherConditions } from '../types';
import { calculateRunningIndex } from '../utils/runningCalculator';

interface WeatherSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather: WeatherConditions;
  onUpdateWeather: (newWeather: WeatherConditions) => void;
}

export const WeatherSimulationModal: React.FC<WeatherSimulationModalProps> = ({
  isOpen,
  onClose,
  weather,
  onUpdateWeather
}) => {
  if (!isOpen) return null;

  const preview = calculateRunningIndex(weather);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1e2020] border border-white/15 rounded-2xl p-6 w-full max-w-lg shadow-2xl flex flex-col gap-5 text-[#e2e2e2]">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#caf300]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              tune
            </span>
            <h2 className="font-headline text-lg font-bold text-white">
              날씨 환경 시뮬레이터
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#c5c9ac] hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Real-time Preview Banner */}
        <div className="bg-[#2A2E35] border border-[#caf300]/30 rounded-xl p-4 flex items-center justify-between shadow-inner">
          <div>
            <span className="font-mono text-xs text-[#c5c9ac] uppercase">
              실시간 산출 러닝지수
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-extrabold text-[#caf300]">
                {preview.indexScore}점
              </span>
              <span className="font-mono text-xs font-bold text-[#b0d500]">
                ({preview.indexLabel})
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs text-[#c5c9ac] uppercase">
              보정 권장 페이스
            </span>
            <div className="font-mono text-2xl font-extrabold text-white">
              {preview.recommendedPaceFormatted} <span className="text-xs text-[#c5c9ac]">/km</span>
            </div>
          </div>
        </div>

        {/* Sliders Form */}
        <div className="flex flex-col gap-4">
          {/* Temperature */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#c5c9ac]">기온 (Temperature)</span>
              <span className="text-[#caf300] font-bold">{weather.temperature}°C</span>
            </div>
            <input
              type="range"
              min={-5}
              max={38}
              value={weather.temperature}
              onChange={(e) =>
                onUpdateWeather({
                  ...weather,
                  temperature: parseInt(e.target.value)
                })
              }
              className="accent-[#caf300] w-full cursor-pointer h-2 bg-[#333535] rounded-lg"
            />
          </div>

          {/* Humidity */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#c5c9ac]">습도 (Humidity)</span>
              <span className="text-[#caf300] font-bold">{weather.humidity}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={95}
              value={weather.humidity}
              onChange={(e) =>
                onUpdateWeather({
                  ...weather,
                  humidity: parseInt(e.target.value)
                })
              }
              className="accent-[#caf300] w-full cursor-pointer h-2 bg-[#333535] rounded-lg"
            />
          </div>

          {/* Wind Speed */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#c5c9ac]">풍속 (Wind Speed)</span>
              <span className="text-[#caf300] font-bold">{weather.windSpeed} km/h</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              value={weather.windSpeed}
              onChange={(e) =>
                onUpdateWeather({
                  ...weather,
                  windSpeed: parseInt(e.target.value)
                })
              }
              className="accent-[#caf300] w-full cursor-pointer h-2 bg-[#333535] rounded-lg"
            />
          </div>

          {/* Air Quality */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-[#c5c9ac]">
              대기질 / 미세먼지 (Air Quality)
            </label>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              {(['Good', 'Moderate', 'Unhealthy'] as const).map((aq) => (
                <button
                  key={aq}
                  type="button"
                  onClick={() => onUpdateWeather({ ...weather, airQuality: aq })}
                  className={`py-2 rounded-lg border transition-all ${
                    weather.airQuality === aq
                      ? 'bg-[#caf300] text-[#171e00] font-bold border-[#caf300]'
                      : 'bg-[#282a2b] text-[#c5c9ac] border-white/10 hover:border-white/20'
                  }`}
                >
                  {aq === 'Good' ? '좋음 (Good)' : aq === 'Moderate' ? '보통 (Moderate)' : '나쁨 (Unhealthy)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
          <button
            onClick={() =>
              onUpdateWeather({
                temperature: 22,
                humidity: 45,
                windSpeed: 5,
                airQuality: 'Good',
                weatherDesc: '쾌적하고 맑음'
              })
            }
            className="px-4 py-2.5 rounded-lg border border-white/10 text-[#c5c9ac] hover:text-white text-xs font-mono"
          >
            기본값 복원
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-[#caf300] hover:bg-[#b0d500] text-[#171e00] font-mono text-xs font-bold uppercase shadow-md"
          >
            적용 완료
          </button>
        </div>
      </div>
    </div>
  );
};
