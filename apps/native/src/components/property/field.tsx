import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProperty } from './context';

interface FieldProps {
  value?: string | number | null;
  id: string;
  onChange?: (value: string) => void;
}
export function Field({ value, id, onChange }: FieldProps) {
  const keyboardType = typeof value === 'number' ? 'number-pad' : 'default';

  const { modalState, setModalState } = useProperty();

  return (
    <TouchableOpacity
      onPress={() => {
        setModalState({
          ...modalState,
          isOpen: true,
          content: <InputField />,
        });
      }}
    >
      <Text>{value as string}</Text>
    </TouchableOpacity>
  );
}

function InputField() {
  const { modalState, setModalState } = useProperty();

  return (
    <View className="flex-1 items-center justify-center px-16">
      <Input />
      <View className="flex flex-row gap-2 pt-16">
        <Button
          onPress={() => setModalState({ ...modalState, isOpen: false })}
          variant="outline"
        >
          <Text className="text-primary">Schließen</Text>
        </Button>
        <Button onPress={() => setModalState({ ...modalState, isOpen: false })}>
          <Text>Speichern</Text>
        </Button>
      </View>
    </View>
  );
}
