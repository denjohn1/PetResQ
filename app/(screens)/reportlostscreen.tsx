import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type PetType = 'Dog' | 'Cat' | '';
type BehaviorType = 'Hiding' | 'Wandering' | 'Injured' | '';

interface FormData {
  petType: PetType;
  name: string;
  breed: string;
  description: string;
  location: string;
  lastSeenTime: Date;
  behavior: BehaviorType;
  behaviorDetails: string;
}

interface FormErrors {
  petType: string;
  breed: string;
  location: string;
  description: string;
  lastSeenTime: string;
}

export default function ReportLostScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    petType: '',
    name: '',
    breed: '',
    description: '',
    location: '',
    lastSeenTime: new Date(),
    behavior: '',
    behaviorDetails: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    petType: '',
    breed: '',
    location: '',
    description: '',
    lastSeenTime: ''
  });
  
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorType>('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {
      petType: '',
      breed: '',
      location: '',
      description: '',
      lastSeenTime: ''
    };
    
    if (!formData.petType) {
      newErrors.petType = 'Please select a pet type';
      valid = false;
    }
    
    if (!formData.breed) {
      newErrors.breed = 'Please select a breed';
      valid = false;
    }
    
    if (!formData.location) {
      newErrors.location = 'Please set a location';
      valid = false;
    }
    
    if (!formData.description) {
      newErrors.description = 'Please provide a description';
      valid = false;
    }
    
    if (!formData.lastSeenTime) {
      newErrors.lastSeenTime = 'Please select last seen time';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
      // router.push('/success-screen');
    }
  };

  const handlePetTypeSelect = (type: PetType) => {
    setFormData({...formData, petType: type});
    setErrors({...errors, petType: ''});
  };

  const handleBehaviorSelect = (behavior: BehaviorType) => {
    setSelectedBehavior(behavior);
    setFormData({...formData, behavior});
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setFormData({...formData, lastSeenTime: selectedDate});
      setErrors({...errors, lastSeenTime: ''});
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
            Report Lost Pet
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1 px-4 py-4" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {/* Pet Type Section */}
          <View className="mb-6">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Pet Type
            </Text>
            <View className="flex-row space-x-4 gap-2">
              <TouchableOpacity 
                className={`border rounded-lg px-4 py-3 flex-1 items-center ${
                  formData.petType === 'Dog' 
                    ? 'border-amber-500 bg-amber-50' 
                    : errors.petType 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                }`}
                onPress={() => handlePetTypeSelect('Dog')}
              >
                <Text style={{ fontFamily: "Poppins-Regular" }}>Dog</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`border rounded-lg px-4 py-3 flex-1 items-center ${
                  formData.petType === 'Cat' 
                    ? 'border-amber-500 bg-amber-50' 
                    : errors.petType 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                }`}
                onPress={() => handlePetTypeSelect('Cat')}
              >
                <Text style={{ fontFamily: "Poppins-Regular" }}>Cat</Text>
              </TouchableOpacity>
            </View>
            {errors.petType ? (
              <Text className="text-red-500 text-xs mt-1" style={{ fontFamily: "Poppins-Regular" }}>
                {errors.petType}
              </Text>
            ) : null}
          </View>

          {/* Name Input */}
          <View className="mb-6">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Name
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="e.g. Max"
              placeholderTextColor="#9ca3af"
              style={{ fontFamily: "Poppins-Regular" }}
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
            />
          </View>

          {/* Breed Input */}
          <View className="mb-6">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Breed
            </Text>
            <TouchableOpacity 
              className={`border rounded-lg px-4 py-3 flex-row justify-between items-center ${
                errors.breed ? 'border-red-500' : 'border-gray-300'
              }`}
              onPress={() => console.log('Open breed selector')}
            >
              <Text 
                className={`${formData.breed ? 'text-gray-800' : 'text-gray-400'}`} 
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {formData.breed || 'Select Breed'}
              </Text>
              <Feather name="chevron-down" size={20} color="#9ca3af" />
            </TouchableOpacity>
            {errors.breed ? (
              <Text className="text-red-500 text-xs mt-1" style={{ fontFamily: "Poppins-Regular" }}>
                {errors.breed}
              </Text>
            ) : null}
          </View>

          {/* Description Input */}
          <View className="mb-6">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Description
            </Text>
            <TextInput
              className={`border rounded-lg px-4 py-3 h-20 text-align-top ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., has a blue collar"
              placeholderTextColor="#9ca3af"
              multiline
              style={{ fontFamily: "Poppins-Regular" }}
              value={formData.description}
              onChangeText={(text) => {
                setFormData({...formData, description: text});
                setErrors({...errors, description: ''});
              }}
            />
            {errors.description ? (
              <Text className="text-red-500 text-xs mt-1" style={{ fontFamily: "Poppins-Regular" }}>
                {errors.description}
              </Text>
            ) : null}
          </View>

          {/* Location Input */}
          <View className="mb-6">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Location
            </Text>
            <TouchableOpacity 
              className={`border rounded-lg px-4 py-3 flex-row justify-between items-center ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              onPress={() => console.log('Open location picker')}
            >
              <Text 
                className={`${formData.location ? 'text-gray-800' : 'text-gray-400'}`} 
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {formData.location || 'Set Location'}
              </Text>
              <Feather name="map-pin" size={20} color="#9ca3af" />
            </TouchableOpacity>
            {errors.location ? (
              <Text className="text-red-500 text-xs mt-1" style={{ fontFamily: "Poppins-Regular" }}>
                {errors.location}
              </Text>
            ) : null}
          </View>

          {/* Last Seen Time Input */}
          <View className="mb-6">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Last Seen Time
            </Text>
            <TouchableOpacity 
              className={`border rounded-lg px-4 py-3 flex-row justify-between items-center ${
                errors.lastSeenTime ? 'border-red-500' : 'border-gray-300'
              }`}
              onPress={() => setShowTimePicker(true)}
            >
              <Text 
                className={formData.lastSeenTime ? "text-gray-800" : "text-gray-400"} 
                style={{ fontFamily: "Poppins-Regular" }}
              >
                {formData.lastSeenTime ? formatTime(formData.lastSeenTime) : "Select time"}
              </Text>
              <Feather name="clock" size={20} color="#9ca3af" />
            </TouchableOpacity>
            {errors.lastSeenTime ? (
              <Text className="text-red-500 text-xs mt-1" style={{ fontFamily: "Poppins-Regular" }}>
                {errors.lastSeenTime}
              </Text>
            ) : null}
            {showTimePicker && (
              <DateTimePicker
                value={formData.lastSeenTime}
                mode="time"
                display="spinner"
                onChange={onTimeChange}
              />
            )}
          </View>

          {/* Upload Image */}
          <View className="mb-6">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Upload Image
            </Text>
            <TouchableOpacity className="border border-gray-300 rounded-lg px-4 py-8 items-center justify-center">
              <Feather name="image" size={24} color="#9ca3af" />
              <Text className="text-gray-400 mt-2" style={{ fontFamily: "Poppins-Regular" }}>Select an image</Text>
            </TouchableOpacity>
          </View>

          {/* Behavioral Context */}
          <View className="mb-8">
            <Text className="text-gray-800 text-base mb-2" style={{ fontFamily: "Poppins-SemiBold" }}>
              Behavioral Context
            </Text>
            
            {/* Horizontal buttons */}
            <View className="flex-row space-x-2 mb-3 gap-2">
              <TouchableOpacity 
                className={`border rounded-lg px-4 py-3 flex-1 items-center ${
                  selectedBehavior === 'Hiding' ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
                }`}
                onPress={() => handleBehaviorSelect('Hiding')}
              >
                <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>Hiding</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`border rounded-lg px-4 py-3 flex-1 items-center ${
                  selectedBehavior === 'Wandering' ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
                }`}
                onPress={() => handleBehaviorSelect('Wandering')}
              >
                <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>Wandering</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`border rounded-lg px-4 py-3 flex-1 items-center ${
                  selectedBehavior === 'Injured' ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
                }`}
                onPress={() => handleBehaviorSelect('Injured')}
              >
                <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>Injured</Text>
              </TouchableOpacity>
            </View>
            
            {/* Additional input field below */}
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Additional behavioral details..."
              placeholderTextColor="#9ca3af"
              style={{ fontFamily: "Poppins-Regular" }}
              value={formData.behaviorDetails}
              onChangeText={(text) => setFormData({...formData, behaviorDetails: text})}
            />
          </View>
        </ScrollView>

        {/* Fixed Submit Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200">
          <TouchableOpacity 
            className="bg-amber-500 rounded-lg py-4 items-center justify-center"
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text className="text-white text-base" style={{ fontFamily: "Poppins-SemiBold" }}>
              Submit Report
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}