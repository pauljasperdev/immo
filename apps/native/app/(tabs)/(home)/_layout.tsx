import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/lib/use-color-scheme';

export default function HomeDrawerLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: isDarkColorScheme
            ? 'hsl(222.2 84% 4.9%)'
            : 'hsl(0 0% 100%)',
          width: 280,
        },
        drawerContentStyle: {
          backgroundColor: isDarkColorScheme
            ? 'hsl(222.2 84% 4.9%)'
            : 'hsl(0 0% 100%)',
        },
        drawerActiveTintColor: isDarkColorScheme
          ? 'hsl(217.2 91.2% 59.8%)'
          : 'hsl(221.2 83.2% 53.3%)',
        drawerInactiveTintColor: isDarkColorScheme
          ? 'hsl(215 20.2% 65.1%)'
          : 'hsl(215.4 16.3% 46.9%)',
        headerStyle: {
          backgroundColor: isDarkColorScheme
            ? 'hsl(222.2 84% 4.9%)'
            : 'hsl(0 0% 100%)',
        },
        headerTintColor: isDarkColorScheme
          ? 'hsl(210 40% 98%)'
          : 'hsl(222.2 84% 4.9%)',
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
