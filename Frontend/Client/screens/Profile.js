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
import { BASE_URL } from "../global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [games, setGames] = useState();
  const [reviewCounter, setReviewCounter] = useState(0);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const response = await axios.get(`${BASE_URL}api/user/${username}`);
      setUser(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // const reviewCount = async () => {
  //   try {
  //     const username = await AsyncStorage.getItem("username");
  //     const response = await axios.get(`${BASE_URL}api/game`);
  //     setGames(response.data);

  //     let count = 0;
  //     console.log(games);
  //     if (games && games.length > 0) {
  //       games.forEach((game) => {
  //         if (game.reviews && game.reviews.length > 0) {
  //           game.reviews.forEach((review) => {
  //             if (review.username === username) {
  //               count++;
  //             }
  //           });
  //         }
  //       });
  //     }
  //     setReviewCounter(count);
  //   } catch (error) {
  //     console.error("Error fetching games:", error);
  //   }

  //   console.log(reviewCounter);
  // };
  const handleSignUp = () => {
    navigation.navigate("EditProfile");
  };

  const handleSendMessage = () => {
    navigation.navigate("Logout");
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profilePhoto}
              source={{
                uri: user.imageUrl,
              }}
            />
            <Text style={styles.nameText}>{user.name}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.statCount}>Date Of Birth</Text>
          <Text style={styles.statLabel}>
            {new Date(user.dob).toLocaleDateString("en-US")}
          </Text>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.bioText}>
            Total Number of Reviews: {reviewCounter}
          </Text>
        </View> */}

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <LinearGradient
              colors={["#d11515", "#fa1919"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
            <LinearGradient
              colors={["#d11515", "#fa1919"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Logout</Text>
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

export default Profile;
