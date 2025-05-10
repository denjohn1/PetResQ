import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from 'expo-router';
import React, { useState } from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignIn = () => {
    console.log("Sign In");
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-white pt-4 px-6">

      {/* Header */}
      <Text
        className="text-center text-lg text-black mb-10"
        style={{ fontFamily: "Poppins-SemiBold" }}
      >
        Sign In
      </Text>

      {/* Logo */}
      <Image
        source={require("../../assets/images/black_logo.png")}
        className="w-20 h-20 ml--5"
        resizeMode="contain"
      />

      {/* Title and Subtitle */}
      <Text
        className="text-2xl text-black text-left mb-2"
        style={{ fontFamily: "Poppins-SemiBold" }}
      >
        Let's you Sign In
      </Text>
      <Text
        className="text-gray-500 text-left text-base mb-8"
        style={{ fontFamily: "Poppins-Regular" }}
      >
        Welcome back, ready to find pets?
      </Text>

      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
        <Ionicons name="person-outline" size={20} color="gray" className="mr-3" />
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 text-base"
            style={{
            fontFamily: "Poppins-Regular",
            textAlignVertical: "center", // ← this centers it vertically
            }}
        />
        </View>

      {/* Password Input */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
        <Ionicons name="lock-closed-outline" size={20} color="gray" className="mr-3" />
        <TextInput
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          className="flex-1 text-base"
          style={{ fontFamily: "Poppins-Regular" }}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity className="mb-6">
        <Text
          className="text-gray-500 text-left text-sm"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-yellow-500 rounded-xl py-4 mb-4"
      >
        <Text
          className="text-white text-center text-base"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Create Account Link */}
      <TouchableOpacity onPress={() => navigation.navigate("registerscreen" as never)}>
        <Text
          className="text-gray-500 text-center text-sm"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Don't have an account? <Text className="text-black">Create One.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}