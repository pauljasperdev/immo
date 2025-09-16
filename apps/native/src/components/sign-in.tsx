import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { authClient } from '@/src/lib/auth-client';
import { queryClient } from '@/src/utils/trpc';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    await authClient.signIn.social(
      {
        provider: 'apple',
        callbackURL: '/',
      },
      {
        onError: (err) => {
          setError(err.error?.message || 'Failed to sign in');
          setIsLoading(false);
        },
        onSuccess: () => {
          queryClient.refetchQueries();
        },
        onFinished: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: (error) => {
          setError(error.error?.message || 'Failed to sign up');
          setIsLoading(false);
        },
        onSuccess: () => {
          setName('');
          setEmail('');
          setPassword('');
          queryClient.refetchQueries();
        },
        onFinished: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (error) => {
          setError(error.error?.message || 'Failed to sign in');
          setIsLoading(false);
        },
        onSuccess: () => {
          setEmail('');
          setPassword('');
          queryClient.refetchQueries();
        },
        onFinished: () => {
          setIsLoading(false);
        },
      }
    );
  };
  return (
    <View className="mt-6 rounded-lg border border-border bg-card p-4">
      <Text className="mb-4 font-semibold text-foreground text-lg">
        Create Account
      </Text>

      {error && (
        <View className="mb-4 rounded-md bg-destructive/10 p-3">
          <Text className="text-destructive text-sm">{error}</Text>
        </View>
      )}

      <TextInput
        className="mb-3 rounded-md border border-input bg-input p-4 text-foreground"
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="hsl(var(--muted-foreground))"
        value={name}
      />

      <TextInput
        autoCapitalize="none"
        className="mb-3 rounded-md border border-input bg-input p-4 text-foreground"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="hsl(var(--muted-foreground))"
        value={email}
      />

      <TextInput
        className="mb-4 rounded-md border border-input bg-input p-4 text-foreground"
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="hsl(var(--muted-foreground))"
        secureTextEntry
        value={password}
      />

      <TouchableOpacity
        className="flex-row items-center justify-center rounded-md bg-primary p-4"
        disabled={isLoading}
        onPress={handleSignUp}
      >
        {isLoading ? (
          <ActivityIndicator
            color="hsl(var(--primary-foreground))"
            size="small"
          />
        ) : (
          <Text className="font-medium text-primary-foreground">Sign Up</Text>
        )}
      </TouchableOpacity>
      <Text className="mb-6 text-center font-semibold text-foreground text-lg">
        Sign In
      </Text>
      <Text className="mb-6 text-center font-semibold text-foreground text-lg">
        {process.env.EXPO_PUBLIC_SERVER_URL}
      </Text>
      <TextInput
        autoCapitalize="none"
        className="mb-3 rounded-md border border-input bg-input p-4 text-foreground"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        value={email}
      />

      <TextInput
        className="mb-4 rounded-md border border-input bg-input p-4 text-foreground"
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
      />

      <TouchableOpacity
        className="flex-row items-center justify-center rounded-md bg-primary p-4"
        disabled={isLoading}
        onPress={handleLogin}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text className="font-medium text-primary-foreground">Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full flex-row items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-4"
        disabled={isLoading}
        onPress={handleAppleSignIn}
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
  );
}
