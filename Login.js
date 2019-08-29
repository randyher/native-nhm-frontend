import React, { Component } from "react";
import { Center } from "@builderx/utils";
import { StyleSheet, View, Text } from "react-native";

export default class Login extends Component {
  render() {
    return (
      <View>
        <Center horizontal>
          <Text style={styles.text3}>Log In</Text>
        </Center>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text3: {
    top: 100.99,
    color: "#121212",
    position: "absolute",
    fontSize: 31
  }
});
