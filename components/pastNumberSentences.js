import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { Center } from "@builderx/utils";
const ACCESS_TOKEN = "access_token";

export default class pastNumberSentences extends Component {
  state = {
    username: ""
  };

  render() {
    return (
      <View style={styles.container}>
        Questions Correct: {this.props.game.score}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 160,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    backgroundColor: "#b3dcff"
  },
  text: { fontSize: 12, textAlign: "center", color: "white" }
});
