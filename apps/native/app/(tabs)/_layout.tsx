import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/tabbar-icon';
import { NAV_THEME } from '@/lib/constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: NAV_THEME.dark.primary,
        tabBarInactiveTintColor: NAV_THEME.dark.mutedForeground,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: NAV_THEME.dark.background,
          borderTopColor: NAV_THEME.dark.border,
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
