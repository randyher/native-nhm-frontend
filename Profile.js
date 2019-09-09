import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-ionicons";

export default class Profile extends Component {
  render() {
    // console.log(this.props.navigation.state.params);
    const { userData } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.rect} />
        <Text style={styles.text2} />

        <View style={styles.header} />
        <Icon
          type={"Ionicons"}
          name={"ios-arrow-round-back"}
          style={styles.icon2}
          onPress={() => this.props.navigation.navigate("Game")}
        />
        <Icon
          type={"Ionicons"}
          name={"ios-log-out"}
          style={styles.icon}
          onPress={() => {
            logUserOut();
          }}
        />
        <Text style={styles.name}>{userData.username}</Text>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.info}>Select Below: </Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text> Previous Games </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text> Stats </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  header: {
    backgroundColor: "#00BFFF",
    height: 200
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
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    top: 20,
    fontSize: 45,
    color: "blue",
    fontWeight: "600",
    fontFamily: "Chalkduster"
  },
  body: {
    marginTop: 10
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },

  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 5,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
