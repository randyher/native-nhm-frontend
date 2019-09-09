import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import Icon from "react-native-ionicons";
import { Center } from "@builderx/utils";
import { Button, Card } from "react-native-elements";
import Sheet from "./components/sheet";
import { createStackNavigator, createAppContainer } from "react-navigation";
const ACCESS_TOKEN = "access_token";

export default class Game extends Component {
  state = {
    userData: {},
    problems: [],
    clicksRemoved: false
  };

  componentDidMount() {
    console.log(this.props);
    fetch(`http://localhost:3000/problems`)
      .then(res => res.json())
      .then(problems => {
        this.setState({
          problems: problems,
          userData: this.props.navigation.state.params.userData.user
        });
      });
  }

  logUserIn = username => {
    console.log(username);
    this.setState({ currentUser: username }, () => {
      this.props.navigation.navigate("Game");
    });
  };

  removeClickables = () => {
    this.setState({ clicksRemoved: !this.state.clicksRemoved });
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
    const numberSentences = this.state.problems.map(problem => {
      return problem.number_sentence;
    });
    console.log(this.state);

    return (
      <View style={styles.container}>
        <View style={styles.rect} />
        <Text style={styles.text2} />
        <Icon
          type={"Ionicons"}
          name={"ios-person"}
          style={styles.icon}
          onPress={() =>
            this.props.navigation.navigate("Profile", {
              logUserOut: this.logUserOut,
              userData: this.state.userData
            })
          }
        />
        <Icon type={"Ionicons"} name={"ios-menu"} style={styles.icon2} />
        <Center horizontal>
          <Image
            style={styles.headerText}
            source={require("./assets/header.png")}
          />
        </Center>
        {!this.state.clicksRemoved ? (
          <Text style={styles.text2}>
            Welcome {this.state.userData.username}!
          </Text>
        ) : null}
        <Sheet
          problems={this.state.problems}
          removeClickables={this.removeClickables}
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
