import { Portal } from '@rn-primitives/portal';
import { View } from 'react-native';
import { Container } from '../container';
import { PropertyContext, useProperty } from './context';

export type ModalState = {
  isOpen: boolean;
  content: React.ReactNode;
};

export const initModalState: ModalState = {
  isOpen: false,
  content: null,
};

export const PropertyModal = () => {
  const ctx = useProperty();

  if (!ctx.modalState.isOpen) {
    return null;
  }

  return (
    // using portal to avoid first-frame jump
    <Portal name="property-modal">
      <PropertyContext.Provider value={ctx}>
        <View className="absolute inset-0 bg-background">
          <Container>{ctx.modalState.content}</Container>
        </View>
      </PropertyContext.Provider>
    </Portal>
  );
};
