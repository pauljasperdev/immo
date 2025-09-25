import { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { Container } from '../container';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Cancel, Create, Delete, Update } from './actions';
import { Body } from './body';
import { type Property, PropertyContext } from './context';
import { Field } from './field';
import { Header } from './header';
import { initModalState, type ModalState, PropertyModal } from './modal';

interface RootProps {
  children: React.ReactNode;
  initialProperty?: Property;
  className?: string;
  actions?: {
    create?: () => void;
    update?: () => void;
    cancel?: () => void;
    delete?: () => void;
  };
}

const Root = ({
  children,
  className,
  initialProperty = {} as Property,
  actions,
}: RootProps) => {
  const [property, setProperty] = useState<Property>(initialProperty);

  const updateProperty = (prop: Partial<Property>) => {
    setProperty((prev) => ({ ...prev, ...prop }));
  };
  const [modalState, setModalState] = useState<ModalState>(initModalState);

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flexGrow: 1 }}
      >
        <Container>
          <PropertyContext.Provider
            value={{
              property,
              updateProperty,
              actions,
              modalState,
              setModalState,
            }}
          >
            <View className={className}>{children}</View>
            <PropertyModal />
          </PropertyContext.Provider>
        </Container>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
};

export const PropertyComposer = {
  Root,
  Header,
  Body,
  Field,
  Create,
  Update,
  Cancel,
  Delete,
};
