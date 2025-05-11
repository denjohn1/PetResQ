import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AISearchScreen() {
  const router = useRouter();

  const [pets, setPets] = useState([
    {
      id: "1",
      name: "Mixie",
      breed: "Shih Tzu",
      behavior: "Wandering",
      lastSeen: "Park, 3 hours ago",
      selected: false,
    },
    {
      id: "2",
      name: "Mittens",
      breed: "Siamese Cat",
      behavior: "Hiding",
      lastSeen: "Backyard, 5 hours ago",
      selected: false,
    },
    {
      id: "3",
      name: "Rocky",
      breed: "Labrador",
      behavior: "Running",
      lastSeen: "Mall, 1 day ago",
      selected: false,
    },
  ]);

  const handleSelect = (id: string) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === id ? { ...pet, selected: true } : { ...pet, selected: false }
      )
    );
  };

  const handleStartSearch = () => {
    const selectedPet = pets.find((pet) => pet.selected);
    if (selectedPet) {
      router.push("/(screens)/aimapscreen");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with back button */}
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

      <View className="flex-1 px-4 py-4">
        <Text
          className="text-lg mb-1"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          Which pet do you want to find?
        </Text>
        <Text
          className="text-amber-500 mb-4"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Select a reported lost pet to start AI-assisted search.
        </Text>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {pets.map((pet) => (
            <TouchableOpacity
              key={pet.id}
              onPress={() => handleSelect(pet.id)}
              className={`mb-4 p-4 rounded-lg border relative ${
                pet.selected ? "border-amber-500" : "border-gray-200"
              }`}
            >
              {/* Checkmark positioned absolutely in bottom-right corner */}
              {pet.selected && (
                <View className="absolute bottom-3 right-3 bg-green-500 rounded-full p-1 z-10">
                  <Feather name="check" size={14} color="white" />
                </View>
              )}

              <View className="flex-row justify-between items-start">
                <View>
                  <Text
                    className="text-lg"
                    style={{ fontFamily: "Poppins-SemiBold" }}
                  >
                    {pet.name}
                  </Text>

                  <View className="border border-amber-400 bg-white rounded-md px-3 py-1 self-start">
                    <Text
                      className="text-amber-500 text-xs"
                      style={{ fontFamily: "Poppins-Medium" }}
                    >
                      Behavior: {pet.behavior}
                    </Text>
                  </View>

                  <Text
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    Last seen: {pet.lastSeen}
                  </Text>
                </View>

                <View className="items-end">
                  <Text
                    className="text-xs text-gray-500 mb-1"
                    style={{ fontFamily: "Poppins-Regular" }}
                  >
                    BREED
                  </Text>
                  <Text
                    className="text-right"
                    style={{ fontFamily: "Poppins-Medium" }}
                  >
                    {pet.breed}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Fixed Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white">
        <TouchableOpacity
          onPress={handleStartSearch}
          className="bg-amber-500 rounded-lg py-4 items-center justify-center"
          activeOpacity={0.8}
        >
          <Text
            className="text-white text-base"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Start AI Search
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
