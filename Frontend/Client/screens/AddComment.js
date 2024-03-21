import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../global";

const AddComment = ({ route }) => {
  const navigation = useNavigation();
  const { gameId, reviewId } = route.params;
  const [content, setContent] = useState();

  const handleAddComment = async () => {
    try {
      const username = await AsyncStorage.getItem("username");

      const response = await axios.post(
        `${BASE_URL}api/game/${gameId}/reviews/${reviewId}/comments`,
        {
          username,
          content,
        }
      );
      Alert.alert("Success", "Comment added successfully!");
      setContent("");
      navigation.navigate("Tabs");
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Comment</Text>
      <TextInput
        style={styles.input}
        placeholder="Comment"
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline={true}
      />

      <TouchableOpacity onPress={handleAddComment} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Comment</Text>
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
export default AddComment;
