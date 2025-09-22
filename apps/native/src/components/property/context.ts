import type { Property as PropertyType } from '@immo/core/property/property.sql';
import { createContext, useContext } from 'react';

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
}

export const PropertyContext = createContext<PropertyContextValue | null>(null);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('Property components must be used within PropertyContext');
  }
  return context;
};
