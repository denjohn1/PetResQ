import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignUp = () => {
    // Handle sign-up logic here (e.g., API call)
    if (termsAccepted) {
      console.log("Sign Up with:", fullname, email, password);
    } else {
      console.log("Please accept the terms and policy.");
    }
  };

  return (
    <View className="flex-1 bg-white pt-4 px-6">
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-4 left-5 z-10"
      >
        <Ionicons name="chevron-back-outline" size={24} color="#FBAF02" />
      </TouchableOpacity>

      {/* Header */}
      <Text
        className="text-center text-lg text-black mb-10"
        style={{ fontFamily: "Poppins-SemiBold" }}
      >
        Sign Up
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
        Welcome to PetResQ
      </Text>
      <Text
        className="text-gray-500 text-left text-base mb-8"
        style={{ fontFamily: "Poppins-Regular" }}
      >
        Smarter Search. Faster Recovery. Happier Reunions.
      </Text>

      {/* Fullname Input */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
        <Ionicons
          name="person-outline"
          size={20}
          color="gray"
          className="mr-3"
        />
        <TextInput
          placeholder="Fullname"
          value={fullname}
          onChangeText={setFullname}
          autoCapitalize="words"
          className="flex-1 text-base"
          style={{ fontFamily: "Poppins-Regular", textAlignVertical: "center" }}
        />
      </View>

      {/* Email Input */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
        <Ionicons
          name="person-outline"
          size={20}
          color="gray"
          className="mr-3"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="flex-1 text-base"
          style={{ fontFamily: "Poppins-Regular", textAlignVertical: "center" }}
        />
      </View>

      {/* Password Input */}
      <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4">
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="gray"
          className="mr-3"
        />
        <TextInput
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          className="flex-1 text-base"
          style={{ fontFamily: "Poppins-Regular", textAlignVertical: "center" }}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Terms and Policy Checkbox */}
      <TouchableOpacity
        className="flex-row items-center mb-6"
        onPress={() => setTermsAccepted(!termsAccepted)}
      >
        <Ionicons
          name={termsAccepted ? "checkbox-outline" : "square-outline"}
          size={20}
          color={termsAccepted ? "black" : "gray"}
          className="mr-2"
        />
        <Text
          className="text-gray-500 text-sm"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          By creating this account, you have agree with{" "}
          <Text className="text-black">Terms and Policy</Text>
        </Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-yellow-500 rounded-xl py-4 mb-4"
      >
        <Text
          className="text-white text-center text-base"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <TouchableOpacity
        onPress={() => navigation.navigate("loginscreen" as never)}
      >
        <Text
          className="text-gray-500 text-center text-sm"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Already have an account? <Text className="text-black">Sign In.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
