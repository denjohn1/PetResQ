import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "Find Lost Pets Smarter",
    description:
      "Use AI-driven search strategies based on real animal behavior to find your pets faster.",
    image: require("../../assets/images/slide1.jpg"),
  },
  {
    key: "2",
    title: "Community-Powered Rescue",
    description:
      "Connect with rescuers nearby through real-time notifications and team up to bring pets home.",
    image: require("../../assets/images/slide2.jpg"),
  },
  {
    key: "3",
    title: "Coordinate in Real-Time",
    description:
      "Chat with rescuers, share sightings, and get updates instantly in our rescue coordination chatroom.",
    image: require("../../assets/images/slide3.jpg"),
  },
];

export default function WelcomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlide + 1, animated: true });
    } else {
      navigation.navigate("loginscreen" as never); // Updated to match the route name in AuthLayout
    }
  };

  return (
    <View className="flex-1 bg-white pt-16">

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) =>
          setCurrentSlide(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1 justify-center items-center">
            <Image
              source={item.image}
              className="w-64 h-64 mb-8 rounded-[10px]"
              resizeMode="contain"
            />
            <Text
              className="text-2xl text-black text-center mb-4"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {item.title}
            </Text>
            <Text
              className="text-gray-500 text-center text-base px-6 mb-10"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex-row justify-center mb-10">
        {slides.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${
              i === currentSlide ? "bg-yellow-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleNext}
        className="bg-yellow-500 rounded-xl py-4 mx-6 mb-4"
      >
        <Text
          className="text-white text-center text-base"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}