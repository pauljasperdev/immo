import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/src/components/tabbar-icon';
import { NAV_THEME } from '@/src/lib/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: NAV_THEME.dark.colors.primary,
        tabBarInactiveTintColor: NAV_THEME.dark.colors.text,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: NAV_THEME.dark.colors.background,
          borderTopColor: NAV_THEME.dark.colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="home" />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} name="compass" />
          ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="bold" />,
        }}
      />
    </Tabs>
  );
}
