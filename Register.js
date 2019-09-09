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

  registerAccount = userData => {
    const userObj = {
      user: {
        username: userData.username,
        password: userData.password
      }
    };

    fetch("http://localhost:3000/users", {
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

          this.storeToken(userData.jwt);
          this.props.navigation.navigate("Game", {
            userData: userData
          });
        } else {
          console.log(userData);
          this.setState({ errors: userData.error });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rect} />
        <Text style={styles.text2} />
        <Text style={styles.text3}>Register</Text>

        <Icon
          type={"Ionicons"}
          name={"ios-arrow-round-back"}
          style={styles.icon2}
          onPress={() => this.props.navigation.navigate("Game")}
        />
        <View style={styles.inputContainer}>
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

        <View style={styles.inputContainer}>
          <Icon style={styles.inputIcon} type={"Ionicons"} name={"ios-lock"} />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.registerAccount(this.state)}
        >
          <Text style={styles.loginText}>Make Account</Text>
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
    alignItems: "center",
    backgroundColor: "#F0F8FF"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    color: "#6495ED",
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
  errorText: {
    color: "red"
  },
  text2: {
    top: 259.64,
    left: 0,
    width: 0,
    height: 0,
    color: "#121212",
    position: "absolute"
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
  }
});
