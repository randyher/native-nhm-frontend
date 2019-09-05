import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "react-native-ionicons";
import { Center } from "@builderx/utils";
import { Button, Card } from "react-native-elements";
import Sheet from "./components/sheet";
import { createStackNavigator, createAppContainer } from "react-navigation";
const ACCESS_TOKEN = "access_token";

export default class Game extends Component {
  state = {
    currentUser: "Randy",
    problems: []
  };

  componentDidMount() {
    fetch(`http://localhost:3000/problems`)
      .then(res => res.json())
      .then(problems => {
        this.setState({ problems: problems });
      });
  }

  logUserIn = username => {
    console.log(username);
    this.setState({ currentUser: username }, () => {
      this.props.navigation.navigate("Game");
    });
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
              this.props.navigation.navigate("Game");
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

    return (
      <View style={styles.container}>
        <View style={styles.rect} />
        <Text style={styles.text2} />
        {this.state.currentUser ? (
          <Icon
            type={"Ionicons"}
            name={"ios-person"}
            style={styles.icon}
            onPress={() =>
              this.props.navigation.navigate("Profile", {
                logUserOut: this.logUserOut,
                username: this.state.currentUser
              })
            }
          />
        ) : (
          <Icon
            type={"Ionicons"}
            name={"ios-log-in"}
            style={styles.icon}
            onPress={() =>
              this.props.navigation.navigate("Login", {
                logUserIn: this.logUserIn,
                otherParam: "anything you want here"
              })
            }
          />
        )}
        <Icon type={"Ionicons"} name={"ios-menu"} style={styles.icon2} />
        <Center horizontal>
          {!this.state.currentUser ? (
            <Text style={styles.text3}>No Hesitation Math</Text>
          ) : (
            <Text style={styles.text3}>Welcome {this.state.currentUser}</Text>
          )}
        </Center>
        {this.state.currentUser ? (
          <Sheet problems={this.state.problems} />
        ) : (
          <Center>
            <Card style={styles.card1} title="Welcome">
              <Text style={styles.text4}>
                NHM is a way for students to practice their math facts! Before
                getting started, click the button below to log in so you may get
                started!
              </Text>
            </Card>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.registerButton]}
              onPress={() =>
                this.props.navigation.navigate("Login", {
                  logUserIn: this.logUserIn
                })
              }
            >
              <Text style={styles.logRegText}>Log in or Register</Text>
            </TouchableOpacity>
          </Center>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF"
  },
  rect: {
    top: 0,
    left: 0,
    width: 375,
    height: 88.08,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute"
  },
  text2: {
    top: 259.64,
    left: 0,
    width: 0,
    height: 0,
    color: "#121212",
    position: "absolute"
  },
  icon: {
    top: 44.04,
    left: 324.49,
    position: "absolute",
    color: "grey",
    fontSize: 40
  },
  icon2: {
    top: 44.04,
    position: "absolute",
    color: "grey",
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
