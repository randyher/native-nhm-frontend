import React, { Component } from "react";
import { Center } from "@builderx/utils";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage
} from "react-native";
import FormTextInput from "./components/formTextInput.js";
import Icon from "react-native-ionicons";

const ACCESS_TOKEN = "access_token";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: ""
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

  async removeToken(accessToken) {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch (error) {
      console.log("something went wrong");
    }
  }

  logIn = userData => {
    const userObj = {
      user: {
        username: userData.username,
        password: userData.password
      }
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
    })
      .then(res => res.json())
      .then(userData => {
        if (userData.jwt) {
          console.log("Success", userData);
          this.props.navigation.state.params.logUserIn(userData.user.username);
          this.storeToken(userData.jwt);
        } else {
          console.log(userData);
          this.setState({ errors: userData.message });
        }
      });
  };

  render() {
    console.log(this.state.errors);
    return (
      <View style={styles.container}>
        <View style={styles.rect} />
        <Center horizontal>
          <Image
            style={styles.headerText}
            source={require("./assets/header.png")}
          />
        </Center>

        <Icon
          type={"Ionicons"}
          name={"ios-arrow-round-back"}
          style={styles.icon2}
          onPress={() => this.props.navigation.navigate("Game")}
        />
        <Text style={styles.text2}> Practice your math facts!</Text>
        <Text style={styles.text3}>
          No Hesitation Math helps students recite math facts fluently, without
          hesitation
        </Text>
        <View style={[styles.inputContainer]}>
          <Icon
            style={styles.inputIcon}
            type={"Ionicons"}
            name={"ios-contact"}
          />

          <TextInput
            style={styles.inputs}
            placeholder="Username"
            underlineColorAndroid="transparent"
            onChangeText={username => this.setState({ username })}
          />
        </View>

        <View style={[styles.inputContainer]}>
          <Icon style={styles.inputIcon} type={"Ionicons"} name={"ios-lock"} />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <Image
          style={styles.log}
          source={require("./assets/login.png")}
          onPress={() => this.logIn(this.state)}
        />

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.logIn(this.state)}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.registerButton]}
          onPress={() =>
            this.props.navigation.navigate("Register", {
              logUserIn: this.props.navigation.state.params.logUserIn
            })
          }
        >
          <Text style={styles.registerText}>Register Here</Text>
        </TouchableOpacity>

        {this.state.errors ? (
          <TouchableHighlight style={styles.buttonContainer}>
            <Text style={styles.errorText}>{this.state.errors}</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rect: {
    top: 0,
    left: 0,
    width: 375,
    height: 150.08,
    backgroundColor: "#c4df9b",
    position: "absolute"
  },
  headerText: {
    height: 36,
    top: 95,
    position: "absolute",
    resizeMode: "contain",
    aspectRatio: 1.5
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    // borderRadius: 30,
    borderBottomWidth: 1,
    width: 325,
    height: 40,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b3dcff"
  },
  inputs: {
    color: "#b3dcff",
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    color: "black",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    color: "gray",
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#6495ED"
  },
  loginText: {
    color: "white"
  },
  registerButton: {
    backgroundColor: "#98FB98"
  },
  registerText: {
    color: "black"
  },
  errorText: {
    color: "red"
  },
  icon2: {
    top: 44.04,
    position: "absolute",
    color: "grey",
    fontSize: 40,
    left: "4.55%"
  },
  text2: {
    fontSize: 30,
    bottom: 60,
    // marginBottom: 80,
    right: 15
  },
  text3: {
    fontSize: 20,
    left: 5,
    bottom: 55
  },
  log: {
    height: 60,
    top: 440,
    position: "absolute",
    resizeMode: "contain",
    aspectRatio: 1.5
  }
});
