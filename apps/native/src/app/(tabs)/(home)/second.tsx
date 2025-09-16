import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Keyboard, Text, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import { z } from 'zod';
import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';

const formSchema = z.object({
  kaufpreis: z.number().min(1, {
    message: 'Kaufpreis must be at least 1.',
  }),
  miete: z.number().min(1, {
    message: 'Miete must be at least 1.',
  }),
});

export default function SecondScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kaufpreis: 0,
      miete: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <KeyboardAwareScrollView>
        <Form {...form}>
          <View className="flex-row gap-4 p-4">
            <View className="w-1/4">
              <FormField
                control={form.control}
                name="kaufpreis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kaufpreis</FormLabel>
                    <FormControl>
                      <Input
                        keyboardType="number-pad"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        placeholder="250000"
                        value={field.value.toString()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </View>
            <FormField
              control={form.control}
              name="miete"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miete</FormLabel>
                  <FormControl>
                    <Input
                      keyboardType="number-pad"
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      placeholder="1000"
                      value={field.value.toString()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </View>
          <Button onPress={form.handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}
