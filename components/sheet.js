import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Switch
} from "react-native";
import { Center } from "@builderx/utils";
import { Card, Button, CheckBox, Slider } from "react-native-elements";
import Problem from "./problem";
import Icon from "react-native-ionicons";

class Sheet extends React.Component {
  state = {
    score: 0,
    timeRemaining: 0,
    start: false,
    end: false,
    addOnly: false
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
    let filteredQuestions = [...this.props.problems];

    //Where the Question Filters Should Happen
    if (this.state.addOnly) {
      filteredQuestions = filteredQuestions.filter(problem => {
        return problem.problem_type.split(" ")[0] === "Addition";
      });
    }

    //
    let numberSentences = filteredQuestions.map(problem => {
      return problem.number_sentence;
    });

    let i = 0;
    while (i < 24) {
      questionBank.push(
        numberSentences[Math.floor(Math.random() * numberSentences.length)]
      );

      i++;
    }
    console.log(this.state);
    return (
      <View>
        {this.state.start ? (
          <Problem problems={questionBank} endGame={this.endGame} />
        ) : !this.state.end ? (
          <Center horizontal>
            <Text style={styles.addOnlyText}> Only Addition </Text>

            <Switch
              style={styles.addOnlySwitch}
              value={this.state.addOnly}
              onValueChange={addOnly =>
                this.setState({ addOnly: !this.state.addOnly })
              }
            />

            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={() => {
                this.startGame();
              }}
            >
              <Text style={styles.startText}>Start! </Text>
            </TouchableOpacity>
          </Center>
        ) : null}
        <Center>
          {this.state.end ? (
            <Text style={styles.text4}>
              Questions Correct: {this.state.score} / 24
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
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 350,
    width: 250,
    borderRadius: 30
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
  },
  card1: {
    top: 296.85,
    left: 32.06,
    width: 359,
    height: 352,
    position: "absolute"
  },
  startButton: {
    backgroundColor: "#7CFC00"
  },
  startText: {
    color: "black",
    fontSize: 25
  },
  addOnlyText: {
    height: 40,
    fontSize: 30,
    // justifyContent: "center",
    // alignItems: "center",
    top: 250,
    right: 50

    // borderRadius: 30
  },
  addOnlySwitch: {
    alignItems: "stretch",
    left: 90,
    top: 213,
    color: "red"
  }
});

export default Sheet;
