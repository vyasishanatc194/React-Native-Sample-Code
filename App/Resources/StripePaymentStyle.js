/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Stripe List Style File
 * Description : This file used for maintain screen Design and UI.
 */
import { StyleSheet } from "react-native";
import Colors from "./Colors";

const StripePaymentStyle = StyleSheet.create({
    inputIOS: {
      padding:10,
      flex: 1,
      fontSize: 14,
      color:Colors.colorInput 
    },
    ImageBackground: { width: "100%", height: "100%" },
    mainView: { position: "relative", marginBottom: 30 },
    customCard: {
      borderRadius: 20,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 40,
      paddingBottom: 40,
      position: "relative"
    },
    buttonView: { width: "100%", position: "absolute", bottom: -50 },
    TextInputStyleClass: {
      marginStart: 20,
      marginTop: 10,
      marginEnd: 20,
      height: 50,
      borderWidth: 1,
      borderColor: Colors.colorBorder,
      borderRadius: 10,
      backgroundColor: Colors.colorWhite
    },
    searchSection: {
      flex: 1,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    searchIcon: {
      height: 24,
      width: 24,
      padding: 10,
      marginLeft: 10
    },
    input: {
      backgroundColor: Colors.colorWhite,
      flex: 1,
      paddingTop: 10,
      paddingRight: 15,
      paddingBottom: 10,
      paddingLeft: 10,
      marginEnd: 10,
      color: Colors.colorInputBg
    }
  });

  export default StripePaymentStyle;