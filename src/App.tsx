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
import GameLoadingScreen from "@/components/loading/GameLoadingScreen";
import PushNotificationHandler from "@/components/notifications/PushNotificationHandler";
import { App as CapacitorApp } from '@capacitor/app';
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
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
import Leaderboard from "./pages/Leaderboard";
import Onboarding from "./pages/Onboarding";
import OnboardingRedirect from "@/components/OnboardingRedirect";
import NotFound from "./pages/NotFound";
import './App.css';
import { useState, useEffect } from "react";
import { useAndroidOptimizations } from "@/hooks/useAndroidOptimizations";

const queryClient = new QueryClient();

function AppContent() {
  const { initializing } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  // Initialize Android optimizations
  const { isNative } = useAndroidOptimizations();

  useEffect(() => {
    // Add Android-specific classes
    if (isNative()) {
      document.body.classList.add('capacitor-app');
    }

    // Initialize Google Auth for native platforms early
    if (isNative()) {
      GoogleAuth.initialize({
        clientId: '951939133229-etgc0s5sr5ssl9g4d3goikcn97ontdkc.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true
      }).catch(err => console.error('Google Auth global init error:', err));
    }

    // Show splash screen for minimum 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Listen for deep links (Supabase Auth Callback)
    CapacitorApp.addListener('appUrlOpen', async ({ url }) => {
      console.log('App URL Open:', url);
      // Handle Supabase OAuth callback
      // Expected URL: app.lovable.d5f1b9ecc305468bbb34bfdc9b510b2a://login-callback?code=...
      if (url.includes('code=') || url.includes('access_token=') || url.includes('refresh_token=')) {
        try {
          // Extract the search parameters (query string)
          const urlObj = new URL(url);
          const params = new URLSearchParams(urlObj.search); // ?code=...
          const code = params.get('code');

          if (code) {
            console.log('Detected auth code, exchanging for session...');
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
              console.error('Error exchanging code for session:', error);
            } else {
              console.log('Session established successfully:', data.session?.user?.email);
              // Force a faster redirect/refresh if needed, but context should pick it up
            }
          } else if (url.includes('#')) {
            // Determine if it is implicit flow (fragment) - standard Supabase hash handling
            const { data, error } = await supabase.auth.getSession();
            if (error) {
              console.error('Error getting session from URL fragment:', error);
            }
          }
        } catch (e) {
          console.error('Error processing deep link:', e);
        }
      }
    });

    return () => clearTimeout(timer);
  }, [isNative]);

  if (showSplash || initializing) {
    return <GameLoadingScreen message={initializing ? "Initializing..." : "Codio"} />;
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
          <Route path="hints" element={
            <ProtectedRoute feature="the hint store">
              <HintStore />
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
            <ProtectedRoute feature="mastery">
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
          <Route path="code-result" element={
            <ProtectedRoute>
              <CodeResult />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GameProvider>
          <RewardsProvider>
            <HeartsProvider>
              <StreakProvider>
                <DailyGoalsProvider>
                  <AchievementsProvider>
                    <TooltipProvider>
                      <Toaster />
                      <PushNotificationHandler />
                      <AppContent />
                    </TooltipProvider>
                  </AchievementsProvider>
                </DailyGoalsProvider>
              </StreakProvider>
            </HeartsProvider>
          </RewardsProvider>
        </GameProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
