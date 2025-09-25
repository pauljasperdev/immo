import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProperty } from './context';

interface FieldProps {
  value?: string | number | null;
  id: string;
  onChange?: (value: string) => void;
}
export const Field = ({ value, id, onChange }: FieldProps) => {
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
};

const InputField = () => {
  const { modalState, setModalState } = useProperty();

  return (
    <View className="flex-1 items-center justify-start">
      <View className="flex flex-row gap-2 pt-16">
        <Button
          onPress={() => setModalState({ ...modalState, isOpen: false })}
          variant="secondary"
        >
          <Text>Schließen</Text>
        </Button>
        <Button onPress={() => setModalState({ ...modalState, isOpen: false })}>
          <Text>Speichern</Text>
        </Button>
      </View>
    </View>
  );
};
