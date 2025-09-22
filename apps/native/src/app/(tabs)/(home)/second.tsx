import { useState } from 'react';
import { View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

export default function SecondScreen() {
  return (
    // <Container>
    <>
      <KeyboardAwareScrollView className="flex-1 p-6">
        <View className="space-y-3">
          <Label>
            <Text className="font-semibold text-card-foreground text-lg">
              Kaufpreis
            </Text>
          </Label>
          <Input keyboardType="number-pad" placeholder="250000" />
          <Text className="text-muted-foreground text-sm">
            Gesamtkaufpreis der Immobilie in Euro
          </Text>
        </View>

        <View className="space-y-3">
          <Label>
            <Text className="font-semibold text-card-foreground text-lg">
              Kaltmiete (monatlich)
            </Text>
          </Label>

          <Input keyboardType="number-pad" placeholder="1200" />
          <Text className="text-muted-foreground text-sm">
            Monatliche Kaltmiete in Euro
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
    // </Container>
  );
}
