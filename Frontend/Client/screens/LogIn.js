import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../global";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}api/user/loginUser`, {
        username,
        password,
      });
      if (!response || !response.data || !response.data.token) {
        throw new Error("Invalid response from server");
      }
      const { token } = response.data;
      console.log("Login successful. Token:", token);

      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("token", token);
      navigation.navigate("Tabs");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
    // navigation.navigate("Tabs");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    console.log("Forgot Your Password");
  };

  const toggleVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignIn</Text>
      <Text style={styles.credentialsText}>
        Enter your credentials to Continue
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={toggleVisibility}
          style={styles.iconContainer}
        >
          <FontAwesome
            name={hidePassword ? "eye" : "eye-slash"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <LinearGradient
            colors={["#d11515", "#fa1919"]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <LinearGradient
            colors={["#d11515", "#fa1919"]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.fpContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>Forgot Your Password? </Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.link}>Click Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  credentialsText: {
    fontSize: 15,
    marginBottom: 25,
  },
  input: {
    borderRadius: 20,
    height: 60,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  passwordInput: {
    flex: 1,
    height: 60,
  },
  iconContainer: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  button: {
    borderRadius: 20,
    width: 100,
    height: 50,
    overflow: "hidden",
    shadowColor: "#d11515",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  line: {
    height: 1,
    width: 150,
    backgroundColor: "#a39e9e",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  link: {
    fontSize: 16,
    color: "#c47474",
    textDecorationLine: "none",
    marginTop: 30,
  },
  fpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});

export default LogIn;
