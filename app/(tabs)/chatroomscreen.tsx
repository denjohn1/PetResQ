import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Add this at the top of chatroomscreen.tsx
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
    id: "3",
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

export default function ChatroomScreen() {
  const router = useRouter();

  const handleRoomView = (chatroom: any) => {
    console.log("Chatroom View Screen");
    router.push({
      pathname: "/(screens)/chatroomviewscreen",
      params: {
        id: chatroom.id,
        petName: chatroom.petName,
        petType: chatroom.petType,
        messages: JSON.stringify(chatroom.messages),
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
            Chatroom
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 mt-2">
        <View className="flex-row items-center bg-gray-50 rounded-lg px-5 py-5">
          <Feather name="search" size={20} color="#FBAF02" />
          <TextInput
            className="flex-1 ml-2 text-sm text-gray-800"
            placeholder="Search chats..."
            placeholderTextColor="#9ca3af"
            style={{
              fontFamily: "Poppins-Regular",
              paddingVertical: 0,
              lineHeight: 20,
            }}
          />
        </View>
      </View>

      {/* Chatroom Content */}
      <ScrollView className="flex-1">
        {/* CHATROOMS Section */}
        <View className="px-4 py-3">
          <Text
            className="text-gray-500 text-xs uppercase"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            CHATROOMS
          </Text>

          {/* Render chatrooms from dummy data */}
          {chatroomData
            .filter((chat) => chat.petType.includes("Lost"))
            .map((chatroom) => (
              <TouchableOpacity
                key={chatroom.id}
                onPress={() => handleRoomView(chatroom)}
                className="mt-4 border-b border-gray-100 pb-3 flex-row"
              >
                <Image
                  source={chatroom.image}
                  className="w-12 h-12 rounded-lg mr-3"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text
                      className="text-base text-gray-800"
                      style={{ fontFamily: "Poppins-SemiBold" }}
                    >
                      {chatroom.petName}
                    </Text>
                    <Text
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "Poppins-Regular" }}
                    >
                      {chatroom.time}
                    </Text>
                  </View>
                  <Text
                    className="text-xs text-[#B90000] mt-1"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    {chatroom.petType}
                  </Text>
                  <Text
                    className="text-sm text-gray-800 mt-1"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    {chatroom.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* CLAIM FOUND Section */}
        <View className="px-4 py-3">
          <Text
            className="text-gray-500 text-xs uppercase"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            CLAIM FOUND
          </Text>

          {/* Render found pets from dummy data */}
          {chatroomData
            .filter((chat) => chat.petType.includes("Found"))
            .map((chatroom) => (
              <TouchableOpacity
                key={chatroom.id}
                onPress={() => handleRoomView(chatroom)}
                className="mt-4 border-b border-gray-100 pb-3 flex-row"
              >
                <Image
                  source={chatroom.image}
                  className="w-12 h-12 rounded-lg mr-3"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text
                      className="text-base text-gray-800"
                      style={{ fontFamily: "Poppins-SemiBold" }}
                    >
                      {chatroom.petName}
                    </Text>
                    <Text
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "Poppins-Regular" }}
                    >
                      {chatroom.time}
                    </Text>
                  </View>
                  <Text
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    {chatroom.petType}
                  </Text>
                  <Text
                    className="text-sm text-gray-800 mt-1"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    {chatroom.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
