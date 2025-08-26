import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { authClient } from '@/lib/auth-client';
import { queryClient } from '@/utils/trpc';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authClient.signIn.social({
        provider: 'apple',
        callbackURL: '/',
      });

      if (data) {
        queryClient.refetchQueries();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to sign in with Apple'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="mt-6 rounded-lg border border-border bg-card p-4">
      <Text className="mb-6 text-center font-semibold text-foreground text-lg">
        Sign In
      </Text>
      <Text className="mb-6 text-center font-semibold text-foreground text-lg">
        {process.env.EXPO_PUBLIC_SERVER_URL}
      </Text>
      {error && (
        <View className="mb-4 rounded-md bg-destructive/10 p-3">
          <Text className="text-center text-destructive text-sm">{error}</Text>
        </View>
      )}

      <View className="flex w-full flex-col items-center justify-between gap-2">
        <TouchableOpacity
          className="w-full flex-row items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-4"
          disabled={isLoading}
          onPress={signIn}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#000000" size="small" />
          ) : (
            <>
              <AntDesign color="#000000" name="apple1" size={20} />
              <Text className="font-medium text-base text-black">
                Sign in with Apple
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
