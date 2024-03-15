import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const Game = () => {
  const [currCardInd, setCurrCardInd] = useState(0);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const handleMoveLeft = () => {
    if (currCardInd > 0) {
      fadeOut(() => setCurrCardInd((prevIndex) => prevIndex - 1));
    }
  };

  const handleMoveRight = () => {
    if (currCardInd < cards.length - 1) {
      fadeOut(() => setCurrCardInd((prevIndex) => prevIndex + 1));
    }
  };

  const cards = [
    {
      title: "Game Title 1",
      moderator: "Moderator: John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ullamcorper nisi.",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg",
    },
    {
      title: "Game Title 2",
      moderator: "Moderator: John Doe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ullamcorper nisi.",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg",
    },
  ];

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
          source={{ uri: cards[currCardInd].imageUri }}
          style={styles.coverPhoto}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{cards[currCardInd].title}</Text>
          <Text style={styles.moderator}>{cards[currCardInd].moderator}</Text>
          <Text style={styles.description}>
            {cards[currCardInd].description}
          </Text>
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
});

export default Game;
