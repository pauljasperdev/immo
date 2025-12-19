import { useState } from 'react';
import { View } from 'react-native';
import { Cancel, Create, Delete, Update } from './actions';
import { type Property, PropertyContext } from './context';
import { Field } from './field';
import { General } from './general';
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
  );
};

export const PropertyComposer = {
  Root,
  General,
  Field,
  Create,
  Update,
  Cancel,
  Delete,
};
