import type { Property as PropertyType } from '@immo/core/property/property.sql';
import { createContext, useContext } from 'react';
import type { ModalState } from './modal';

export type Property = Omit<
  PropertyType,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

interface PropertyContextValue {
  property: Property;
  updateProperty: (property: Partial<Property>) => void;
  actions?: {
    create?: () => void;
    update?: () => void;
    cancel?: () => void;
    delete?: () => void;
  };
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}

export const PropertyContext = createContext<PropertyContextValue | null>(null);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('Property components must be used within PropertyContext');
  }
  return context;
};
