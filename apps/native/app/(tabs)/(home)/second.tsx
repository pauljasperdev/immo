import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';

export default function SecondScreen() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex-row">
        <View className="flex-1 gap-1.5">
          <CardTitle>Subscribe to our newsletter</CardTitle>
          <CardDescription>
            Enter your details to receive updates and tips
          </CardDescription>
        </View>
      </CardHeader>
      <CardContent>
        <View className="w-full justify-center gap-4">
          <View className="gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" />
          </View>
          <View className="gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </View>
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">
          <Text>Subscribe</Text>
        </Button>
        <Button className="w-full" variant="outline">
          <Text>Later</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
