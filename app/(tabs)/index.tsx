import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BellIcon, MapPinIcon, PlusIcon } from "react-native-heroicons/outline";

// Dummy data for all pets
const allPets = [
  // Lost Pets
  {
    id: "1",
    name: "Mixie",
    breed: "Shih Tzu",
    distance: "2km",
    urgency: "High Urgency",
    urgencyColor: "bg-red-100 text-red-600",
    type: "lost",
    category: "dog",
    owner: "Iriz Claire Hagosojos",
    timeAgo: "1h ago",
    description: "friendly and wearing a blue collar",
    behavior: "Wandering",
    lastSeenTime: "1 hr ago",
    location: { latitude: 12.973, longitude: 123.99 },
    image: require("@/assets/images/mixie.jpg"),
  },
  {
    id: "2",
    name: "Rara",
    breed: "French Bulldog",
    distance: "500m",
    urgency: "Medium Urgency",
    urgencyColor: "bg-orange-100 text-orange-500",
    type: "lost",
    category: "dog",
    owner: "John Doe",
    timeAgo: "2h ago",
    description: "shy but approachable",
    behavior: "Running",
    lastSeenTime: "2 hrs ago",
    location: { latitude: 12.975, longitude: 123.992 },
    image: require("@/assets/images/rara.jpg"),
  },
  // Found Pets
  {
    id: "5",
    name: "Buddy",
    breed: "Golden Retriever",
    distance: "3km",
    urgency: "Found Pet",
    urgencyColor: "bg-green-100 text-green-600",
    type: "found",
    category: "dog",
    owner: "Jane Smith",
    timeAgo: "30m ago",
    description: "friendly with no collar",
    behavior: "Approachable",
    foundTime: "30 mins ago",
    location: { latitude: 12.978, longitude: 123.995 },
    image: require("@/assets/images/buddy.png"),
  },
];

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

// Define the interface for activeFilters
interface Filters {
  type: "lost" | "found";
  category: "dog" | "cat" | null;
}

export default function Index() {
  const router = useRouter();
  const [fabOpen, setFabOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [activeFilters, setActiveFilters] = useState<Filters>({
    type: "lost", // Default to showing lost pets
    category: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  const handlePetDetails = (pet: any) => {
    console.log("Pet Details Screen");
    router.push({
      pathname: "/(screens)/petdetailsscreen",
      params: {
        ...pet,
        image: pet.image ? `image_${pet.id}` : null,
      },
    });
  };

  const handleNotificaiotn = () => {
    console.log("Notification Screen");
    router.push("/(screens)/notificationscreen");
  };

  const handleJoinChatroom = (pet: any) => {
    console.log("Join Chatroom for pet:", pet.name);
    // Find the corresponding chatroom by pet id
    const chatroom = chatroomData.find((chat) => chat.id === pet.id);
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
      console.log("No chatroom found for pet id:", pet.id);
      // Optionally, navigate to chatroomscreen as fallback
      router.push("/(tabs)/chatroomscreen");
    }
  };

  const claimPet = () => {
    console.log("Join Chatroom");
    router.push("/(screens)/claimpetscreen");
  };

  const handleFilter = (
    filterType: "type" | "category",
    value: string | null
  ) => {
    setActiveFilters((prev: Filters) => {
      if (filterType === "type") {
        return { ...prev, type: value as "lost" | "found" };
      } else if (filterType === "category") {
        // Toggle category filter - if same category is clicked again, remove it
        return {
          ...prev,
          category: prev.category === value ? null : (value as "dog" | "cat"),
        };
      }
      return prev;
    });
  };

  const aiSearchStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
    ],
    opacity: animation,
  };

  const reportFoundStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120],
        }),
      },
    ],
    opacity: animation,
  };

  // Filter pets based on active filters and search query
  const filteredPets = allPets.filter((pet) => {
    const matchesType = pet.type === activeFilters.type;
    const matchesCategory =
      !activeFilters.category || pet.category === activeFilters.category;
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Fixed Header - Location and Notification */}
      <View className="bg-white z-10">
        <View className="flex-row justify-between items-center px-4 pt-2 pb-2 border-b border-gray-100">
          <View className="flex-row items-center">
            <View className="ml-2">
              <Text
                className="text-gray-500 text-xs"
                style={{ fontFamily: "Poppins-Medium" }}
              >
                LOCATION
              </Text>
              <Text
                className="text-[13px]"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                San Isidro{" "}
                <Text
                  className="text-amber-500"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  (Bacon District)
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleNotificaiotn}>
            <BellIcon size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Welcome Message */}
        <View className="px-4 mt-6">
          <Text className="text-2xl" style={{ fontFamily: "Poppins-Bold" }}>
            Hello there,{" "}
            <Text
              className="text-amber-500"
              style={{ fontFamily: "Poppins-Bold" }}
            >
              Den
            </Text>
          </Text>
          <Text
            className="text-gray-600 mt-1"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Let's help reunite pets with their families.
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-4 pt-3">
          <View className="flex-row items-center bg-gray-50 rounded-lg px-5 py-5">
            <Feather name="search" size={20} color="#FBAF02" />
            <TextInput
              className="flex-1 ml-2 text-sm text-gray-800"
              placeholder="Search report..."
              placeholderTextColor="#9ca3'a3af"
              style={{
                fontFamily: "Poppins-Regular",
                paddingVertical: 0,
                lineHeight: 20,
              }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Lost / Found Tabs */}
        <View className="px-4 mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 5 }}
          >
            <View className="flex-row gap-2">
              <TouchableOpacity
                className={`border rounded-md px-6 py-2 ${
                  activeFilters.type === "lost"
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-300"
                }`}
                onPress={() => handleFilter("type", "lost")}
              >
                <Text
                  className={`${
                    activeFilters.type === "lost"
                      ? "text-amber-600"
                      : "text-gray-800"
                  }`}
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Lost Pets
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`border rounded-md px-6 py-2 ${
                  activeFilters.type === "found"
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-300"
                }`}
                onPress={() => handleFilter("type", "found")}
              >
                <Text
                  className={`${
                    activeFilters.type === "found"
                      ? "text-amber-600"
                      : "text-gray-800"
                  }`}
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Found Pets
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`border rounded-md px-6 py-2 ${
                  activeFilters.category === "dog"
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-300"
                }`}
                onPress={() => handleFilter("category", "dog")}
              >
                <Text
                  className={`${
                    activeFilters.category === "dog"
                      ? "text-amber-600"
                      : "text-gray-800"
                  }`}
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Dog
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`border rounded-md px-6 py-2 ${
                  activeFilters.category === "cat"
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-300"
                }`}
                onPress={() => handleFilter("category", "cat")}
              >
                <Text
                  className={`${
                    activeFilters.category === "cat"
                      ? "text-amber-600"
                      : "text-gray-800"
                  }`}
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Cat
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Pets Section Header */}
        <View className="px-4 mt-6">
          <View className="flex-row items-center">
            <MapPinIcon size={14} color="#FF0000" />
            <Text
              className="ml-1 font-medium text-gray-800"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {activeFilters.type === "lost"
                ? "Reported Lost Pets"
                : "Reported Found Pets"}
            </Text>
          </View>
        </View>

        {/* Pet Cards List */}
        <View className="px-4 mt-4 pb-20">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <View
                key={pet.id}
                className="mb-6 border px-2 py-2 border-gray-200 rounded-lg overflow-hidden"
              >
                <View className="p-3">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text
                        className="text-[16px]"
                        style={{ fontFamily: "Poppins-Medium" }}
                      >
                        {pet.name}
                      </Text>
                      <Text
                        className="text-gray-600 text-[13px] mt-0"
                        style={{ fontFamily: "Poppins-Regular" }}
                      >
                        {pet.breed}
                      </Text>
                      <Text
                        className="text-gray-500 text-[13px] mt-0.5"
                        style={{ fontFamily: "Poppins-Regular" }}
                      >
                        {pet.type === "lost" ? "Last seen" : "Found"}{" "}
                        {pet.distance} from you
                      </Text>
                    </View>
                    <View
                      className={`px-2 py-1 rounded ${
                        pet.urgencyColor.split(" ")[0]
                      }`}
                    >
                      <Text
                        className={pet.urgencyColor.split(" ")[1]}
                        style={{ fontFamily: "Poppins-Medium", fontSize: 11 }}
                      >
                        {pet.urgency}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Image */}
                <Image
                  source={pet.image}
                  className="h-48 w-full rounded-md mx-3 object-cover"
                  resizeMode="cover"
                />

                <View className="p-3">
                  <View className="flex-row mt-1 gap-2">
                    <TouchableOpacity
                      className="flex-1 border border-amber-500 bg-amber-500 py-2.5 rounded-md items-center"
                      onPress={() => handlePetDetails(pet)}
                    >
                      <Text
                        className="text-white"
                        style={{ fontFamily: "Poppins-SemiBold", fontSize: 13 }}
                      >
                        View Details
                      </Text>
                    </TouchableOpacity>
                    {pet.type === "lost" ? (
                      <TouchableOpacity
                        className="flex-1 border border-gray-300 py-2.5 rounded-md items-center"
                        onPress={() => handleJoinChatroom(pet)}
                      >
                        <Text
                          className="text-gray-800"
                          style={{ fontFamily: "Poppins-Medium", fontSize: 13 }}
                        >
                          Join Chatroom
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        className="flex-1 border border-green-500 bg-white py-2.5 rounded-md items-center"
                        onPress={claimPet}
                      >
                        <Text
                          className="text-black"
                          style={{ fontFamily: "Poppins-Medium", fontSize: 13 }}
                        >
                          Claim Pet
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center py-10">
              <Text
                className="text-gray-500"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                No pets found matching your filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

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