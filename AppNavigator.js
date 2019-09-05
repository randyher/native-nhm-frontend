import { createAppContainer, createStackNavigator } from "react-navigation";
import Game from "./Game";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

const AppNavigator = createStackNavigator(
  {
    Game: {
      screen: Game,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Game",
    title: "HEY"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
