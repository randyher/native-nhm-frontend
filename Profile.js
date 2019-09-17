import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { Center } from "@builderx/utils";
const ACCESS_TOKEN = "access_token";
import PastGames from "./components/pastGames";
import PastNumberSentences from "./components/pastNumberSentences";

export default class Profile extends Component {
  state = {
    username: "",
    pastGames: [],
    showNS: false,
    clickedGame: {}
  };
  componentDidMount() {
    this.getToken().then(token => {
      fetch("https://native-nhm-api.herokuapp.com/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.setState({
            username: data.user.username,
            pastGames: data.games.reverse()
          });
        });
    });
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch (error) {
      console.log("f'd up");
    }
  }

  async getToken() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);

      if (token !== null) {
        console.log(token);
        return token;
      }
    } catch (error) {
      console.log("f'd up");
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch (error) {
      console.log("f'd up");
    }
  }

  showNumberSentences = game => {
    this.setState({ showNS: true, clickedGame: game });
  };

  render() {
    const { userData, logUserOut } = this.props.navigation.state.params;
    const pastGames = this.state.pastGames.map(game => {
      return (
        <PastGames
          game={game}
          key={game.id}
          clickHandler={this.showNumberSentences}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.rect} />
        <Text style={styles.text2} />

        <View style={styles.header} />
        <Icon
          type={"Ionicons"}
          name={"ios-arrow-round-back"}
          style={styles.icon2}
          onPress={() => this.props.navigation.navigate("Game")}
        />
        <Icon
          type={"Ionicons"}
          name={"ios-log-out"}
          style={styles.icon}
          onPress={() => {
            logUserOut();
          }}
        />
        <Center horizontal>
          <Image
            style={styles.headerText}
            source={require("./assets/header.png")}
          />
        </Center>
        <Text style={styles.name}>Previous Games</Text>
        <View style={styles.bodyContent}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {pastGames}
          </ScrollView>
          {this.state.showNS ? (
            <PastNumberSentences game={this.state.clickedGame} />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  headerText: {
    height: 36,
    top: 95,
    position: "absolute",
    resizeMode: "contain",
    aspectRatio: 1.5
  },
  rect: {
    top: 0,
    left: 0,
    width: 375,
    height: 138.08,
    backgroundColor: "#c4df9b",
    position: "absolute"
  },
  icon: {
    top: 44.04,
    left: 324.49,
    position: "absolute",
    color: "black",
    fontSize: 40
  },
  icon2: {
    top: 44.04,
    position: "absolute",
    color: "black",
    fontSize: 40,
    left: "4.55%"
  },

  name: {
    top: 140,
    fontSize: 45,
    color: "#c4df9b",
    fontWeight: "600",
    fontFamily: "LondonBetween"
  },

  bodyContent: {
    flex: 1,
    marginTop: 150,
    alignItems: "center"
  },

  info: {
    fontSize: 16,
    color: "#00BFFF",
    top: 160,
    marginBottom: 20
  },
  buttons: {
    top: 165
  },
  buttonContainer: {
    marginTop: 5,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
