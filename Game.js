import React, { Component } from "react";
import { StyleSheet, View, Text, Alert, Image } from "react-native";
import Icon from "react-native-ionicons";
import { Center } from "@builderx/utils";
import { Button, Card } from "react-native-elements";
import Sheet from "./components/sheet";
import AsyncStorage from "@react-native-community/async-storage";
const ACCESS_TOKEN = "access_token";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class Game extends Component {
  state = {
    userData: {},
    problems: [],
    clicksRemoved: false,
    resultsText: false
  };

  componentDidMount() {
    fetch(`https://native-nhm-api.herokuapp.com/problems`)
      .then(res => res.json())
      .then(problems => {
        this.setState({
          problems: problems,
          userData: this.props.navigation.state.params.userData.user
        });
      });
  }

  removeClickables = () => {
    this.setState({
      clicksRemoved: !this.state.clicksRemoved,
      resultsText: true
    });
  };

  removeReset = () => {
    this.setState({ resultsText: false });
  };

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch (error) {
      console.log("something went wrong");
    }
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token:", token);
      return token;
    } catch (error) {
      console.log("something went wrong");
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch (error) {
      console.log("something went wrong");
    }
  }

  addGame = gameData => {
    const gameDataWithUser = {
      ...gameData,
      user_id: this.state.userData.id
    };
    console.log(gameDataWithUser);
    this.getToken().then(token => {
      fetch("https://native-nhm-api.herokuapp.com/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(gameDataWithUser)
      })
        .then(res => res.json())
        .then(console.log);
    });
  };

  logUserOut = () => {
    Alert.alert(
      "Logging Out",
      "Are you sure you want to log out of your account?",
      [
        {
          text: "Log Out",
          onPress: () => {
            this.removeToken();
            this.setState({ currentUser: "" }, () => {
              this.props.navigation.navigate("Login");
            });
          }
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );
  };

  render() {
    console.log(this.state);

    return (
      <View style={styles.container}>
        <View style={styles.rect} />
        <Text style={styles.text2} />
        {this.state.clicksRemoved ? null : (
          <Icon
            type={"Ionicons"}
            name={"ios-person"}
            style={styles.icon}
            onPress={() =>
              this.props.navigation.navigate("Profile", {
                logUserOut: this.logUserOut
              })
            }
          />
        )}
        <Icon type={"Ionicons"} name={"ios-menu"} style={styles.icon2} />
        <Center horizontal>
          <Image
            style={styles.headerText}
            source={require("./assets/header.png")}
          />
        </Center>
        {!this.state.clicksRemoved && !this.state.resultsText ? (
          <Text style={styles.text2}>
            Welcome {this.state.userData.username}!
          </Text>
        ) : null}
        {!this.state.clicksRemoved && this.state.resultsText ? (
          <Text style={styles.text2}>Results:</Text>
        ) : null}
        <Sheet
          problems={this.state.problems}
          removeClickables={this.removeClickables}
          addGame={this.addGame}
          removeReset={this.removeReset}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerText: {
    height: hp(4.7),
    top: hp("12"),
    position: "absolute",
    resizeMode: "contain",
    aspectRatio: 1.5
  },
  rect: {
    top: 0,
    left: 0,
    width: 500,
    height: hp("17"),
    backgroundColor: "#c4df9b",
    position: "absolute"
  },
  text2: {
    top: 175,
    fontSize: 30,
    left: 15,
    fontFamily: "LondonBetween",
    color: "#121212",
    position: "absolute"
  },
  icon: {
    top: 44.04,
    left: 370.49,
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
  text3: {
    top: 100.99,
    color: "#121212",
    position: "absolute",
    fontSize: 31,
    fontFamily: "Chalkduster"
  },
  button: {
    top: 370.06,
    left: 109.58,
    width: 145.81,
    height: 75.94,
    position: "absolute"
  },
  text4: {
    fontSize: 20,
    textAlign: "center"
  },
  buttonContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 250,
    borderRadius: 30
  },
  registerButton: {
    backgroundColor: "#6495ED"
  },
  logRegText: {
    fontSize: 20,
    color: "white"
  }
});
