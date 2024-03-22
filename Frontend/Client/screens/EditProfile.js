import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
import { BASE_URL } from "../global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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
      navigation.navigate("Tabs");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleSignUp = async () => {
    try {
      const username = await AsyncStorage.getItem("username");

      const response = await axios.put(`${BASE_URL}api/user/${username}`, {
        username,
        name,

        password,
        dob: dob.toISOString(),
        location: location.coords,
      });
      Alert.alert("Edit Successful");

      navigation.navigate("Tabs");
      console.log("User signed up:", response.data);
    } catch (error) {
      console.error(error.message);
    } finally {
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
  return loading ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <ActivityIndicator size="large" color="#d11515" />
          </View>
        </View>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder={"Name"}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={password}
        onChangeText={(text) => setPassword(text)}
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
          <Text style={styles.buttonText}>Done</Text>
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

export default EditProfile;
