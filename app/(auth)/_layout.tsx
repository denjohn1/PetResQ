import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="welcomescreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loginscreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="registerscreen"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}