import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const router = useRouter();
  const [fabOpen, setFabOpen] = useState(false);
    const [animation] = useState(new Animated.Value(0));

  const toggleFab = () => {
    if (fabOpen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    setFabOpen(!fabOpen);
  };
  const handleReportLost = () => {
    console.log("ReportLost Screen");
    router.push("/(screens)/reportlostscreen");
  };

  const handleAISearch = () => {
    console.log("AISearch Screen");
    router.push("/(screens)/aisearchscreen");
  };

  const handleReportFound = () => {
    console.log("ReportFound Screen");
    router.push("/(screens)/reportfoundscreen");
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
            Map
          </Text>
        </View>
      </View>

      {/* Map */}
      <MapView
        style={{ flex: 1, width: "100%", height: "100%" }}
        className="flex-1"
        initialRegion={{
          latitude: 13.0159953,
          longitude: 124.0252265,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onMapReady={() => console.log("Map is ready")}
      >
        <Marker
          coordinate={{ latitude: 13.0159953, longitude: 124.0252265 }}
          title="Lost Pet"
          description="Last seen here"
        />
      </MapView>

      {/* FAB Button */}
      <View className="absolute bottom-5 right-4 items-end">
        {fabOpen && (
          <>
            <TouchableOpacity
              className="flex-row items-center bg-white rounded-[5px] px-4 py-2 mb-3 shadow-lg"
              onPress={handleAISearch}
            >
              <Feather name="search" size={20} color="#4B5563" />
              <Text
                className="ml-3 text-gray-700"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                AI Search
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white rounded-[5px] px-4 py-2 mb-3 shadow-lg"
              onPress={handleReportFound}
            >
              <Feather name="flag" size={20} color="green" />
              <Text
                className="ml-3 text-gray-700"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                Report Found
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white rounded-[5px] px-4 py-2 mb-3 shadow-lg"
              onPress={handleReportLost}
            >
              <Feather name="help-circle" size={20} color="red" />
              <Text
                className="ml-3 text-gray-700"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                Report Lost
              </Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          className="bg-white p-4 rounded-full border-2 border-amber-400"
          onPress={toggleFab}
        >
          {fabOpen ? (
            <Feather name="x" size={24} color="#FBAF02" />
          ) : (
            <PlusIcon size={24} color="#FBAF02" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
