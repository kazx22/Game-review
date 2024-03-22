import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BASE_URL } from "../global";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ModApproval = () => {
  const navigation = useNavigation();
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const handleAddReview = async () => {
    try {
      const response = await axios.post(`${BASE_URL}api/mod`, {
        username: reviewTitle,
        email: reviewDescription,
      });
      Alert.alert("Mod Request Added");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error creating Mod:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mod Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Username"
        value={reviewTitle}
        onChangeText={(text) => setReviewTitle(text)}
        multiline={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        value={reviewDescription}
        onChangeText={(text) => setReviewDescription(text)}
        multiline={true}
      />
      <TouchableOpacity onPress={handleAddReview} style={styles.addButton}>
        <Text style={styles.addButtonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  ratingButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  selectedRatingButton: {
    backgroundColor: "yellow",
  },
  addButton: {
    backgroundColor: "#d11515",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ModApproval;
