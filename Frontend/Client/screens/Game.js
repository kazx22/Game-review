import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../global";
const Game = () => {
  const navigation = useNavigation();
  const [currCardInd, setCurrCardInd] = useState(0);
  const [selectedTab, setSelectedTab] = useState("description");
  const [fadeAnimation] = useState(new Animated.Value(1));
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/game`);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [games]);

  const handleMoveLeft = () => {
    if (currCardInd > 0) {
      fadeOut(() => setCurrCardInd((prevIndex) => prevIndex - 1));
    }
  };

  const handleMoveRight = () => {
    if (currCardInd < games.length - 1) {
      fadeOut(() => setCurrCardInd((prevIndex) => prevIndex + 1));
    }
  };

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const handleReviewPress = (review) => {
    console.log(games[currCardInd]._id, review._id);
    navigation.navigate("GameReview", {
      reviewId: review._id,
      gameId: games[currCardInd]._id,
    });
  };

  const handleAddReview = () => {
    if (games[currCardInd]) {
      navigation.navigate("GameDescAdd", { gameId: games[currCardInd]._id });
    } else {
      console.error("No game selected");
    }
  };

  const renderReviews = (reviews) => {
    return reviews.map((review, index) => (
      <TouchableOpacity
        key={index}
        style={styles.reviewContainer}
        onPress={() => handleReviewPress(review)}
      >
        <View style={styles.reviewContent}>
          <Text style={styles.reviewInitials}>{review.username}</Text>

          <Text style={styles.reviewText}>{review.title}</Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <FontAwesome key={i} name="star" size={20} color="#ffc107" />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (callback) => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(callback);
  };

  fadeIn();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnimation }]}>
        <Image
          source={{ uri: games[currCardInd]?.imageUrl }}
          style={styles.coverPhoto}
        />
        <View style={styles.content}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "description" && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress("description")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "description" && styles.activeTabText,
                ]}
              >
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === "reviews" && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress("reviews")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "reviews" && styles.activeTabText,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          {selectedTab === "description" ? (
            <>
              {games[currCardInd] && (
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{games[currCardInd].title}</Text>
                  <Text>{games[currCardInd].description}</Text>
                  <Text>Release Date: {games[currCardInd].releaseDate}</Text>
                  <Text>Genre: {games[currCardInd].genre}</Text>
                  <Text>Platform: {games[currCardInd].platform}</Text>
                  <Text>Rating: {games[currCardInd].rating}</Text>
                </View>
              )}
            </>
          ) : (
            <>
              <ScrollView style={styles.reviewScroll}>
                {renderReviews(games[currCardInd].reviews)}
              </ScrollView>
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <LinearGradient
                  colors={["#d11515", "#fa1919"]}
                  style={[styles.gradient, { width: 200, height: 50 }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <TouchableOpacity
                    onPress={handleAddReview}
                    style={[styles.button, { width: 200, height: 50 }]}
                  >
                    <Text style={styles.text}>Add Review</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </>
          )}
        </View>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={["#d11515", "#fa1919"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity onPress={handleMoveLeft} style={styles.button}>
            <FontAwesome
              name="arrow-left"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={["#d11515", "#fa1919"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity onPress={handleMoveRight} style={styles.button}>
            <FontAwesome
              name="arrow-right"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    height: "83%",
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    elevation: 3,
  },
  coverPhoto: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  moderator: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,

    borderColor: "#ccc",
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#d11515",
    borderColor: "#d11515",
  },
  tabText: {
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
  },
  reviewScroll: {
    maxHeight: 200,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  reviewInitials: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
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
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
  },
  gradient: {
    borderRadius: 20,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    paddingHorizontal: 5,
    textAlign: "center",
    color: "#fff",
  },
});

export default Game;
