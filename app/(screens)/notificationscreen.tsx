import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type NotificationType = "lost" | "found" | "chat";

const dummyNotifications = [
  {
    id: "1",
    type: "lost",
    title: "Lost Pet Nearby",
    message: "A Shih Tzu was reported missing 2km away.",
    time: "2 mins ago",
  },
  {
    id: "2",
    type: "found",
    title: "Found Dog Reported",
    message: "A brown dog was found near City Plaza.",
    time: "10 mins ago",
  },
  {
    id: "3",
    type: "chat",
    title: "New Chat Message",
    message: "Iriz Claire: Any updates on Mixie?",
    time: "30 mins ago",
  },
];

export default function NotificationScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | NotificationType>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(dummyNotifications);

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    Alert.alert("Delete Notifications", `Delete ${selected.length} selected?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setNotifications(
            notifications.filter((n) => !selected.includes(n.id))
          );
          setSelected([]);
        },
      },
    ]);
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
            Notification
          </Text>
        </View>
      </View>

      <View className="pt-[72px] px-4 pb-6 flex-1">
        {/* Filter buttons */}
        <View className="flex-row space-x-2 mb-4 gap-2">
          {["all", "lost", "found", "chat"].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilter(type as any)}
              className={`px-3 py-1 rounded-md border ${
                filter === type
                  ? "bg-amber-500 border-amber-500"
                  : "border-gray-300"
              }`}
            >
              <Text
                className={`text-sm ${
                  filter === type ? "text-white" : "text-gray-700"
                }`}
                style={{ fontFamily: "Poppins-Medium" }}
              >
                {type === "all"
                  ? "All"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Select All / Delete if items selected */}
        {selected.length > 0 && (
          <View className="flex-row justify-between items-center mb-3">
            <Text
              className="text-sm text-gray-600"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {selected.length} selected
            </Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity className="mr-3"
                onPress={() => setSelected(filtered.map((n) => n.id))}
              >
                <Text
                  className="text-amber-500 text-sm"
                  style={{ fontFamily: "Poppins-Medium" }}
                >
                  Select All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteSelected}>
                <Feather name="trash-2" size={18} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Notification List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => toggleSelect(item.id)}
              onPress={() => {
                if (selected.length) toggleSelect(item.id);
              }}
              className={`p-4 rounded-xl mb-3 border ${
                selected.includes(item.id)
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200"
              }`}
            >
              <View className="flex-row justify-between items-center mb-1">
                <Text
                  className="text-gray-800 text-sm"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-xs text-gray-400"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {item.time}
                </Text>
              </View>
              <Text
                className="text-gray-700 text-xs"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {item.message}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <View className="items-center mt-16">
              <Text
                className="text-gray-400"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                No notifications found.
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
