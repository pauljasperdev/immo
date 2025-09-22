import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import { CreatePropertyButton } from '@/components/create-property';
import { NAV_THEME } from '@/lib/theme';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
    >
      {/* Create Property Component at the top */}
      <View className="flex-row items-center justify-between border-border border-b p-4">
        {/* <SelectProperty properties={[]} /> */}
        <CreatePropertyButton navigateTo="/(tabs)/(home)/property/create" />
      </View>

      {/* Main navigation items */}
      <View className="flex-1">
        <DrawerItemList {...props} />
      </View>

      {/* Settings at the bottom */}
      <View className="text-primary">
        <DrawerItem
          icon={({ size }) => (
            <FontAwesome
              color={NAV_THEME.dark.colors.text}
              name="cog"
              size={size}
            />
          )}
          label="Settings"
          labelStyle={{
            fontWeight: '600',
            color: NAV_THEME.dark.colors.text,
          }}
          onPress={() => props.navigation.navigate('settings')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function HomeDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: NAV_THEME.dark.colors.primary,
        drawerInactiveTintColor: NAV_THEME.dark.colors.text,
        drawerStyle: {
          width: 280,
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
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}
