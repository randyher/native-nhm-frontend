import React from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";
import { Center } from "@builderx/utils";
import { Button } from "react-native-elements";
import Problem from "./problem";

class Sheet extends React.Component {
  state = {
    score: 0,
    timeRemaining: 0,
    start: false,
    end: false
  };

  startGame = () => {
    this.setState({
      start: true
    });
  };

  endGame = (completedQuestions, timeRemaining) => {
    console.log(completedQuestions);
    console.log(timeRemaining);
    this.setState({ start: false, end: true });
    const inputs = Object.values(completedQuestions);
    const answers = [];
    let newScore = 0;

    inputs.forEach(input => {
      const numbers = input.split(/[\s=]+/);
      answers.push(numbers[3]);

      if (
        parseInt(numbers[0]) + parseInt(numbers[2]) === parseInt(numbers[3]) &&
        numbers[1] === "+"
      ) {
        newScore += 1;
      }

      if (
        parseInt(numbers[0]) - parseInt(numbers[2]) === parseInt(numbers[3]) &&
        numbers[1] === "-"
      ) {
        newScore += 1;
      }
    });

    this.setState({ score: newScore, timeRemaining: timeRemaining });
  };

  render() {
    let questionBank = [];
    let i = 0;
    while (i < 24) {
      questionBank.push(
        this.props.problems[
          Math.floor(Math.random() * this.props.problems.length)
        ]
      );
      i++;
    }

    return (
      <View>
        {this.state.start ? (
          <Problem problems={questionBank} endGame={this.endGame} />
        ) : !this.state.end ? (
          <Button
            style={styles.button}
            title="Start, yo"
            onPress={this.startGame}
          />
        ) : null}
        <Center>
          {this.state.end ? (
            <Text style={styles.text4}>
              Questions Correct: {this.state.score}
              {"\n"}
              Time Remaining: {this.state.timeRemaining}
            </Text>
          ) : null}
        </Center>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    top: 370.06,
    left: 115.0,
    width: 145.81,
    height: 75.94,
    position: "absolute"
  },
  text2: {
    top: 245,
    color: "#121212",
    position: "absolute",
    fontSize: 205
  },
  text4: {
    top: 245,
    color: "#121212",
    position: "absolute",
    fontSize: 25
  }
});

export default Sheet;
