import React, { Component } from "react";
import AppContainer from "./AppNavigator";

export default class App extends Component {
  state = {
    currentUser: ""
  };

  logUserIn = () => {
    console.log("LOG ME IN");
  };
  render() {
    return <AppContainer logUserIn={this.logUserIn} />;
  }
}
