import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons"; // Example of using MaterialIcons, you can replace it with your preferred icon library
import Profile from "./screens/Profile";
import Maps from "./screens/Maps";
import Game from "./screens/Game";

const BottomTabs = createBottomTabNavigator();

export function ManageTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Maps") {
            iconName = focused ? "map" : "map";
          } else if (route.name === "Game") {
            iconName = focused ? "gamepad" : "gamepad";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTabs.Screen
        name="Game"
        component={Game}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="Maps"
        component={Maps}
        options={{ headerShown: false }}
      />
    </BottomTabs.Navigator>
  );
}
