import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const GameReview = () => {
  const [commentVis, setCommentVis] = useState(false);
  const [showReplies, setShowReplies] = useState({});

  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleCommentsVisibility = () => {
    setCommentVis((prev) => !prev);
    Animated.timing(slideAnim, {
      toValue: commentVis ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleCommentPress = () => {
    toggleCommentsVisibility();
  };

  const handleReplyPress = (index) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderComments = () => {
    const comments = [
      { author: "User1", text: "Great game!" },
      { author: "User2", text: "Nice graphics!" },
      { author: "User3", text: "Enjoyed playing it." },
    ];

    return comments.map((comment, index) => (
      <View key={index} style={styles.commentContainer}>
        <Text style={styles.commentAuthor}>{comment.author}</Text>
        <Text style={styles.commentText}>{comment.text}</Text>
        <TouchableOpacity
          style={styles.replyButton}
          onPress={() => handleReplyPress(index)}
        >
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
        {showReplies[index] && (
          <View style={styles.replyContainer}>
            <Text>Reply 1</Text>
            <Text>Reply 2</Text>
          </View>
        )}
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
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCommentPress}>
        <FontAwesome name="comment" size={24} color="white" />
      </TouchableOpacity>
      {commentVis && (
        <Animated.View
          style={[
            styles.commentsContainer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.commentsTitle}>Comments</Text>
          <ScrollView style={styles.commentsScrollView}>
            {renderComments()}
          </ScrollView>
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 30,
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
  commentsScrollView: {
    maxHeight: 200,
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
  replyContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default GameReview;
