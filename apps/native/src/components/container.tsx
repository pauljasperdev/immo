import type React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};
