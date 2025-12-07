import { type Href, useRouter } from 'expo-router';
import { PlusCircle } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { NAV_THEME } from '@/lib/theme';
import { PropertyComposer } from './property';

interface CreatePropertyButtonProps {
  navigateTo: Href;
  className?: string;
}

export function CreatePropertyButton({
  navigateTo,
  className,
}: CreatePropertyButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(navigateTo as Href);
  };

  return (
    <TouchableOpacity className={className} onPress={handlePress}>
      <PlusCircle color={NAV_THEME.dark.colors.primary} />
    </TouchableOpacity>
  );
}

export function CreateProperty() {
  return (
    <PropertyComposer.Root
      actions={{
        create: () => {
          console.log('create');
        },
      }}
      className="gap-4 p-8"
    >
      <PropertyComposer.General />
      <PropertyComposer.Body />
      <PropertyComposer.Create />
      <PropertyComposer.Cancel />
    </PropertyComposer.Root>
  );
}
