import { useFonts } from 'expo-font';
import { ExpoRoot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import Head from "expo-router/head";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    // Add your custom fonts here if needed
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Setup the auth context and render our layout inside of it.
  return (
    <Head.Provider>
      <ExpoRoot context={require.context("./app", true)} location="/" />
    </Head.Provider>
  );
}