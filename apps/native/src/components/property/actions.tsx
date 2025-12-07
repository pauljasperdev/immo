import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useProperty } from './context';

export function Create() {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.create}>
      <Text>Erstellen</Text>
    </Button>
  );
}

export function Update() {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.update}>
      <Text>Speichern</Text>
    </Button>
  );
}

export function Cancel() {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.cancel}>
      <Text>Abbrechen</Text>
    </Button>
  );
}

export function Delete() {
  const { actions } = useProperty();
  return (
    <Button onPress={actions?.delete}>
      <Text>Löschen</Text>
    </Button>
  );
}
