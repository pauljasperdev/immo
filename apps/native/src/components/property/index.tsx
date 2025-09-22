import { useState } from 'react';
import { View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { Container } from '../container';
import { Cancel, Create, Delete, Update } from './actions';
import { Body } from './body';
import { type Property, PropertyContext } from './context';
import { Field } from './field';
import { Header } from './header';

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

  const updateProperty = (prop: Property) => {
    setProperty((prev) => ({ ...prev, ...prop }));
  };

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
            }}
          >
            <View className={className}>{children}</View>
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
