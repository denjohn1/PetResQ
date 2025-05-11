import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StarIcon, TrophyIcon } from "react-native-heroicons/outline";
import {
  ArrowLeftOnRectangleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";

export default function SettingsScreen() {
  // Mock user data with image
  const user = {
    name: "Christian Allen",
    username: "@reonalchristian",
    isVerified: true,
    image: require("@/assets/images/avatar.jpg"), // Add this line
  };

  // Mock badges data
  const badges = [
    {
      id: 1,
      title: "First Rescue!",
      status: "Achieved",
    },
    {
      id: 2,
      title: "5 Successful Reports",
      status: "Achieved",
    },
    {
      id: 3,
      title: "5 Star Ratings",
      status: "Achieved",
    },
  ];

  const handleLogout = () => {
    router.replace("/(auth)/loginscreen");
  };

  const handleEditProfile = () => {
    router.push({
      pathname: "/(screens)/editprofilescreen",
      params: {
        name: user.name,
        username: user.username,
        image: "avatar", // Pass the image identifier
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-200 px-4 pt-3 pb-2 flex-row items-center justify-center">
        <View className="items-center">
          <View className="w-5 h-1 bg-amber-500 rounded-[5px]" />
          <Text
            className="text-[15px] text-gray-800"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Profile
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="flex-row items-center px-6 pt-8 pb-4">
          {/* Avatar */}
          <View className="mr-4">
            <Image
              source={user.image}
              className="w-[85px] h-[85px] rounded-full mr-3"
              resizeMode="cover"
            />
          </View>

          {/* User Info */}
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text
                className="text-lg text-gray-900 mr-1"
                style={{ fontFamily: "Poppins-SemiBold" }}
              >
                {user.name}
              </Text>
              {user.isVerified && <CheckCircleIcon color="#22c55e" size={16} />}
            </View>
            <Text
              className="text-gray-500 text-sm mb-2"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              {user.username}
            </Text>
            <TouchableOpacity
              className="bg-amber-500 rounded-md py-2 px-4 items-center max-w-32"
              onPress={handleEditProfile}
            >
              <Text
                className="text-sm text-white"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-4">
          {/* Reported Pet */}
          <TouchableOpacity className="flex-row items-center justify-between px-6 py-4">
            <View className="flex-row items-center">
              <Text
                className="text-base text-gray-800"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                Reported Pet
              </Text>
            </View>
            <ChevronRightIcon color="#f59e0b" size={20} />
          </TouchableOpacity>

          {/* History */}
          <TouchableOpacity className="flex-row items-center justify-between px-6 py-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <Text
                className="text-base text-gray-800"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                History
              </Text>
            </View>
            <ChevronRightIcon color="#f59e0b" size={20} />
          </TouchableOpacity>

          {/* Badges and ratings */}
          <View className="border-t border-gray-200">
            <TouchableOpacity className="flex-row items-center justify-between px-6 py-4">
              <View className="flex-row items-center">
                <Text
                  className="text-base text-gray-800"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Badges and ratings
                </Text>
              </View>
              <ChevronRightIcon
                color="#f59e0b"
                size={20}
                className="rotate-90"
              />
            </TouchableOpacity>

            {/* Badges Content */}
            <View className="px-4">
              {badges.map((badge) => {
                let Icon;
                if (badge.id === 3) {
                  Icon = <StarIcon color="#facc15" size={28} />;
                } else {
                  Icon = <TrophyIcon color="#facc15" size={28} />;
                }

                return (
                  <View
                    key={badge.id}
                    className="bg-white rounded-xl p-4 mb-4 shadow-sm"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <View className="flex-row items-center">
                      <View className="mr-3">{Icon}</View>
                      <View className="flex-1">
                        <Text
                          className="text-gray-800"
                          style={{ fontFamily: "Poppins-SemiBold" }}
                        >
                          {badge.title}
                        </Text>
                        <Text
                          className="text-green-500 text-xs"
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          {badge.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Logout Button */}
      <View className="absolute bottom-0 left-0 right-0 px-6 py-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-100 px-4 py-3 border border-red-500 rounded-md flex-row items-center justify-center"
        >
          <ArrowLeftOnRectangleIcon color="#ef4444" size={20} />
          <Text
            className="ml-2 text-red-500"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}