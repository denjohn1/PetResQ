import { Tabs } from 'expo-router';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  HomeIcon,
  MapIcon
} from 'react-native-heroicons/outline';
import {
  ChatBubbleOvalLeftEllipsisIcon as ChatIconSolid,
  Cog6ToothIcon as CogIconSolid,
  HomeIcon as HomeIconSolid,
  MapIcon as MapIconSolid
} from 'react-native-heroicons/solid';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{  
        headerShown: false,
        tabBarActiveTintColor: '#FBAF02',
        tabBarInactiveTintColor: '#262626',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
          height: 55,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <HomeIconSolid color={color} size={28} /> : 
              <HomeIcon color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapscreen"
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <MapIconSolid color={color} size={28} /> : 
              <MapIcon color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatroomscreen"
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <ChatIconSolid color={color} size={28} /> : 
              <ChatBubbleOvalLeftEllipsisIcon color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="settingsscreen"
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? 
              <CogIconSolid color={color} size={28} /> : 
              <Cog6ToothIcon color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
} 