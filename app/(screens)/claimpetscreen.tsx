import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

type Step = 0 | 1 | 2 | 3;

export default function ClaimPetScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const [petName, setPetName] = useState("Mixie");
  const [verificationStarted, setVerificationStarted] = useState(false);

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => (prevStep + 1) as Step);
    }
  };

  const startVerification = () => {
    setVerificationStarted(true);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    // Initial verification prompt screen
    if (currentStep === 0) {
      return (
        <View className="px-4 pt-6 flex-1 items-center justify-center">
          <Text 
            className="text-lg text-gray-800 mb-2 text-center" 
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Verify You Are {petName}'s Owner
          </Text>
          
          <Text 
            className="text-amber-500 mb-6 text-center" 
            style={{ fontFamily: "Poppins-Regular" }}
          >
            To ensure your pet is safely returned, please complete this
            quick verification process.
          </Text>
          
          <View className="w-full mb-4">
            <View className="flex-row items-center mb-2">
              <Text className="text-gray-800 ml-4" style={{ fontFamily: "Poppins-Regular" }}>
                Your Identity Matters
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Text className="text-gray-800 ml-4" style={{ fontFamily: "Poppins-Regular" }}>
                Helps prevent fraud or pet theft
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            className="border border-gray-300 rounded-xl py-4 px-6 w-full items-center mt-2"
            onPress={startVerification}
          >
            <Text 
              className="text-gray-800" 
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Start Verification
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Once verification has started, show the step-based UI
    switch (currentStep) {
      case 1:
        return (
          <View className="px-4 pt-6 flex-1">
            <Text 
              className="text-lg text-gray-800 mb-6" 
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              Step 1: Upload a Recent Photo of {petName}
            </Text>
            
            <TouchableOpacity className="border border-gray-300 rounded-xl p-4 mb-3 items-center justify-center">
              <Text className="text-gray-500 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Upload an image
              </Text>
              <Feather name="upload" size={20} color="#F59E0B" />
            </TouchableOpacity>
            
            <Text 
              className="text-xs text-amber-500 mb-4" 
              style={{ fontFamily: "Poppins-Regular" }}
            >
              Choose a photo showing your pet clearly, ideally taken before they went missing.
            </Text>
            
            <View className="bg-gray-200 h-64 w-full rounded-lg mb-6 items-center justify-center">
              <Text className="text-gray-400" style={{ fontFamily: "Poppins-Regular" }}>Pet photo placeholder</Text>
            </View>
          </View>
        );
      
      case 2:
        return (
          <ScrollView className="px-4 pt-6 flex-1">
            <Text 
              className="text-lg text-gray-800 mb-6" 
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              Step 2: Answer a Secret Question
            </Text>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Q1. What nickname do you call {petName} at home?
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-700"
                placeholder="Your answer"
                style={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Q2. Does {petName} have any special markings or colors?
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-700"
                placeholder="Your answer"
                style={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Q3. Was {petName} wearing anything (collar, tag, outfit) when lost?
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-700"
                placeholder="Your answer"
                style={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Q4. Where was {petName} last seen before being lost?
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-700"
                placeholder="Your answer"
                style={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Q5. Was {petName} groomed or shaved recently?
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-700"
                placeholder="Your answer"
                style={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
          </ScrollView>
        );
      
      case 3:
        return (
          <View className="px-4 pt-6 flex-1">
            <Text 
              className="text-lg text-gray-800 mb-6" 
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              Step 3: Confirm Your Identity
            </Text>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Fullname
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-400"
                placeholder="Enter your fullname"
                style={{ fontFamily: "Poppins-Regular" }}
                editable={false}
              />
            </View>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Phone Number
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-700"
                placeholder="Enter your phone number"
                style={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
            
            <View className="mb-5">
              <Text className="text-gray-700 mb-2" style={{ fontFamily: "Poppins-Regular" }}>
                Email Address
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-3 text-gray-700"
                placeholder="Enter your email address"
                style={{ fontFamily: "Poppins-Regular" }}
              />
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-200 px-4 pt-3 pb-2 flex-row items-center bg-white">
        <TouchableOpacity
          onPress={() => {
            if (currentStep > 1) {
              setCurrentStep(prev => (prev - 1) as Step);
            } else if (currentStep === 1) {
              // Go back to verification start screen
              setCurrentStep(0);
            } else {
              router.back();
            }
          }}
          className="absolute left-4 z-10"
        >
          <Feather name="chevron-left" size={24} color="#262626" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <View className="w-5 h-1 bg-amber-500 rounded-full mb-1" />
          <Text
            className="text-[15px] text-gray-800"
            style={{ fontFamily: "Poppins-SemiBold" }}
          >
            Claim Pet
          </Text>
        </View>
      </View>

      {/* Step Content */}
      {renderStepContent()}

      {/* Continue Button (shown on steps 1-2) */}
      {currentStep > 0 && currentStep < 3 && (
        <View className="px-4 pb-6">
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-amber-500 rounded-xl py-4 items-center"
          >
            <Text
              className="text-white font-medium"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Confirm Details button for step 3 */}
      {currentStep === 3 && (
        <View className="px-4 pb-6">
          <TouchableOpacity
            onPress={() => console.log("Verification completed")}
            className="bg-amber-500 rounded-xl py-4 items-center"
          >
            <Text
              className="text-white font-medium"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              Confirm Details
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}