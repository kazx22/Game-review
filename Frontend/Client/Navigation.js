import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Profile from "./screens/Profile";
import Game from "./screens/Game";
import Logout from "./screens/Logout";
const BottomTabs = createBottomTabNavigator();

export function ManageTabs() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Logout") {
            iconName = focused ? "logout" : "logout";
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
        name="Logout"
        component={Logout}
        options={{ headerShown: false }}
      />
    </BottomTabs.Navigator>
  );
}
