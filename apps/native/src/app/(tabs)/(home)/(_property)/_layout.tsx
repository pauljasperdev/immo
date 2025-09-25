import { Stack } from 'expo-router';

export default function PropertyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
