import React, { Component } from "react";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import Icon from "react-native-ionicons";
import { Center } from "@builderx/utils";
import { Button } from "react-native-elements";
// import Auth from "./Auth.js";
import Sheet from "./components/sheet";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Game extends Component {
  state = {
    currentUser: "",
    error: "",
    problems: []
  };

  // async storeToken(accessToken) {
  //   try {
  //     await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
  //     this.getToken();
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }
  // }
  //
  // async getToken() {
  //   try {
  //     let token = await AsyncStorage.getItem(ACCESS_TOKEN);
  //     console.log("token:", token);
  //     return token;
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }
  // }
  //
  // async removeToken(accessToken) {
  //   try {
  //     await AsyncStorage.removeItem(ACCESS_TOKEN);
  //     this.getToken();
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }
  // }

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

  render() {
    const numberSentences = this.state.problems.map(problem => {
      return problem.number_sentence;
    });

    return (
      <View style={styles.root}>
        <View style={styles.rect} />
        <Text style={styles.text2} />
        <Icon
          type={"Ionicons"}
          name={"ios-person"}
          style={styles.icon}
          onPress={() =>
            this.props.navigation.navigate("Login", {
              logUserIn: this.logUserIn,
              error: this.state.error,
              otherParam: "anything you want here"
            })
          }
        />
        <Icon type={"Ionicons"} name={"ios-menu"} style={styles.icon2} />
        <Center horizontal>
          <Text style={styles.text3}>Welcome {this.state.currentUser}</Text>
        </Center>
        <Sheet problems={numberSentences} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
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
    fontSize: 31
  },
  button: {
    top: 370.06,
    left: 109.58,
    width: 145.81,
    height: 75.94,
    position: "absolute"
  },
  text4: {
    top: 375,
    color: "#121212",
    position: "absolute",
    fontSize: 31
  }
});
