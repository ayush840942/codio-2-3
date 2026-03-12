import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { GameProvider } from "@/context/GameContext";
import { RewardsProvider } from "@/context/RewardsContext";
import { HeartsProvider } from "@/context/HeartsContext";
import { StreakProvider } from "@/context/StreakContext";
import { DailyGoalsProvider } from "@/context/DailyGoalsContext";
import { AchievementsProvider } from "@/context/AchievementsContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MobileOptimizedLayout from "@/components/MobileOptimizedLayout";
import AppLoadingScreen from "@/components/loading/AppLoadingScreen";
import PushNotificationHandler from "@/components/notifications/PushNotificationHandler";
import { BackgroundMusic } from "@/components/audio/BackgroundMusic";
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Daily from "./pages/Daily";
import Puzzle from "./pages/Puzzle";
import LevelMap from "./pages/LevelMap";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import HintStore from "./pages/HintStore";
import Build from "./pages/Build";
import CodeResult from "./pages/CodeResult";
import SubscriptionPage from "./pages/SubscriptionPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import Referrals from "./pages/Referrals";
import Mastery from "./pages/Mastery";
import Memo from "./pages/Memo";
import Playground from "./pages/Playground";
import CodeBuilder from "./pages/CodeBuilder";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import Leaderboard from "./pages/Leaderboard";
import Onboarding from "./pages/Onboarding";
import OnboardingRedirect from "@/components/OnboardingRedirect";
import Leagues from "./pages/Leagues";
import NotFound from "./pages/NotFound";
import PortfolioHub from "./pages/PortfolioHub";
import ProjectPlayer from "./pages/ProjectPlayer";
import CareerHub from "./pages/CareerHub";
import PublicProfile from "./pages/PublicProfile";
import './App.css';
import { useState, useEffect } from "react";
import { useAndroidOptimizations } from "@/hooks/useAndroidOptimizations";
import { AIMentorButton } from "@/components/ai/AIMentorPanel";

const queryClient = new QueryClient();

function AppContent() {
  const { initializing } = useAuth();
  // Initialize Android optimizations
  const { isNative } = useAndroidOptimizations();

  useEffect(() => {
    // Initialize sound effects on first user interaction to satisfy browser policies
    const initAudio = async () => {
      const { soundEffects } = await import('@/utils/soundEffects');
      await soundEffects.init();
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);

    // Initialize native-specific features
    if (isNative()) {
      document.body.classList.add('capacitor-app');

      // 1. Immersive Edge-to-Edge System Bars
      StatusBar.setOverlaysWebView({ overlay: true }).catch(err => console.error('StatusBar overlay error:', err));
      StatusBar.setStyle({ style: Style.Light }).catch(err => console.error('StatusBar style error:', err));

      // 2. Google Auth Global Initialization
      // We initialize for ALL platforms to ensure the bridge is ready and tokens work correctly.
      console.log('Initializing GoogleAuth (universal)...');
      GoogleAuth.initialize({
        clientId: '951939133229-etgc0s5sr5ssl9g4d3goikcn97ontdkc.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      }).catch(err => console.error('Google Auth init error:', err));
    }

    // Listen for deep links (Firebase handles its own, so we only use this for custom app logic)
    CapacitorApp.addListener('appUrlOpen', async ({ url }) => {
      console.log('App URL Open:', url);
    });
  }, [isNative]);

  if (initializing) {
    return <AppLoadingScreen message="Initializing Codio..." />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<OnboardingRedirect />}>
          <Route index element={
            <ProtectedRoute allowGuest={true} feature="the home page">
              <Index />
            </ProtectedRoute>
          } />
          <Route path="daily" element={
            <ProtectedRoute allowGuest={true} feature="daily challenges">
              <Daily />
            </ProtectedRoute>
          } />
          <Route path="levels" element={
            <ProtectedRoute allowGuest={true} feature="all levels">
              <LevelMap />
            </ProtectedRoute>
          } />
          <Route path="puzzle/:id" element={
            <ProtectedRoute feature="puzzles">
              <Puzzle />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute feature="your profile">
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="leaderboard" element={
            <ProtectedRoute feature="the leaderboard">
              <Leaderboard />
            </ProtectedRoute>
          } />
          <Route path="leagues" element={
            <ProtectedRoute allowGuest={true} feature="leagues">
              <Leagues />
            </ProtectedRoute>
          } />
          <Route path="hints" element={
            <ProtectedRoute feature="the hint store">
              <HintStore />
            </ProtectedRoute>
          } />
          <Route path="portfolio" element={
            <ProtectedRoute allowGuest={true} feature="portfolio projects">
              <PortfolioHub />
            </ProtectedRoute>
          } />
          <Route path="career" element={
            <ProtectedRoute allowGuest={true} feature="career hub">
              <CareerHub />
            </ProtectedRoute>
          } />
          <Route path="public-profile-preview" element={
            <ProtectedRoute feature="public profile">
              <PublicProfile />
            </ProtectedRoute>
          } />
          <Route path="p/:id" element={<PublicProfile />} />
          <Route path="project/:id" element={
            <ProtectedRoute allowGuest={true} feature="project builder">
              <ProjectPlayer />
            </ProtectedRoute>
          } />
          <Route path="build" element={
            <ProtectedRoute>
              <Build />
            </ProtectedRoute>
          } />
          <Route path="referrals" element={
            <ProtectedRoute>
              <Referrals />
            </ProtectedRoute>
          } />
          <Route path="mastery" element={
            <ProtectedRoute allowGuest={true} feature="mastery">
              <Mastery />
            </ProtectedRoute>
          } />
          <Route path="memo" element={
            <ProtectedRoute feature="memos" featureKey="memos">
              <Memo />
            </ProtectedRoute>
          } />
          <Route path="playground" element={
            <ProtectedRoute feature="playground" featureKey="playground">
              <Playground />
            </ProtectedRoute>
          } />
          <Route path="code-builder" element={
            <ProtectedRoute feature="codeBuilder" featureKey="codeBuilder">
              <CodeBuilder />
            </ProtectedRoute>
          } />
          <Route path="subscription" element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="help" element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          } />
          <Route path="admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="code-result" element={
            <ProtectedRoute>
              <CodeResult />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AIMentorButton />
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RewardsProvider>
          <GameProvider>
            <HeartsProvider>
              <StreakProvider>
                <DailyGoalsProvider>
                  <AchievementsProvider>
                    <TooltipProvider>
                      <Toaster />
                      <PushNotificationHandler />
                      <BackgroundMusic />
                      <AppContent />
                    </TooltipProvider>
                  </AchievementsProvider>
                </DailyGoalsProvider>
              </StreakProvider>
            </HeartsProvider>
          </GameProvider>
        </RewardsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
