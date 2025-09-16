import { ScrollView, Text, View } from 'react-native';
import { Container } from '@/src/components/container';

export default function HomeScreen() {
  return (
    <Container>
      <ScrollView className="flex-1 p-6">
        <View className="py-8">
          <Text className="mb-2 font-bold text-3xl text-foreground">Home</Text>
          <Text className="text-lg text-muted-foreground">
            Welcome to your home dashboard. Use the drawer to navigate to
            different sections.
          </Text>
        </View>

        <View className="space-y-6 py-6">
          <View className="rounded-lg bg-card p-6 shadow-sm">
            <Text className="mb-2 font-semibold text-card-foreground text-xl">
              Quick Actions
            </Text>
            <Text className="text-muted-foreground">
              Access your most used features from the navigation drawer.
            </Text>
          </View>

          <View className="rounded-lg bg-card p-6 shadow-sm">
            <Text className="mb-2 font-semibold text-card-foreground text-xl">
              Recent Activity
            </Text>
            <Text className="text-muted-foreground">
              Your recent activity and updates will appear here.
            </Text>
          </View>

          <View className="rounded-lg bg-card p-6 shadow-sm">
            <Text className="mb-2 font-semibold text-card-foreground text-xl">
              Statistics
            </Text>
            <Text className="text-muted-foreground">
              View your usage statistics and insights.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
