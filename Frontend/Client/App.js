import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/LogIn";
import SignUp from "./screens/SignUp";
import { ManageTabs } from "./Navigation";
import GameDescAdd from "./screens/GameDescAdd";
import GameReview from "./screens/GameReview";
import AddComment from "./screens/AddComment";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="GameDescAdd"
            component={GameDescAdd}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="GameReview"
            component={GameReview}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="AddComment"
            component={AddComment}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Tabs"
            component={ManageTabs}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
