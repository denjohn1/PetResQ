import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      console.log("Sign In");
      router.replace("/");
    }
  };

  return (
    <View className="flex-1 bg-white pt-4 px-6">  
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

      {/* Email Input */}
      <View className="mb-4">
        <View className={`flex-row items-center bg-gray-100 rounded-lg px-4 py-3 ${errors.email ? "border border-red-500" : ""}`}>
          <Ionicons
            name="person-outline"
            size={20}
            color="gray"
            className="mr-3"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                setErrors({...errors, email: ""});
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 text-base"
            style={{
              fontFamily: "Poppins-Regular",
              height: 35,
              padding: 0,
              margin: 0,
              includeFontPadding: false,
              textAlignVertical: "center",
            }}
          />
        </View>
        {errors.email ? (
          <Text className="text-red-500 text-xs mt-1 ml-1" style={{ fontFamily: "Poppins-Regular" }}>
            {errors.email}
          </Text>
        ) : null}
      </View>

      {/* Password Input */}
      <View className="mb-4">
        <View className={`flex-row items-center bg-gray-100 rounded-lg px-4 py-3 ${errors.password ? "border border-red-500" : ""}`}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="gray"
            className="mr-3"
          />
          <TextInput
            placeholder="Your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                setErrors({...errors, password: ""});
              }
            }}
            secureTextEntry={!passwordVisible}
            className="flex-1 text-base"
            style={{
              fontFamily: "Poppins-Regular",
              height: 35,
              padding: 0,
              margin: 0,
              includeFontPadding: false,
              textAlignVertical: "center",
            }}
          />

          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text className="text-red-500 text-xs mt-1 ml-1" style={{ fontFamily: "Poppins-Regular" }}>
            {errors.password}
          </Text>
        ) : null}
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
      <TouchableOpacity
        onPress={() => navigation.navigate("registerscreen" as never)}
      >
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