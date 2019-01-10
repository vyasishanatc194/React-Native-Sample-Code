/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Payment Confirmation Style File
 * Description : This file used for maintain screen Design and UI.
 */
import { StyleSheet } from "react-native";
const PaymentConfirmStyle = StyleSheet.create({
  imageBackground: { width: "100%", height: "100%" },
  itemMainLayout: { position: "relative", marginBottom: 60, marginTop: 40 },
  customCard: {
    height: "100%",
    borderRadius: 20,
    marginLeft: 25,
    marginRight: 25,
    position: "relative"
  },
  buttonView: { width: "100%", position: "absolute", bottom: -50 }
});

export default PaymentConfirmStyle;
