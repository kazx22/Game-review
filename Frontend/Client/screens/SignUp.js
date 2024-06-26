import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
import { BASE_URL } from "../global";

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      navigation.navigate("Login");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleSignUp = async () => {
    if (!username || !name || !email || !password || !confirmPassword || !dob) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}api/user`, {
        username,
        name,
        email,
        password,
        dob: dob.toISOString(),
        location: location.coords,
      });

      navigation.navigate("Login");
      console.log("User signed up:", response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    } else {
      console.log("No date selected");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={[styles.input, styles.dobInput]}
      >
        <Text style={styles.inputText}>
          {dob ? dob.toDateString() : "Date of Birth"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DatePicker
          style={{ width: 200, height: 200 }}
          mode="date"
          display="spinner"
          value={dob || new Date()}
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <LinearGradient colors={["#d11515", "#fa1919"]} style={styles.gradient}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
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
  input: {
    borderRadius: 20,
    height: 60,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dobInput: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    borderRadius: 20,
    width: 200,
    height: 50,
    overflow: "hidden",
    shadowColor: "#d11515",
    shadowOffset: {
      width: 0,
      height: 4,
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
});

export default SignUp;
