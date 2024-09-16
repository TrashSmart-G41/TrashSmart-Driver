import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';
import { ThemeProvider } from '../context/ThemeContext';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter': require('./../assets/fonts/Inter-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
  <ThemeProvider>
    <UserProvider>
      
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(AuthStack)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  </UserProvider>
  </ThemeProvider>
  );
}
