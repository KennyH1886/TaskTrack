import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // Ensure "index" is used here to match `index.tsx`
        options={{ title: 'To-Do List' }}
      />
    </Stack>
  );
}
