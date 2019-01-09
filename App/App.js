/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Main App File
 * Description : This file initiate the app and navigate to screens.
 */

import { createStackNavigator } from "react-navigation";
import UserListScreen from "./Screens/UserListScreen";

const App = createStackNavigator({
  Users: { screen: UserListScreen }
});

export default App;
