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
  Alert
} from "react-native";
import FormTextInput from "./components/formTextInput.js";
import Icon from "react-native-ionicons";
import AsyncStorage from "@react-native-community/async-storage";

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

    fetch("https://native-nhm-api.herokuapp.com/login", {
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
          // this.props.navigation.state.params.logUserIn(userData.user.username);
          this.storeToken(userData.jwt);
          this.props.navigation.navigate("Game", {
            userData: userData
          });
        } else {
          console.log(userData);
          this.setState({ errors: userData.message });
        }
      });
  };

  render() {
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
          name={"ios-menu"}
          style={styles.icon2}
          onPress={() => alert("This Doesn't Work Yet :)")}
        />
        <Text style={styles.text2}> Practice your math facts!</Text>
        <Text style={styles.text3}>
          No Hesitation Math helps students recite
        </Text>
        <Text style={styles.text4}>
          math facts fluently and without hesitation!
        </Text>
        <View style={[styles.inputContainer, { marginBottom: 20 }]}>
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

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.logButtonContainer]}
            onPress={() => this.logIn(this.state)}
          >
            <Image style={styles.log} source={require("./assets/login.png")} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
            style={[styles.regButtonContainer]}
          >
            <Image
              style={styles.reg}
              source={require("./assets/register.png")}
            />
          </TouchableOpacity>
        </View>

        {this.state.errors ? (
          <TouchableHighlight style={styles.buttonContainer}>
            <Text style={styles.errorText}>{this.state.errors}</Text>
          </TouchableHighlight>
        ) : null}
        <Image style={styles.logo} source={require("./assets/logo.png")} />
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
    height: 138.08,
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
  logButtonContainer: {
    height: 40,
    marginBottom: 120,
    width: 140
  },
  regButtonContainer: {
    marginLeft: 30,
    marginBottom: 120
  },
  reg: {
    height: 57,
    width: 200,
    resizeMode: "contain"
  },
  log: {
    height: 55,
    width: 200,
    resizeMode: "contain"
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

  errorText: {
    color: "red"
  },
  icon2: {
    top: 44.04,
    position: "absolute",
    color: "black",
    fontSize: 40,
    left: "4.55%"
  },
  text2: {
    fontSize: 30,
    bottom: 45,
    // marginBottom: 80,
    right: 10,
    fontFamily: "LondonBetween"
  },
  text3: {
    fontSize: 18,
    left: -6,
    bottom: 30,
    fontFamily: "LondonBetween"
  },
  text4: {
    fontSize: 18,
    left: -7,
    bottom: 30,
    fontFamily: "LondonBetween"
  },
  logo: {
    height: 260,
    width: 340,
    bottom: 55,
    resizeMode: "contain",
    position: "absolute"
  }
});
