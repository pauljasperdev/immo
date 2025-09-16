import { createContext, useContext, useId } from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { View } from 'react-native';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

// Form Provider Component
const Form = FormProvider;

// Form Field Context
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

// Form Field Component - Enhanced to accept styling props
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  style,
  ...props
}: ControllerProps<TFieldValues, TName> & {
  className?: string;
  style?: React.ComponentProps<typeof View>['style'];
}) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <View className={className} style={style}>
        <Controller {...props} />
      </View>
    </FormFieldContext.Provider>
  );
};

// Hook to use form field
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// Form Item Context
type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// Form Item Component
function FormItem({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <View className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}

// Form Label Component
function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label> & React.RefAttributes<typeof Label>) {
  const { error, formItemId, isTouched } = useFormField();

  return (
    <Label
      className={cn(error && isTouched && 'text-destructive', className)}
      nativeID={formItemId}
      {...props}
    />
  );
}

// Form Control Component
function FormControl({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  const { error, formItemId, formDescriptionId, formMessageId, isTouched } =
    useFormField();

  return (
    <View
      accessibilityHint={
        error && isTouched
          ? `${formDescriptionId} ${formMessageId}`
          : formDescriptionId
      }
      accessibilityLabel={formItemId}
      accessibilityState={{ disabled: !!(error && isTouched) }}
      className={cn(className)}
      {...props}
    />
  );
}

// Form Description Component
function FormDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  const { formDescriptionId } = useFormField();

  return (
    <Text
      className={cn('text-muted-foreground text-sm', className)}
      nativeID={formDescriptionId}
      {...props}
    />
  );
}

// Form Message Component
function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  const { error, formMessageId, isTouched } = useFormField();
  const body = error && isTouched ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Text
      className={cn('font-medium text-destructive text-sm', className)}
      nativeID={formMessageId}
      {...props}
    >
      {body}
    </Text>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
