import React from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";
import { Center } from "@builderx/utils";
import { Button } from "react-native-elements";
import Icon from "react-native-ionicons";

class Problem extends React.Component {
  state = {
    timer: 60,
    questionCount: 0,
    completedQuestions: {},
    currentAnswer: ""
  };

  componentDidMount() {
    this.nameInput.focus();

    this.interval = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState(prevState => ({
          timer: prevState.timer - 1
        }));
      } else {
        clearInterval(this.interval);
        this.props.endGame(this.state.completedQuestions, this.state.timer);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  nextQuestion = () => {
    if (this.state.questionCount === 23) {
      const completeData = {
        ...this.state.completedQuestions,
        [this.state.questionCount]: `${
          this.props.problems[this.state.questionCount]
        } ${this.state.currentAnswer}`
      };
      this.props.endGame(completeData, this.state.timer);
    }
    const questionData = {
      ...this.state.completedQuestions,
      [this.state.questionCount]: `${
        this.props.problems[this.state.questionCount]
      } ${this.state.currentAnswer}`
    };
    this.setState({
      questionCount: (this.state.questionCount += 1),
      completedQuestions: questionData,
      currentAnswer: ""
    });
  };

  onChange = e => {
    if (e.length >= 3) {
      return;
    }
    this.setState({ currentAnswer: e });
  };

  render() {
    const problem = this.props.problems[this.state.questionCount];
    return (
      <View>
        <Center horizontal>
          <Text style={styles.text3}> {this.state.timer} </Text>
          <Text style={styles.text4}> {problem} </Text>
          <TextInput
            style={styles.input}
            placeholder="#"
            ref={input => {
              this.nameInput = input;
            }}
            keyboardType={"number-pad"}
            onChangeText={this.onChange}
            value={this.state.currentAnswer}
          />
        </Center>
        <Button
          style={styles.button}
          title="Next"
          onPress={this.nextQuestion}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text3: {
    top: 160,
    color: "#121212",
    position: "absolute",
    fontSize: 65,
    color: "red"
  },
  text4: {
    top: 325,
    right: 100,
    color: "#121212",
    position: "absolute",
    fontSize: 65
  },
  input: {
    top: 325,
    right: 25,
    fontSize: 71,
    position: "absolute"
  },
  button: {
    top: 460.06,
    left: 115.0,
    width: 145.81,
    height: 75.94,
    position: "absolute"
  }
});

export default Problem;
