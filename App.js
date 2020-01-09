import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Menu from "./components/Menu.js";
import MainView from "./components/MainView.js";
import InfoView from "./components/InfoView.js";

const MainNavigator = createStackNavigator({
  Back: {screen: Menu},
  MainView: {screen: MainView},
  InfoView: {screen: InfoView},
})

const App = createAppContainer(MainNavigator);

export default App;
