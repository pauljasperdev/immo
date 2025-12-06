import type React from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { Container } from './container';

export function KeyboardContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flexGrow: 1 }}
      >
        {children}
      </KeyboardAwareScrollView>
      <KeyboardToolbar offset={{ closed: 62, opened: 62 }} />
    </Container>
  );
}
