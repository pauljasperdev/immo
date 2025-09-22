import { Input } from '@/components/ui/input';

interface FieldProps {
  value?: string | number | null;
  id?: string;
  onChange?: (value: string) => void;
}
export const Field = ({ value, id, onChange }: FieldProps) => {
  const keyboardType = typeof value === 'number' ? 'number-pad' : 'default';
  return (
    <Input
      id={id}
      keyboardType={keyboardType}
      onChangeText={onChange}
      placeholder={value as string}
    />
  );
};
