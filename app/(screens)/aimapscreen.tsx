import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function AiMapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showPredictions, setShowPredictions] = useState(true);

  // Extract pet data from params
  const pet = {
    name: params.name as string,
    behavior: params.behavior as string,
    lastSeen: params.lastSeen as string,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-200 px-4 pt-3 pb-2 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-4 z-10"
        >
          <Feather name="chevron-left" size={24} color="#262626" />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <View className="w-5 h-1 bg-amber-500 rounded-[5px]" />
          <Text
            className="text-[15px] text-gray-800"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            AI Search
          </Text>
        </View>
      </View>

      {/* Pet Info Card */}
      <View className="absolute top-20 left-4 right-4 z-10 bg-white rounded-xl shadow p-3 flex-row items-center">
        <Image
          source={{ uri: "https://place-puppy.com/100x100" }}
          className="w-16 h-16 rounded-lg"
        />
        <View className="ml-3">
          <Text
            className="text-sm font-semibold text-gray-800"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            {pet.name}
          </Text>
          <View className="flex-row items-center mt-1">
            <Text
              className="text-[11px] text-amber-500 border border-amber-400 px-2 py-[1px] rounded-md"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Behavior: {pet.behavior}
            </Text>
          </View>
          <Text
            className="text-xs text-red-500 mt-1"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Last seen: {pet.lastSeen}
          </Text>
        </View>
      </View>

      {/* Map */}
      <MapView
        style={{ flex: 1, width: "100%" }}
        className="flex-1"
        initialRegion={{
          latitude: 13.0159953,
          longitude: 124.0252265,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Last Seen Marker */}
        <Marker
          coordinate={{ latitude: 13.0159953, longitude: 124.0252265 }}
          title="Last Seen"
          description="Near Food Court"
          pinColor="red" // Optional: Use a distinct color for clarity
        />

        {/* Suggested markers */}
        {[
          {
            latitude: 13.0162953,
            longitude: 124.0255265,
            title: "Suggested: Small Park",
          },
          {
            latitude: 13.0156953,
            longitude: 124.0249265,
            title: "Suggested: Food Court",
          },
          {
            latitude: 13.0164953,
            longitude: 124.0247265,
            title: "Suggested: Nearby Street",
          },
        ].map((location, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            pinColor="blue" // Optional: Use a different color for suggested markers
          />
        ))}
      </MapView>

      {/* Refresh AI Search Button */}
      <TouchableOpacity
        className={`absolute left-5 right-5 bg-white py-3 rounded-xl shadow items-center border border-amber-500 ${
          showPredictions ? "bottom-[185px]" : "bottom-[80px]"
        }`}
      >
        <Text
          className="text-gray-800 font-medium"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          Refresh AI Search
        </Text>
      </TouchableOpacity>

      {/* Smart Prediction List */}
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-lg max-h-[50%]">
        <TouchableOpacity
          onPress={() => setShowPredictions(!showPredictions)}
          className="flex-row justify-between items-center mb-3"
        >
          <Text
            className="text-gray-800 text-base"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Smart Prediction List
          </Text>
          <Feather
            name={showPredictions ? "chevron-down" : "chevron-up"}
            size={18}
            color="gray"
          />
        </TouchableOpacity>

        {showPredictions && (
          <ScrollView className="space-y-2">
            {[
              { label: "Small Park", probability: 70 },
              { label: "Food Court", probability: 55 },
            ].map((item, idx) => (
              <View
                key={idx}
                className="flex-row justify-between items-center px-4 py-3 bg-gray-100 rounded-xl mb-2"
              >
                <Text
                  className="text-gray-700"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {item.label} ({item.probability}% probability)
                </Text>
                <TouchableOpacity>
                  <Text
                    className="text-amber-500 font-medium"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    Navigate
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
