import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { Center } from "@builderx/utils";
const ACCESS_TOKEN = "access_token";

export default class Profile extends Component {
  state = {
    username: ""
  };

  render() {
    let time = new Date(this.props.game.updated_at.split(" "));

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.clickHandler(this.props.game)}
      >
        <Text style={[styles.text, { marginTop: 15 }]}>
          Questions Correct: {this.props.game.score}
        </Text>
        <Text style={styles.text}>
          Time Remaining: {this.props.game.time_remaining}
        </Text>
        <Text style={styles.text}>{this.props.game.game_type}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 150,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    backgroundColor: "#b3dcff"
  },
  text: { fontSize: 12, textAlign: "center", color: "white" }
});
