import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BASE_URL } from "../global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GameReview = ({ route }) => {
  navigation = useNavigation();
  const { reviewId, gameId } = route.params;
  const [commentVis, setCommentVis] = useState(false);
  const [showReplies, setShowReplies] = useState({});
  const [comments, setComments] = useState([]);
  const [review, setReview] = useState();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState();

  const toggleCommentsVisibility = () => {
    setCommentVis((prev) => !prev);
    Animated.timing(slideAnim, {
      toValue: commentVis ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  const getUsername = async () => {
    try {
      const user = await AsyncStorage.getItem("username");
      setUsername(user);
    } catch (error) {
      console.error("Error getting username from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    fetchReview();
    fetchComment();
    getUsername();
  }, []);
  const fetchReview = async () => {
    console.log(reviewId, gameId);
    try {
      const response = await axios.get(
        `${BASE_URL}api/game/${gameId}/reviews/${reviewId}`
      );
      setReview(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`${BASE_URL}api/game/${gameId}/reviews/${reviewId}`);
      Alert.alert("Review Delete Successful");
      navigation.navigate("Tabs");
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleEditReview = () => {
    navigation.navigate("EditReview", { gameId, reviewId });
  };
  const fetchReplies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}api/game/${gameId}/reviews/${reviewId}/comments`
      );
      setReplies(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const fetchComment = async () => {
    console.log(reviewId, gameId);
    try {
      const response = await axios.get(
        `${BASE_URL}api/game/${gameId}/reviews/${reviewId}/comments`
      );
      setComments(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleCommentPress = () => {
    setLoading(true);
    fetchReview();

    toggleCommentsVisibility();
  };
  const handleAddComment = (comment) => {
    navigation.navigate("AddComment", { gameId, reviewId });
  };
  const handleReplyPress = (index) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const addReply = async (id) => {
    try {
      console.log(gameId, reviewId, id);
      const response = await axios.post(
        `${BASE_URL}api/game/${gameId}/reviews/${reviewId}/comments/${id}/replies`,
        { username, reply }
      );
      Alert.alert("Reply Successful");
      fetchComment();
    } catch (error) {
      setLoading(false);
      console.error("Error fetching comments:", error);
    }
  };
  const handleDeleteComment = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}api/game/${gameId}/reviews/${reviewId}/comments/${id}`
      );
      Alert.alert("Comment Deleted");
      fetchComment();
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const renderComments = () => {
    return comments.map((comment, index) => (
      <View key={index} style={styles.commentContainer}>
        <Text style={styles.commentAuthor}>{comment.username}</Text>
        <Text style={styles.commentText}>{comment.content}</Text>
        <View style={{ marginTop: 10, marginLeft: -1 }}>
          {comment && username === comment.username && (
            <>
              <TouchableOpacity
                style={styles.replyButton}
                onPress={() => handleDeleteComment(comment._id)}
              >
                <Text style={styles.replyButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={[styles.replyButton, { marginTop: -30, marginLeft: 300 }]}
            onPress={() => handleReplyPress(index)}
          >
            <Text style={styles.replyButtonText}>Reply</Text>
          </TouchableOpacity>
        </View>
        {showReplies[index] && (
          <View style={styles.replyContainer}>
            {comment.replies.map((reply, replyIndex) => (
              <View key={replyIndex}>
                <Text style={[[styles.cardContainer, { marginTop: 10 }]]}>
                  {reply.username} : {reply.reply}
                </Text>
              </View>
            ))}
            <TextInput
              style={[styles.replyInput, { marginTop: 20 }]}
              placeholder="Write your reply"
              value={reply}
              onChangeText={(text) => setReply(text)}
            />
            <TouchableOpacity
              style={[styles.replyButton, { marginTop: 20, marginLeft: 250 }]}
              onPress={() => addReply(comment._id)}
            >
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!loading && review && (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{review.title}</Text>
          <Text style={styles.cardAuthor}>Author: {review.username}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rating:</Text>
            {[...Array(review.rating)].map((_, index) => (
              <FontAwesome key={index} name="star" size={20} color="#ffc107" />
            ))}
          </View>
          <ScrollView>
            <Text>Description:</Text>
            <Text style={[styles.description, { marginTop: 10 }]}>
              {review.description}
            </Text>
          </ScrollView>
          <View>
            {review && username === review.username && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, { marginBottom: -20 }]}
                  onPress={handleDeleteReview}
                >
                  <LinearGradient
                    colors={["#d11515", "#fa1919"]}
                    style={styles.gradient}
                  >
                    <FontAwesome name="trash" size={24} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, , { marginBottom: 90 }]}
                  onPress={handleEditReview}
                >
                  <LinearGradient
                    colors={["#d11515", "#fa1919"]}
                    style={[styles.gradient]}
                  >
                    <FontAwesome name="edit" size={24} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

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

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { marginRight: 200 }]}
          onPress={handleCommentPress}
        >
          <LinearGradient
            colors={["#d11515", "#fa1919"]}
            style={styles.gradient}
          >
            <FontAwesome name="comment" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={handleAddComment}
        >
          <LinearGradient
            colors={["#d11515", "#fa1919"]}
            style={styles.gradient}
          >
            <FontAwesome name="plus" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
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
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
