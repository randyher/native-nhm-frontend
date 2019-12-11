import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image
} from "react-native";
import { Center } from "@builderx/utils";
import { Button, CheckBox, Slider } from "react-native-elements";
import Problem from "./problem";

class Sheet extends React.Component {
  state = {
    score: 0,
    timeRemaining: 0,
    gameType: "",
    start: false,
    end: false,
    addOnly: false,
    subtractOnly: false,
    doublesAndHalfOnly: false,
    tensOnly: false,
    intructions: false
  };

  startGame = () => {
    this.props.removeClickables();
    this.setState({
      start: true,
      intructions: true
    });
  };

  resetScreen = () => {
    this.props.removeReset();
    this.setState({
      score: 0,
      timeRemaining: 0,
      gameType: "",
      start: false,
      end: false,
      addOnly: false,
      subtractOnly: false,
      doublesAndHalfOnly: false,
      tensOnly: false,
      intructions: false
    });
  };

  endGame = (completedQuestions, timeRemaining) => {
    console.log(completedQuestions);
    console.log(timeRemaining);
    this.setState({ start: false, end: true });
    const inputs = Object.values(completedQuestions);
    const strInputs = inputs.join(" / ");
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
    let gameType;
    if (this.state.addOnly) {
      gameType = "Addition Only";
    } else if (this.state.subtractOnly) {
      gameType = "Subtraction Only";
    } else if (this.state.doublesAndHalfOnly) {
      gameType = "Doubles + Halves Only";
    } else if (this.state.tensOnly) {
      gameType = "Tens Only";
    } else {
      gameType = "All";
    }

    gameData = {
      score: newScore,
      time_remaining: timeRemaining,
      game_type: gameType,
      number_sentences: strInputs
    };

    this.props.addGame(gameData);
    this.props.removeClickables();
    this.setState({
      score: newScore,
      timeRemaining: timeRemaining,
      gameType: gameType
    });
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

    return (
      <View>
        {this.state.intructions ? null : (
          <View>
            <Text style={styles.text2}>
              Press start to begin the game. Activate
            </Text>
            <Text style={styles.text3}>
              filters to practice a specific subject!
            </Text>
          </View>
        )}

        {this.state.start ? (
          <Problem problems={questionBank} endGame={this.endGame} />
        ) : !this.state.end ? (
          <Center horizontal>
            <View style={[styles.inputContainer, { marginTop: 26 }]}>
              <Image
                style={styles.onlyAddition}
                source={require("../assets/addition.png")}
              />
              <Switch
                style={styles.addOnlySwitch}
                value={this.state.addOnly}
                onValueChange={addOnly =>
                  this.setState({
                    addOnly: !this.state.addOnly,
                    subtractOnly: false,
                    doublesAndHalfOnly: false,
                    tensOnly: false
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Image
                style={styles.onlyAddition}
                source={require("../assets/subtraction.png")}
              />
              <Switch
                style={styles.subtractOnlySwitch}
                value={this.state.subtractOnly}
                onValueChange={subtractOnly =>
                  this.setState({
                    subtractOnly: !this.state.subtractOnly,
                    addOnly: false,
                    doublesAndHalfOnly: false,
                    tensOnly: false
                  })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Image
                style={styles.onlyAddition}
                source={require("../assets/double+halves.png")}
              />
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

            <View style={[styles.inputContainer, { marginBottom: 15 }]}>
              <Image
                style={styles.onlyAddition}
                source={require("../assets/tens.png")}
              />
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
              style={styles.startButtonContainer}
              onPress={() => {
                this.startGame();
              }}
            >
              <Image
                style={styles.startButton}
                source={require("../assets/start.png")}
              />
            </TouchableOpacity>
          </Center>
        ) : null}
        <Center>
          {this.state.end ? (
            <Center horizontal>
              <Text style={styles.text4}>
                Questions Correct: {this.state.score} / 24
                {"\n"}
                Time Remaining: {this.state.timeRemaining}
                {"\n"}
                Question Filter: {this.state.gameType}
              </Text>
              <Button
                style={styles.button}
                title="Go Again!"
                onPress={this.resetScreen}
              />
            </Center>
          ) : null}
        </Center>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    top: 350.06,
    width: 145.81,
    height: 75.94,
    right: 2,
    position: "absolute"
  },
  text2: {
    top: 210,
    marginTop: 5,
    color: "#121212",
    left: 15,
    fontSize: 20,
    fontFamily: "LondonBetween"
  },
  text3: {
    top: 210,
    color: "#121212",
    left: 15,
    fontSize: 20,
    fontFamily: "LondonBetween"
  },
  text4: {
    top: 245,
    color: "#121212",
    position: "absolute",
    fontSize: 20
  },
  card1: {
    top: 296.85,
    left: 32.06,
    width: 359,
    height: 352,
    position: "absolute"
  },

  startText: {
    color: "black",
    fontSize: 25
  },

  addOnlySwitch: { top: 250, left: -60 },
  subtractOnlySwitch: { top: 250, left: -60 },
  doublesAndHalfOnlySwitch: { top: 250, left: -60 },
  tensOnlySwitch: { top: 250, left: -60 },
  inputContainer: {
    width: 250,
    height: 45,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  startButton: {
    height: 63,
    width: 188,
    resizeMode: "contain"
  },
  startButtonContainer: {
    top: 250,

    height: 63,
    marginBottom: 120,
    width: 188
  },
  onlyAddition: {
    top: 250,
    height: 300,
    width: 310,
    right: 67,
    resizeMode: "contain"
  },
  onlySubtraction: {
    height: 300,
    width: 310,
    right: 67,
    resizeMode: "contain"
  },
  onlyDoubleHalves: {
    height: 300,
    width: 310,
    right: 67,
    resizeMode: "contain"
  },
  onlyTens: {
    height: 300,
    width: 310,
    right: 67,
    resizeMode: "contain"
  }
});

export default Sheet;
