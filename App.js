import React, { Component } from "react";
import AppContainer from "./AppNavigator";

export default class App extends Component {
  state = {
    currentUser: ""
  };

  render() {
    return <AppContainer />;
  }
}
