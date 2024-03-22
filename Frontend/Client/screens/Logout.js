import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
const Logout = () => {
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      await AsyncStorage.removeItem("username");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
    }
  };
  const handleSendMessage = () => {
    return;
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.statCount}>Are You sure</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <LinearGradient
              colors={["#d11515", "#fa1919"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
            <LinearGradient
              colors={["#d11515", "#fa1919"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }} />
      </View>
    </ScrollView>
  );
};
const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    elevation: 3,
  },
  headerContainer: {
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  statCount: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
    marginLeft: 4,
  },
  bioText: {
    fontSize: 16,
    textAlign: "center",
    color: "#A9A9A9",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#d11515",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 140,
    height: 50,
  },
};
export default Logout;
