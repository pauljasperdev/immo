import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Drawer } from 'expo-router/drawer';
import { NAV_THEME } from '@/lib/constants';

export default function HomeDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: NAV_THEME.dark.background,
          width: 280,
        },
        drawerContentStyle: {
          backgroundColor: NAV_THEME.dark.background,
        },
        drawerActiveTintColor: NAV_THEME.dark.primary,
        drawerInactiveTintColor: NAV_THEME.dark.mutedForeground,
        headerStyle: {
          backgroundColor: NAV_THEME.dark.background,
        },
        headerTintColor: NAV_THEME.dark.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <FontAwesome color={color} name="home" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="second"
        options={{
          title: 'Second',
          drawerIcon: ({ color, size }) => (
            <FontAwesome color={color} name="compass" size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
