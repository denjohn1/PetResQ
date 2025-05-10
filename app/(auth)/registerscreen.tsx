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
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    terms: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      fullname: "",
      email: "",
      password: "",
      terms: "",
    };

    // Fullname validation
    if (!fullname.trim()) {
      newErrors.fullname = "Full name is required";
      valid = false;
    } else if (fullname.trim().length < 3) {
      newErrors.fullname = "Name must be at least 3 characters";
      valid = false;
    }

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

    // Terms validation
    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and policy";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      console.log("Sign Up with:", fullname, email, password);
      // Proceed with registration logic
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
      <View className="mb-4">
        <View className={`flex-row items-center bg-gray-100 rounded-lg px-4 py-3 ${errors.fullname ? "border border-red-500" : ""}`}>
          <Ionicons
            name="person-outline"
            size={20}
            color="gray"
            className="mr-3"
          />
          <TextInput
            placeholder="Fullname"
            value={fullname}
            onChangeText={(text) => {
              setFullname(text);
              if (errors.fullname) {
                setErrors({...errors, fullname: ""});
              }
            }}
            autoCapitalize="words"
            className="flex-1 text-base"
            style={{
              fontFamily: "Poppins-Regular",
              height: 30,
              padding: 0,
              margin: 0,
              includeFontPadding: false,
              textAlignVertical: "center",
            }}
          />
        </View>
        {errors.fullname ? (
          <Text className="text-red-500 text-xs mt-1 ml-1" style={{ fontFamily: "Poppins-Regular" }}>
            {errors.fullname}
          </Text>
        ) : null}
      </View>

      {/* Email Input */}
      <View className="mb-4">
        <View className={`flex-row items-center bg-gray-100 rounded-lg px-4 py-3 ${errors.email ? "border border-red-500" : ""}`}>
          <Ionicons
            name="mail-outline"
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
              height: 30,
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
              height: 30,
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

      {/* Terms and Policy Checkbox */}
      <View className="mb-6">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            setTermsAccepted(!termsAccepted);
            if (errors.terms) {
              setErrors({...errors, terms: ""});
            }
          }}
        >
          <Ionicons
            name={termsAccepted ? "checkbox-outline" : "square-outline"}
            size={20}
            color={termsAccepted ? "black" : errors.terms ? "red" : "gray"}
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
        {errors.terms ? (
          <Text className="text-red-500 text-xs mt-1 ml-7" style={{ fontFamily: "Poppins-Regular" }}>
            {errors.terms}
          </Text>
        ) : null}
      </View>

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