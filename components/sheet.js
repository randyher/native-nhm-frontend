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
import Divider from "react-native-divider";

class Sheet extends React.Component {
  state = {
    score: 0,
    timeRemaining: 0,
    start: false,
    end: false,
    addOnly: false,
    subtractOnly: false,
    doublesAndHalfOnly: false,
    tensOnly: false
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

    if (this.state.subtractOnly) {
      filteredQuestions = filteredQuestions.filter(problem => {
        return problem.problem_type.split(" ")[0] === "Subtraction";
      });
    }

    if (this.state.doublesAndHalfOnly) {
      filteredQuestions = filteredQuestions.filter(problem => {
        return (
          problem.problem_type.split(" ")[1] === "Doubles" ||
          problem.problem_type.split(" ")[1] === "Halving"
        );
      });
    }

    if (this.state.tensOnly) {
      filteredQuestions = filteredQuestions.filter(problem => {
        console.log(problem);
        return problem.problem_type.split(" ")[1] === "Tens";
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
            <View style={styles.inputContainer}>
              <Text style={styles.filterText}> Only Addition </Text>
              <Switch
                style={styles.addOnlySwitch}
                value={this.state.addOnly}
                onValueChange={addOnly =>
                  this.setState({
                    addOnly: !this.state.addOnly,
                    subtractOnly: false,
                    doublesAndHalfOnly: false
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.filterText}> Only Subtraction </Text>
              <Switch
                style={styles.subtractOnlySwitch}
                value={this.state.subtractOnly}
                onValueChange={subtractOnly =>
                  this.setState({
                    subtractOnly: !this.state.subtractOnly,
                    addOnly: false,
                    doublesAndHalfOnly: false
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.filterText}> Only Doubles & Halves </Text>
              <Switch
                style={styles.doublesAndHalfOnlySwitch}
                value={this.state.doublesAndHalfOnly}
                onValueChange={subtractOnly =>
                  this.setState({
                    doublesAndHalfOnly: !this.state.doublesAndHalfOnly,
                    addOnly: false,
                    subtractOnly: false,
                    tensOnly: false
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.filterText}> Only Tens </Text>
              <Switch
                style={styles.tensOnlySwitch}
                value={this.state.tensOnly}
                onValueChange={tensOnly =>
                  this.setState({
                    tensOnly: !this.state.tensOnly,
                    addOnly: false,
                    subtractOnly: false,
                    doublesAndHalfOnly: false
                  })
                }
              />
            </View>

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
  filterText: {
    height: 40,
    fontSize: 25,
    // justifyContent: "center",
    // alignItems: "center",
    top: 250,
    right: 50

    // borderRadius: 30
  },
  addOnlySwitch: { top: 250, left: 95 },
  subtractOnlySwitch: { top: 250, left: 60 },
  doublesAndHalfOnlySwitch: { top: 250 },
  tensOnlySwitch: { top: 250, left: 135 },
  inputContainer: {
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default Sheet;
