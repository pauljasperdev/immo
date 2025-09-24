import { Stack } from 'expo-router';

export default function PropertyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          title: 'Create',
        }}
      />
    </Stack>
  );
}
