import { Stack } from "expo-router";
import {Tabs} from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "@/context/ThemeContext";

export default function RootLayout() {

  const {colors} = useTheme()

  return (
      <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: 
        {
          backgroundColor: colors.surface,
          borderColor: colors.border
          //адаптивна висота та відступи під iOS/Android.
        }
      }} >
      <Tabs.Screen name="index" options={{
        title: "Todo",
        tabBarIcon: ({color, size}) => <Octicons name="tasklist" size={size} color={color} />
      }}/>
       <Tabs.Screen name="stats" options={{
        title: "Statistics",
        tabBarIcon: ({color, size}) => <Ionicons name="stats-chart-sharp" size={size} color={color} />
      }}/>
      <Tabs.Screen name="settings" options={{
        title: "Settings",
        tabBarIcon: ({color, size}) => <Octicons name="gear" size={size} color={color} />
      }}/>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}