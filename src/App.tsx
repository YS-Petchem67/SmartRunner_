import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardView } from './components/DashboardView';
import { ActiveRunView } from './components/ActiveRunView';
import { LiveAnalysisView } from './components/LiveAnalysisView';
import { WorkoutSummaryView } from './components/WorkoutSummaryView';
import { StatsHistoryView } from './components/StatsHistoryView';
import { ProfileView } from './components/ProfileView';
import { WeatherSimulationModal } from './components/WeatherSimulationModal';
import { ShareModal } from './components/ShareModal';
import {
  WeatherConditions,
  LiveRunMetrics,
  CompletedRunSummary,
  UserProfile
} from './types';
import {
  INITIAL_WEATHER,
  INITIAL_PROFILE,
  SAMPLE_RUN_HISTORY,
  ASSETS
} from './constants/assets';
import {
  calculateRunningIndex,
  formatPace,
  formatTime
} from './utils/runningCalculator';

export default function App() {
  // Navigation & Screen states
  const [currentTab, setCurrentTab] = useState<'home' | 'stats' | 'profile'>('home');
  const [appMode, setAppMode] = useState<'dashboard' | 'active_run' | 'live_analysis' | 'workout_summary'>('dashboard');

  // Weather state
  const [weather, setWeather] = useState<WeatherConditions>(INITIAL_WEATHER);
  const recommendation = calculateRunningIndex(weather);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);

  // Run History
  const [runHistory, setRunHistory] = useState<CompletedRunSummary[]>(SAMPLE_RUN_HISTORY);

  // Active Run Metrics
  const [liveMetrics, setLiveMetrics] = useState<LiveRunMetrics>({
    isActive: false,
    isPaused: false,
    elapsedSeconds: 942, // default starts at ~15:42 for realistic preview as in screenshot 2
    distanceKm: 2.85,
    currentPaceSec: 325, // 5'25"
    currentPaceFormatted: "5 ' 25\"",
    heartRate: 152,
    cadence: 175,
    targetCadence: 180,
    caloriesBurned: 188,
    elevationGain: 24,
    routeCoordinates: []
  });

  // Current completed workout summary
  const [currentSummary, setCurrentSummary] = useState<CompletedRunSummary>(SAMPLE_RUN_HISTORY[0]);

  // Modals
  const [weatherModalOpen, setWeatherModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Live Timer Ref
  const timerRef = useRef<number | null>(null);

  // Live simulation tick when running
  useEffect(() => {
    if (appMode === 'active_run' || appMode === 'live_analysis') {
      timerRef.current = window.setInterval(() => {
        setLiveMetrics((prev) => {
          if (prev.isPaused) return prev;

          const nextSec = prev.elapsedSeconds + 1;
          // Random slight speed variation around target
          const paceDelta = Math.sin(nextSec / 10) * 4;
          const currentPaceSec = Math.max(280, Math.min(380, 325 + paceDelta));
          const paceMins = Math.floor(currentPaceSec / 60);
          const paceRemainder = Math.round(currentPaceSec % 60);
          const formattedPace = `${paceMins} ' ${paceRemainder.toString().padStart(2, '0')}"`;

          // Distance increase: distance in km = seconds / paceInSecPerKm
          const addedDistance = 1 / currentPaceSec;
          const nextDist = prev.distanceKm + addedDistance;

          // Heart rate fluctuation
          const hrDelta = Math.round(Math.sin(nextSec / 6) * 3);
          const nextHR = Math.max(140, Math.min(168, 152 + hrDelta));

          // Cadence fluctuation
          const cadenceDelta = Math.round(Math.cos(nextSec / 8) * 2);
          const nextCadence = Math.max(168, Math.min(182, 175 + cadenceDelta));

          return {
            ...prev,
            elapsedSeconds: nextSec,
            distanceKm: nextDist,
            currentPaceSec: currentPaceSec,
            currentPaceFormatted: formattedPace,
            heartRate: nextHR,
            cadence: nextCadence,
            caloriesBurned: Math.round(nextDist * 65)
          };
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [appMode]);

  // Start run handler
  const handleStartRun = () => {
    setLiveMetrics({
      isActive: true,
      isPaused: false,
      elapsedSeconds: 942, // 15:42 as in prompt screenshot 2
      distanceKm: 2.85,
      currentPaceSec: 325,
      currentPaceFormatted: "5 ' 25\"",
      heartRate: 152,
      cadence: 175,
      targetCadence: 180,
      caloriesBurned: 185,
      elevationGain: 28,
      routeCoordinates: []
    });
    setAppMode('active_run');
  };

  // Pause / Resume toggle
  const handlePauseToggle = () => {
    setLiveMetrics((prev) => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  // Finish run handler
  const handleFinishRun = () => {
    const finalDist = liveMetrics.distanceKm < 4.0 ? 5.0 : parseFloat(liveMetrics.distanceKm.toFixed(2));
    const finalDuration = liveMetrics.elapsedSeconds < 1200 ? 1650 : liveMetrics.elapsedSeconds; // 27:30 default
    const finalDurationStr = formatTime(finalDuration);
    const avgPaceSec = Math.round(finalDuration / finalDist);
    const avgPaceStr = formatPace(avgPaceSec).replace('"', '');

    const newSummary: CompletedRunSummary = {
      id: `run-${Date.now()}`,
      date: '오늘',
      timeOfDay: '방금 전',
      distanceKm: finalDist,
      durationSeconds: finalDuration,
      durationFormatted: finalDurationStr,
      avgPaceFormatted: avgPaceStr,
      avgPaceSec: avgPaceSec,
      predictedPaceFormatted: '5:15',
      predictedPaceSec: 315,
      avgHeartRate: 162,
      predictedHeartRate: 150,
      elevationGainMeters: 42,
      weatherImpactPercent: weather.humidity >= 50 ? 85 : 92,
      weatherImpactDescription:
        weather.humidity >= 50
          ? `높은 습도(${weather.humidity}%)로 인해 심박수가 약 8bpm 상승했으며, 기준 대비 페이스 효율이 4% 감소했습니다.`
          : '쾌적한 기온과 안정된 습도로 목표 심박수 구간을 안정적으로 완주했습니다.',
      recoveryScore: weather.humidity >= 60 ? 82 : 90,
      recoveryDescription:
        '탁월한 심박수 회복. 신체 능력에 완벽하게 일치하는 운동 강도였습니다.',
      cadenceAvg: 176,
      calories: Math.round(finalDist * 75),
      routeMapUrl: ASSETS.completedRouteMap
    };

    setCurrentSummary(newSummary);
    setRunHistory((prev) => [newSummary, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      totalRuns: prev.totalRuns + 1,
      totalDistanceKm: parseFloat((prev.totalDistanceKm + finalDist).toFixed(1)),
      currentWeeklyKm: parseFloat((prev.currentWeeklyKm + finalDist).toFixed(1)),
      shoesMileageKm: parseFloat((prev.shoesMileageKm + finalDist).toFixed(1))
    }));

    setAppMode('workout_summary');
  };

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] flex flex-col font-sans relative selection:bg-[#caf300] selection:text-[#171e00]">
      {/* Top Header - Shown when in regular tab navigation */}
      {appMode === 'dashboard' && (
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
          }}
          userProfile={userProfile}
          onOpenWeatherModal={() => setWeatherModalOpen(true)}
        />
      )}

      {/* Main Tab Content based on appMode and currentTab */}
      {appMode === 'dashboard' && currentTab === 'home' && (
        <DashboardView
          weather={weather}
          recommendation={recommendation}
          userProfile={userProfile}
          onStartRun={handleStartRun}
          onOpenWeatherModal={() => setWeatherModalOpen(true)}
          onSelectPreset={(preset) => setWeather((prev) => ({ ...prev, ...preset }))}
        />
      )}

      {appMode === 'dashboard' && currentTab === 'stats' && (
        <StatsHistoryView
          history={runHistory}
          onSelectRun={(run) => {
            setCurrentSummary(run);
            setAppMode('workout_summary');
          }}
        />
      )}

      {appMode === 'dashboard' && currentTab === 'profile' && (
        <ProfileView
          userProfile={userProfile}
          onUpdateProfile={(updated) =>
            setUserProfile((prev) => ({ ...prev, ...updated }))
          }
        />
      )}

      {/* Active Run Screen (Screen 2) */}
      {appMode === 'active_run' && (
        <ActiveRunView
          metrics={liveMetrics}
          recommendation={recommendation}
          weather={weather}
          onPauseToggle={handlePauseToggle}
          onFinishRun={handleFinishRun}
          onSwitchToAnalysis={() => setAppMode('live_analysis')}
        />
      )}

      {/* Live Cadence & Heart Rate Analysis Screen (Screen 3) */}
      {appMode === 'live_analysis' && (
        <LiveAnalysisView
          metrics={liveMetrics}
          onFinishRun={handleFinishRun}
          onBackToMetrics={() => setAppMode('active_run')}
        />
      )}

      {/* Workout Summary Screen (Screen 4) */}
      {appMode === 'workout_summary' && (
        <WorkoutSummaryView
          summary={currentSummary}
          onShare={() => setShareModalOpen(true)}
          onViewDetailedStats={() => {
            setAppMode('dashboard');
            setCurrentTab('stats');
          }}
          onReturnHome={() => {
            setAppMode('dashboard');
            setCurrentTab('home');
          }}
        />
      )}

      {/* Bottom Navigation Bar (Mobile) - only visible on dashboard view */}
      {appMode === 'dashboard' && (
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
        />
      )}

      {/* Weather Simulation Modal */}
      <WeatherSimulationModal
        isOpen={weatherModalOpen}
        onClose={() => setWeatherModalOpen(false)}
        weather={weather}
        onUpdateWeather={(newWeather) => setWeather(newWeather)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        summary={currentSummary}
      />
    </div>
  );
}
