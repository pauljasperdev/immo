import type React from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { Container } from './container';

export function KeyboardContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={120}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flexGrow: 1 }}
      >
        <Container>{children}</Container>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}
