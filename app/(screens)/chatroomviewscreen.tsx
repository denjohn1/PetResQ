import { Entypo, Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatroomViewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const messages = params.messages ? JSON.parse(params.messages as string) : [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.replace('/(tabs)/chatroomscreen')}>
          <Feather name="chevron-left" size={20} color="#FBAF02"/>
        </TouchableOpacity>
        <View className="flex-1 ml-2">
          <Text
            style={{ fontFamily: "Poppins-SemiBold" }}
            className="text-base text-gray-900"
          >
            {params.petName}
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-xs text-[#B90000]"
          >
            {params.petType}
          </Text>
        </View>
        <Entypo name="dots-three-vertical" size={16} color="#000" />
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-4 py-4">
        <Text
          style={{ fontFamily: "Poppins-Medium" }}
          className="text-center text-xs text-amber-500 mb-2"
        >
          created by @ic_hagosojos
        </Text>

        {/* Render messages */}
        {messages.map((msg: any, index: number) => (
          <View className="flex-row mb-4" key={index}>
            <View className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
            <View className="bg-gray-50 px-4 py-3 rounded-xl flex-1">
              <Text
                style={{ fontFamily: "Poppins-Medium" }}
                className="text-xs text-gray-800 mb-1"
              >
                {msg.user}
              </Text>
              <Text
                style={{ fontFamily: "Poppins-Regular" }}
                className="text-sm text-gray-800 mb-2"
              >
                {msg.message}
              </Text>
              {msg.image && (
                <Image 
                  source={msg.image} 
                  className="w-full h-48 rounded-xl" 
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        ))}

        {/* Join prompt */}
        <Text
          style={{ fontFamily: "Poppins-Regular" }}
          className="text-center text-xs text-gray-500 mt-2"
        >
          @johndoe join the chatroom
        </Text>
      </ScrollView>

      {/* Input box */}
      <View className="flex-row items-center px-4 py-3 border-t border-gray-200">
        <TextInput
          placeholder="Message"
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 pt-4 text-sm text-gray-800"
          style={{ fontFamily: "Poppins-Regular" }}
        />
        <TouchableOpacity className="ml-3">
          <Feather name="send" size={20} color="#FBAF02" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}