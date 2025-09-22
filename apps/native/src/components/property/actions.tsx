import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useProperty } from './context';

export const Create = () => {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.create}>
      <Text>Erstellen</Text>
    </Button>
  );
};

export const Update = () => {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.update}>
      <Text>Speichern</Text>
    </Button>
  );
};

export const Cancel = () => {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.cancel}>
      <Text>Abbrechen</Text>
    </Button>
  );
};

export const Delete = () => {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.delete}>
      <Text>Löschen</Text>
    </Button>
  );
};
