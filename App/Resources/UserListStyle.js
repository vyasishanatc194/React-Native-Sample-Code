/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Main App File
 * Description : This file used for maintain screen Design and UI.
 */
import { StyleSheet } from "react-native";
import Colors from "./Colors";

const UserListStyle = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.colorWhite },
  itemStyle: { flexDirection: "row" },
  icon: { width: 30, height: 30, borderRadius: 15 }
});

export default UserListStyle;