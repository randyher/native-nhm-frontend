import { createAppContainer, createStackNavigator } from "react-navigation";
import Game from "./Game";
import Login from "./Login";

const AppNavigator = createStackNavigator(
  {
    Game: {
      screen: Game,
      navigationOptions: {
        header: null
      }
    },
    Login: { screen: Login }
  },
  {
    initialRouteName: "Game",
    title: "HEY"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
