import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Label } from '../ui/label';
import { useProperty } from './context';
import { Field } from './field';

export const Header = () => {
  const { property, updateProperty } = useProperty();

  const streetString = property.strasse || 'Neues Objekt';
  const numberString = property.hausnummer ? `${property.hausnummer}` : '';
  const cityString = property.stadt ? `in ${property.stadt}` : '';

  const title = `${streetString} ${numberString} ${cityString}`;

  return (
    <View className="flex w-full items-center space-y-4 pt-4">
      <View className="items-center">
        <Text className="font-semibold text-card-foreground text-lg">
          {title}
        </Text>
      </View>

      <View className="w-full space-y-3">
        <View className="grid grid-cols-2 gap-4">
          <View>
            <Label nativeID="street">Strasse</Label>
            <Field
              id="street"
              onChange={(value) => updateProperty({ strasse: value as string })}
              value={property.strasse}
            />
          </View>
          <View>
            <Label nativeID="house-number">Hausnummer</Label>
            <Field
              id="house-number"
              onChange={(value) =>
                updateProperty({ hausnummer: value as string })
              }
              value={property.hausnummer}
            />
          </View>
        </View>
        <Label nativeID="city">Stadt</Label>
        <Field
          id="city"
          onChange={(value) => updateProperty({ stadt: value as string })}
          value={property.stadt}
        />
      </View>
    </View>
  );
};
