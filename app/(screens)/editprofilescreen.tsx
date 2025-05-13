import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  CameraIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/solid";

// Helper function to get image source
const getImageSource = (imageName: string) => {
  switch (imageName) {
    case "avatar":
      return require("@/assets/images/avatar.jpg");
    // Add more cases if you have multiple profile images
    default:
      return require("@/assets/images/avatar.jpg"); // default image
  }
};

export default function EditProfileScreen() {
  const params = useLocalSearchParams();
  
  const [formData, setFormData] = useState({
    name: params.name?.toString() || "Christian Allen",
    email: "christianreonal@gmail.com",
    username: params.username?.toString() || "@reonalchristian",
    password: "password",
    phone: "+63 912 345 6789",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    params.image ? getImageSource(params.image.toString()) : require("@/assets/images/avatar.jpg")
  );

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    router.back();
  };

  const handleChangeImage = () => {
    // In a real app, this would open the image picker
    // For demo purposes, we'll just toggle between two images
    setProfileImage(
      profileImage === require("@/assets/images/avatar.jpg")
        ? require("@/assets/images/avatar2.jpg")
        : require("@/assets/images/avatar.jpg")
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-3 pb-2">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon color="#000" size={20} />
        </TouchableOpacity>
        <View className="items-center">
          <View className="w-5 h-1 bg-amber-500 rounded-full" />
          <Text
            className="text-[15px] text-gray-800"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Profile
          </Text>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <CheckIcon color="green" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-5">
        {/* Avatar with edit button */}
        <View className="items-center mt-4 mb-6">
          <View className="relative">
            <Image
              source={profileImage}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity
              onPress={handleChangeImage}
              className="absolute bottom-0 right-0 bg-amber-500 p-2 rounded-full"
            >
              <CameraIcon size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        {[
          { label: "Name", key: "name" },
          { label: "Email Address", key: "email" },
          { label: "Username", key: "username" },
          { label: "Password", key: "password", isPassword: true },
          { label: "Phone Number", key: "phone" },
        ].map(({ label, key, isPassword }) => (
          <View key={key} className="mb-4">
            <Text
              className="mb-1 text-sm text-gray-800"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {label}
            </Text>
            <View className="relative">
              <TextInput
                className="border border-gray-300 rounded-md px-4 py-3 text-sm text-gray-800"
                style={{ fontFamily: "Poppins-Regular" }}
                secureTextEntry={isPassword && !showPassword}
                value={formData[key as keyof typeof formData]}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, [key]: text }))
                }
              />
              {isPassword && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: [{ translateY: -10 }],
                  }}
                >
                  {showPassword ? (
                    <EyeIcon size={20} color="#888" />
                  ) : (
                    <EyeSlashIcon size={20} color="#888" />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}