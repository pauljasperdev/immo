import {
  ChevronDown,
  ChevronUp,
  EditIcon,
  HouseIcon,
} from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Icon } from '../ui/icon';
import { useProperty } from './context';

type ItemProps = {
  label: string;
  children: React.ReactNode;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
};

export function Item({ label, children, textSize = 'lg' }: ItemProps) {
  return (
    <View className="flex-1 gap-1">
      <Text className="text-muted-foreground text-sm">{label}</Text>
      <Text className={`font-semibold text-card-foreground text-${textSize}`}>
        {children}
      </Text>
    </View>
  );
}

function GeneralOverview() {
  const { property } = useProperty();
  const rendite =
    property.rentalIncome && property.price
      ? ((property.rentalIncome * 12) / property.price) * 100
      : undefined;

  return (
    <>
      <View className="flex-row gap-4">
        <Item label="Kaufpreis">
          {property.price ? `${property.price.toLocaleString('de-DE')} €` : '-'}
        </Item>
        <Item label="Kaltmiete">
          {property.rentalIncome
            ? `${property.rentalIncome.toLocaleString('de-DE')} €`
            : '-'}
        </Item>
      </View>

      <View className="flex-row gap-4">
        {property.size ? <Item label="Größe">{property.size} m²</Item> : null}

        {rendite ? <Item label="Rendite">{rendite.toFixed(2)}%</Item> : null}
      </View>
    </>
  );
}

function GeneralDetails() {
  const { property } = useProperty();
  const hausgeld =
    (property.transferableExpenses ?? 0) +
    (property.nonTransferableExpenses ?? 0);

  const einkaufsfaktor =
    property.rentalIncome && property.price
      ? property.price / (property.rentalIncome * 12)
      : undefined;

  return (
    <View className="mt-4 gap-4">
      <View className="flex-row gap-4">
        <Item label="Verkehrswert">
          {property.marketValue
            ? `${property.marketValue.toLocaleString('de-DE')} €`
            : '-'}
        </Item>
        <Item label="Hausgeld">
          {hausgeld > 0 ? `${hausgeld.toLocaleString('de-DE')} €` : '-'}
        </Item>
      </View>

      <View className="flex-row gap-4">
        <Item label="Umlagefähig">
          {property.transferableExpenses
            ? `${property.transferableExpenses.toLocaleString('de-DE')} €`
            : '-'}
        </Item>
        <Item label="Nicht umlagefähig">
          {property.nonTransferableExpenses
            ? `${property.nonTransferableExpenses.toLocaleString('de-DE')} €`
            : '-'}
        </Item>
      </View>

      <View className="flex-row gap-4">
        {einkaufsfaktor ? (
          <Item label="Einkaufsfaktor">{einkaufsfaktor.toFixed(1)}x</Item>
        ) : null}
        <Item label="Vergleichsmiete">
          {property.rentalIncomeMarket
            ? `${property.rentalIncomeMarket.toLocaleString('de-DE')} €`
            : '-'}
        </Item>
      </View>
    </View>
  );
}

export function General() {
  const { property } = useProperty();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="relative flex-row items-center justify-between pb-4">
        <View className="flex-row items-center gap-3">
          <Icon as={HouseIcon} className="text-primary" size={20} />
          <CardTitle className="text-lg">
            <View className="flex-col">
              <Text>
                {property.street} {property.houseNumber}
              </Text>
              <Text className="text-md text-muted-foreground">
                {property.postalCode} {property.city}
              </Text>
            </View>
          </CardTitle>
        </View>
        <Icon
          as={EditIcon}
          className="absolute top-0 right-6 text-primary"
          size={20}
        />
      </CardHeader>
      <CardContent className="">
        <Collapsible onOpenChange={setIsOpen} open={isOpen}>
          <CollapsibleTrigger className="w-full">
            <GeneralOverview />
            <View className="my-2 w-full flex-row items-center justify-center">
              <Icon
                as={isOpen ? ChevronUp : ChevronDown}
                className="text-primary"
                size={30}
              />
            </View>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <GeneralDetails />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
