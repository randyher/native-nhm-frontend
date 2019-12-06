import React from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";

class FormTextInput extends React.Component {
  render() {
    return (
      <View>
        <TextInput style={styles.input} placeholder="Username" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // input: {
  //   top: 325,
  //   right: 25,
  //   fontSize: 71,
  //   position: "absolute"
  // },
  input: {
    top: 200.99,
    left: -105,
    fontSize: 52,
    position: "absolute"
  }
});

export default FormTextInput;
