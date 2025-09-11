import '@/polyfills';
import { DarkTheme, type Theme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import React, { useRef } from 'react';
import { Platform, Text, View } from 'react-native';
import { SignIn } from '@/components/sign-in';
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar';
import { authClient } from '@/lib/auth-client';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/use-color-scheme';
import { queryClient } from '@/utils/trpc';

// import App from './index'; // Removed - using Stack directly

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

function AuthenticatedApp() {
  return <Stack />;
}

function UnauthenticatedApp() {
  return (
    <View className="flex-1 justify-center bg-background p-6">
      <SignIn />
    </View>
  );
}

function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-foreground">SplashScreen</Text>
    </View>
  );
}
export default function RootLayout() {
  const hasMounted = useRef(false);
  const { colorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { data: session, isPending } = authClient.useSession();

  console.log('session', { session });
  console.log('session.user', session?.user);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded || isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <SplashScreen />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DARK_THEME}>
        <StatusBar style="light" />
        <GestureHandlerRootView className="bg-background" style={{ flex: 1 }}>
          {session?.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;
