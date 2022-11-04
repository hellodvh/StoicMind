import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonNew from "../components/ButtonNew";

import HomeScreen from "./HomeScreen/HomeScreen";
import JournalScreen from "./JournalScreen/JournalScreen";
import NewScreen from "./NewScreen/NewScreen";
import HabitScreen from "./HabitScreen/HabitScreen";
import SettingsScreen from "./SettingsScreen/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Journal") {
            iconName = focused ? "journal" : "journal-outline";
          } else if (route.name === "Habit") {
            iconName = focused ? "checkbox" : "checkbox-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#258671",
        tabBarInactiveTintColor: "#B3E4C5",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />

      <Tab.Screen
        name="New"
        component={NewScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonNew size={size} color={color} focused={focused} />
          ),
        }}
      />

      <Tab.Screen name="Habit" component={HabitScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
