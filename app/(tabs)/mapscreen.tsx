import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import MapView, { Marker } from "react-native-maps";

// Define the type for userLocation
type LocationRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

// Define the type for dummy markers
type DummyMarker = {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  type: "Lost" | "Found";
};

export default function MapScreen() {
  const router = useRouter();
  const [fabOpen, setFabOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [userLocation, setUserLocation] = useState<LocationRegion | null>(null);

  // Dummy coordinates for lost/found reports in Casiguran, Bacon, Gubat, and Irosin, on land
  const dummyMarkers: DummyMarker[] = [
    {
      latitude: 12.8740,
      longitude: 124.0090,
      title: "Lost Item",
      description: "Lost wallet in Casiguran Town Center",
      type: "Lost",
    },
    {
      latitude: 12.8650,
      longitude: 124.0150,
      title: "Found Item",
      description: "Found keys in Barangay Boton, Casiguran",
      type: "Found",
    },
    {
      latitude: 13.0370,
      longitude: 124.0400,
      title: "Lost Item",
      description: "Lost phone in Bacon Poblacion",
      type: "Lost",
    },
    {
      latitude: 13.0100,
      longitude: 124.0250,
      title: "Found Item",
      description: "Found bag in Barangay San Roque, Bacon",
      type: "Found",
    },
    {
      latitude: 12.9170,
      longitude: 124.1230,
      title: "Lost Item",
      description: "Lost watch in Gubat Town Center",
      type: "Lost",
    },
    {
      latitude: 12.9050,
      longitude: 124.1350,
      title: "Found Item",
      description: "Found sunglasses at Rizal Beach, Gubat",
      type: "Found",
    },
    {
      latitude: 12.7030,
      longitude: 124.0350,
      title: "Lost Item",
      description: "Lost laptop in Irosin Town Center",
      type: "Lost",
    },
    {
      latitude: 12.7100,
      longitude: 124.0400,
      title: "Found Item",
      description: "Found book in Barangay San Juan, Irosin",
      type: "Found",
    },
    {
      latitude: 12.8760,
      longitude: 124.0070,
      title: "Lost Item",
      description: "Lost ring in Barangay Adovis, Casiguran",
      type: "Lost",
    },
    {
      latitude: 12.9200,
      longitude: 124.1100,
      title: "Found Item",
      description: "Found jacket in Barangay Manapao, Gubat",
      type: "Found",
    },
  ];

  // Request location permissions and get user's location
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to show your current location.",
            [{ text: "OK" }]
          );
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        });
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Unable to fetch location. Please try again.");
      }
    })();
  }, []);

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
        region={
          userLocation || {
            latitude: 12.9700,
            longitude: 124.0050,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }
        }
        showsUserLocation={true}
        onMapReady={() => console.log("Map is ready")}
      >
        {/* User's Location Marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor="blue"
          />
        )}

        {/* Dummy Lost/Found Markers */}
        {dummyMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            pinColor={marker.type === "Lost" ? "red" : "green"}
          />
        ))}
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