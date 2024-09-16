import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetStarted" />
      <Stack.Screen name="SignUpPhone" />
      <Stack.Screen name="ConfirmPhone" />
      <Stack.Screen name="Success" />
      <Stack.Screen name="Details" />
      <Stack.Screen name="Address" />
      <Stack.Screen name="ProfilePhoto" />
      <Stack.Screen name="Notifications" />
      <Stack.Screen name="LoginOrSignup" />
      <Stack.Screen name="SignUpEmail" />
    </Stack>
  );
}
