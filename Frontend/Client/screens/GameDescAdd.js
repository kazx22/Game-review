import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

const GameDescAdd = () => {
  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const handleRatingSelect = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Review Title"
        value={reviewTitle}
        onChangeText={(text) => setReviewTitle(text)}
        multiline={true}
      />
      <View style={styles.ratingContainer}>
        <Text style={styles.label}>Rating: </Text>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.ratingButton,
              rating === value && styles.selectedRatingButton,
            ]}
            onPress={() => handleRatingSelect(value)}
          >
            <Text>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Review Description"
        value={reviewDescription}
        numberOfLines={4}
        onChangeText={(text) => setReviewDescription(text)}
        multiline={true}
      />
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
});

export default GameDescAdd;
