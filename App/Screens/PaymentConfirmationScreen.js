/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Payment Confirmation Screen
 * Description : This file Will show payment confirmation.
 */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform 
} from "react-native";

import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import styles from "../Resource/Styles";
import  {
  showMessage,
} from "react-native-flash-message";
import { NavigationActions, StackActions } from "react-navigation";
import PaymentConfirmStyle from "../Resources/PaymentConfirmStyle";

class PaymentConfirmationScreen extends Component {
 
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
         
          <Text
            style={{
              fontSize: 15,
              marginLeft: 10,
              fontFamily:
                Platform.OS == "android" ? "Raleway Bold" : "Raleway-Bold",
              color: Colors.colorText
            }}
          >
            PAYMENT CONFIRMATION
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: Colors.colorHeader
      }
    };
  };
  doFinish(screen) {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: screen })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  updateUser = month => {
    this.setState({ Month: month });
  };
  showSnackBar(messageText) {
    showMessage({
      message: messageText,
      type: "danger",
      backgroundColor: Colors.white,
      color: Colors.black
    });
  }

  doFinish(screen){
    const resetAction = StackActions.reset({
      index: 0,
     key:null,
      actions: [
        NavigationActions.navigate({ routeName: screen })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  /**
   * This function will call Render Payment Confirmation Screen Design and UI.
   */
  render() {
    return (
      <View>
        <ImageBackground
          source={Icons.bgImage}
          style={PaymentConfirmStyle.imageBackground}
        >
          <View style={PaymentConfirmStyle.itemMainLayout}>
            <View>
              <View style={[styles.card, PaymentConfirmStyle.customCard]}>
                <View>
                  <Image
                    source={Icons.payment_done}
                    style={{
                      height: 180,
                      width: 180,
                      alignSelf: "center",
                      margin: 20
                    }}
                  />
                  <Text
                    style={{
                      marginTop:20,
                      textAlign:'center',
                      fontSize: 30,
                      fontFamily:
                        Platform.OS == "android"
                          ? "Raleway Bold"
                          : "Raleway-Bold"
                    }}
                  >
                    $8
                  </Text>
                  <Text
                    style={{
                      marginTop:20,
                      textAlign:'center',
                      fontSize: 15,
                      fontFamily:
                        Platform.OS == "android"
                          ? "Raleway Bold"
                          : "Raleway-Bold"
                    }}
                  >
                   Payment done successfully
                  </Text>
                  <Text
                    style={{
                      color:Colors.colorHint,
                      marginTop:20,
                      textAlign:'center',
                      fontSize: 15,
                      fontFamily:
                        Platform.OS == "android"
                          ? "Raleway Light"
                          : "Raleway-Light"
                    }}
                  >
                   02:45 pn, 12 Sept 2018
                  </Text>
                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                  <Text
                    style={{
                      color:Colors.colorHint,
                      
                      textAlign:'center',
                      fontSize: 15,
                      fontFamily:
                        Platform.OS == "android"
                          ? "Raleway Light"
                          : "Raleway-Light"
                    }}
                  >
                   Txn Id {" "}
                  </Text>
                  <Text
                    style={{
                      color:Colors.colorHint,
                    
                      textAlign:'center',
                      fontSize: 15,
                      fontFamily:
                        Platform.OS == "android"
                          ? "Raleway Light"
                          : "Raleway-Light"
                    }}
                  >
                   02:45 pn, 12 Sept 2018
                  </Text>
                  </View>
                </View>
              </View>

              <View style={PaymentConfirmStyle.buttonView}>
                <TouchableOpacity onPress={() => this.doFinish('Users')}>
                  <ImageBackground
                    source={Icons.button}
                    style={[styles.button]}
                    imageStyle={[
                      styles.buttonImageStyle,
                      { marginLeft: 40, marginRight: 40 }
                    ]}
                  >
                    <Text style={styles.buttonText}>DONE</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}


export default PaymentConfirmationScreen;
