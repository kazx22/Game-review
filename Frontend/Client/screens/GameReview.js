import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const GameReview = () => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const handleCommentPress = () => {
    setIsCommentsVisible((prev) => !prev);
  };

  const renderComments = () => {
    const dummyComments = [
      { author: "User1", text: "Great game!" },
      { author: "User2", text: "Nice graphics!" },
      { author: "User3", text: "Enjoyed playing it." },
    ];
    return dummyComments.map((comment, index) => (
      <View key={index} style={styles.commentContainer}>
        <Text style={styles.commentAuthor}>{comment.author}</Text>
        <Text style={styles.commentText}>{comment.text}</Text>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Game Title</Text>
        <Text style={styles.cardAuthor}>Author: John Doe</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating:</Text>
          {[...Array(4)].map((_, index) => (
            <FontAwesome key={index} name="star" size={20} color="#ffc107" />
          ))}
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
          ullamcorper nisi.
        </Text>

        {isCommentsVisible && (
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>Comments</Text>
            {renderComments()}
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, {}]}
        onPress={handleCommentPress}
      >
        <FontAwesome name="comment" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardAuthor: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginRight: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#d11515",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {},
  replyButton: {
    backgroundColor: "#d11515",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  replyButtonText: {
    color: "#ffffff",
  },
});

export default GameReview;
