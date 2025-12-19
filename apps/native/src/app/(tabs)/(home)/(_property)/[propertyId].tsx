import { ScrollView, View } from 'react-native';
import { Container } from '@/components/container';
import { PropertyComposer } from '@/components/property';
import type { Property } from '@/components/property/context';

const dummyProperty: Property = {
  publicId: '1234567890',
  street: 'Musterstraße',
  houseNumber: '42',
  city: 'München',
  postalCode: '10115',
  country: 'DE',
  price: 450_000,
  rentalIncome: 1200,
  rentalIncomeMarket: 1300,
  transferableExpenses: 50,
  nonTransferableExpenses: 100,
  closingCosts: 45_000,
  realEstateTransferTax: 31_500,
  marketValue: 500_000,
  size: 65,
};

export default function PropertyScreen() {
  return (
    <Container>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="gap-6">
          <PropertyComposer.Root initialProperty={dummyProperty}>
            <PropertyComposer.General />
          </PropertyComposer.Root>
        </View>
      </ScrollView>
    </Container>
  );
}
