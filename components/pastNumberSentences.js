import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { Center } from "@builderx/utils";
const ACCESS_TOKEN = "access_token";

export default class pastNumberSentences extends Component {
  render() {
    const nsLI = this.props.game.number_sentences
      .split(" / ")
      .map((numberSentence, index) => {
        const numbers = numberSentence.split(/[\s=]+/);
        let correct = false;
        if (
          parseInt(numbers[0]) + parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "+"
        ) {
          correct = true;
        }

        if (
          parseInt(numbers[0]) - parseInt(numbers[2]) ===
            parseInt(numbers[3]) &&
          numbers[1] === "-"
        ) {
          correct = true;
        }
        return (
          <Text style={styles.text} key={index}>
            {numberSentence + "  "}
            <Icon
              style={correct ? { color: "green" } : { color: "red" }}
              type={"Ionicons"}
              name={correct ? "ios-checkmark" : "ios-close"}
            />
          </Text>
        );
      });
    return (
      <View style={styles.container}>
        <ScrollView>{nsLI}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 290,
    width: 300,

    bottom: 180,
    borderColor: "#dddddd",
    backgroundColor: "#b3dcff"
  },
  text: { fontSize: 20, textAlign: "center", color: "white" }
});
