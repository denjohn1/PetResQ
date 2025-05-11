import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

// Helper function to get the image source based on the passed param
const getImageSource = (imageParam: string) => {
  switch (imageParam) {
    case "image_1":
      return require("@/assets/images/mixie.jpg");
    case "image_2":
      return require("@/assets/images/rara.jpg");
    case "image_5":
      return require("@/assets/images/buddy.png");
    default:
      return null;
  }
};

// Chatroom dummy data (copied from chatroomscreen.tsx)
const chatroomData = [
  {
    id: "1",
    petName: "Mixie",
    petType: "Lost Dog Search",
    lastMessage: "@allen_reonet: I found a dog and has...",
    time: "02:07PM",
    image: require("@/assets/images/mixie.jpg"),
    messages: [
      {
        user: "@ic_hagosojos",
        message:
          "Thanks for joining, everyone! Mixie is a Shih Tzu, last seen near Park Ave at 8 AM. She's wearing a blue collar. Please share any sightings!",
        image: require("@/assets/images/mixie.jpg"),
      },
      {
        user: "@dennjohnn",
        message:
          "I'm near Park Ave now. I'll keep an eye out. Can you confirm if Mixie is friendly with strangers?",
      },
      {
        user: "@ic_hagosojos",
        message:
          "Yes, she's super friendly but might be scared. Approach slowly and call her name.",
      },
    ],
  },
  {
    id: "2",
    petName: "Rara",
    petType: "Lost Dog Search",
    lastMessage: "@dennjohnn: I'm near Park Ave now...",
    time: "12:23PM",
    image: require("@/assets/images/rara.jpg"),
    messages: [
      {
        user: "@johndoe",
        message:
          "Has anyone seen Rara? She's a French Bulldog, last seen near Main St.",
        image: require("@/assets/images/rara.jpg"),
      },
      {
        user: "@dennjohnn",
        message: "I'm near Park Ave now. I'll look around.",
      },
    ],
  },
  {
    id: "5",
    petName: "Buddy",
    petType: "Found Dog",
    lastMessage: "@ic_hagosojos: Where can I meet...",
    time: "01:20PM",
    image: require("@/assets/images/buddy.png"),
    messages: [
      {
        user: "@janesmith",
        message:
          "I found this Golden Retriever near the park. Does anyone recognize him?",
        image: require("@/assets/images/buddy.png"),
      },
      {
        user: "@ic_hagosojos",
        message: "Where can I meet you to check if this is my lost dog?",
      },
    ],
  },
];

export default function PetDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Extract pet details from params
  const {
    id,
    name,
    breed,
    distance,
    urgency,
    urgencyColor,
    type,
    category,
    owner,
    timeAgo,
    description,
    behavior,
    lastSeenTime,
    foundTime,
    location,
    image,
  } = params;

  const imageSource = image ? getImageSource(image as string) : null;

  const handleClaimPet = () => {
    console.log("Claim Pet Screen");
    router.push("/(screens)/claimpetscreen");
  };

  const handleJoinChatroom = () => {
    console.log("Join Chatroom for pet id:", id);
    // Find the corresponding chatroom by pet id
    const chatroom = chatroomData.find((chat) => chat.id === id);
    if (chatroom) {
      router.push({
        pathname: "/(screens)/chatroomviewscreen",
        params: {
          id: chatroom.id,
          petName: chatroom.petName,
          petType: chatroom.petType,
          messages: JSON.stringify(chatroom.messages),
        },
      });
    } else {
      console.log("No chatroom found for pet id:", id);
      // Optionally, navigate to chatroomscreen as fallback
      router.push("/(tabs)/chatroomscreen");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Fixed Header */}
      <View className="absolute top-0 left-0 right-0 z-10 border-b border-gray-200 px-4 pt-3 pb-2 flex-row items-center bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-4 z-10"
        >
          <Feather name="chevron-left" size={24} color="#262626" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <View className="w-5 h-1 bg-amber-500 rounded-full" />
          <Text
            className="text-[15px] text-gray-800"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Pet Details
          </Text>
        </View>
      </View>

      {/* Scrollable content below header */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        className="flex-1 pt-[47px]" // space for header
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Pet Image */}
          {imageSource ? (
            <Image
              source={imageSource}
              className="w-full h-60"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-60 bg-gray-200" />
          )}

          {/* Overlapping content container */}
          <View className="bg-white -mt-8 rounded-t-[30px] px-4 pt-6 pb-12">
            {/* Owner Info */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="mb-4">
                <View className="flex-row items-center space-x-2">
                  <Text
                    className="text-gray-800 text-sm mr-3"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    {owner}
                  </Text>
                  <Feather name="check-circle" size={16} color="green" />
                </View>
                <Text
                  className="text-gray-400 text-xs"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {timeAgo}
                </Text>
              </View>
            </View>

            <View className="h-px bg-gray-200 mb-4" />

            {/* Pet Details */}
            <Text
              className="text-xl text-gray-800"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {breed}
            </Text>
            <Text
              className={`text-sm mb-3 ${
                urgencyColor?.includes("red")
                  ? "text-red-600"
                  : urgencyColor?.includes("orange")
                  ? "text-orange-500"
                  : "text-green-600"
              }`}
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {urgency}
            </Text>

            <Text
              className="text-gray-700 text-sm mb-4"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              <Text className="font-semibold">Pet Name:</Text> {name}
              {"\n"}
              <Text className="font-semibold">Pet Type:</Text> {category}
              {"\n"}
              <Text className="font-semibold">Description:</Text> {description}
              {"\n"}
              <Text className="font-semibold">Behavior Context:</Text>{" "}
              {behavior}
              {"\n"}
              {type === "lost" ? (
                <>
                  <Text className="font-semibold">Last Seen Time:</Text>{" "}
                  <Text className="text-amber-500">{lastSeenTime}</Text>
                </>
              ) : (
                <>
                  <Text className="font-semibold">Found Time:</Text>{" "}
                  <Text className="text-green-500">{foundTime}</Text>
                </>
              )}
            </Text>

            <View className="h-48 overflow-hidden border border-gray-300 mb-6">
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: 12.973, // Directly using the coordinate
                  longitude: 123.99, // Directly using the coordinate
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 12.973, // Directly using the coordinate
                    longitude: 123.99, // Directly using the coordinate
                  }}
                  title={type === "lost" ? "Last Seen" : "Found Location"}
                />
              </MapView>
            </View>

            {/* Dynamic Button based on pet type */}
            {type === "lost" ? (
              <TouchableOpacity
                className="bg-amber-500 rounded-lg py-4 items-center justify-center"
                activeOpacity={0.8}
                onPress={handleJoinChatroom}
              >
                <Text
                  className="text-white text-base"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  Join Chatroom
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-green-500 rounded-lg py-4 items-center justify-center"
                activeOpacity={0.8}
                onPress={handleClaimPet}
              >
                <Text
                  className="text-white text-base"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  Claim Pet
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}