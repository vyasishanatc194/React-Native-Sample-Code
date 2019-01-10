/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Payment Screen
 * Description : This file Manage Stripe Payment .
 */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  AsyncStorage,
  ActivityIndicator,
  NetInfo,
  Alert
} from "react-native";

import Stripe from "react-native-stripe-api";
import Icons from "../Resource/Icons";
import Colors from "../Resource/Colors";
import styles from "../Resource/Styles";
import Api from "../Network/Api";
import { showMessage } from "react-native-flash-message";
import RNPickerSelect from "react-native-picker-select";
import { NavigationActions, StackActions } from "react-navigation";
var valid = require("card-validator");

class StripPaymentScreen extends Component {

    /**
   * This function will call initiate State which can used
   * in whole screen.
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      invalidCard: true,
      cardType: "",
      Card_holder_name: "Test",
      Card_number: "4242424242424242",
      Month: "01",
      Year: "2025",
      ccv: "123",
      years: [],
      months: [
        {
          label: "01",
          value: "01"
        },
        {
          label: "02",
          value: "02"
        },
        {
          label: "03",
          value: "03"
        },
        {
          label: "04",
          value: "04"
        },
        {
          label: "05",
          value: "05"
        },
        {
          label: "06",
          value: "06"
        },
        {
          label: "07",
          value: "07"
        },
        {
          label: "08",
          value: "08"
        },
        {
          label: "09",
          value: "09"
        },
        {
          label: "10",
          value: "10"
        },
        {
          label: "11",
          value: "11"
        },
        {
          label: "12",
          value: "12"
        }
      ]
    };
    var today = new Date();
    for (let i = today.getFullYear(); i < 2060; i++) {
      this.state.years.push({
        label: "" + i,
        value: "" + i
      });
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Image
              source={Icons.ic_back}
              style={{ marginLeft: 10, height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 10,
              fontFamily:
                Platform.OS == "android" ? "Raleway Bold" : "Raleway-Bold",
              color: Colors.colorText
            }}
          >
            Payment now
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: Colors.colorHeader
      }
    };
  };
 /**
   * This function will validate card detail and do payment
   * after payment will navigate to Confirmation screen.
   */
  doSubmitPlan = async () => {
    const { data, fromData } = this.props.navigation.state.params;
    if (this.state.Card_holder_name === "") {
      this.showSnackBar("Please enter name");
    } else if (this.state.Card_number === "") {
      this.showSnackBar("Please enter your card number");
    } else if (this.state.Card_number.length < 10) {
      this.showSnackBar("Please enter valid card number");
    } else if (this.state.invalidCard) {
      this.showSnackBar("Please enter valid card number");
    } else if (this.state.Month == "") {
      this.showSnackBar("Select month");
    } else if (this.state.Year == "") {
      this.showSnackBar("Select year");
    } else if (this.state.ccv == "") {
      this.showSnackBar("Enter your CCV number");
    } else if (this.state.ccv.length < 3) {
      this.showSnackBar("Enter valid CCV number");
    } else {
      this.setState({
        isLoading: true
      });
      const apiKey = "pk_test_*********************";
      const client = new Stripe(apiKey);
      const token = await client.createToken({
        number: this.state.Card_number,
        exp_month: this.state.Month,
        exp_year: this.state.Year,
        cvc: this.state.ccv,
        address_zip: "12345"
      });
      console.log(token.id);
      if (token.id === undefined) {
        this.setState({
          isLoading: false
        });
        this.showSnackBar(token.error.message);
        console.log("Error", token.error.message);
      } else {
        AsyncStorage.getItem("data")
          .then(data2 => {
            const myData = JSON.parse(data2);

            const bodyData = new FormData();
            
            NetInfo.isConnected.fetch().then(isConnected => {
              if (isConnected) {
                this.doAddUserInListApi(bodyData, myData.token);
              } else {
                Alert.alert(
                  "Internet Connection",
                  "Kindly connect to Internet then try again"
                );
              }
            });
          })
          .done();
      }
    }
  };
 /**
   * This function will show message if any message will generate
   */
  showSnackBar(messageText) {
    showMessage({
      message: messageText,
      type: "danger",
      backgroundColor: Colors.white,
      color: Colors.black
    });
  }

   /**
   * This function will call Web Service and Add user
   * after payment will navigate to Confirmation screen.
   */
  doAddUserInListApi(bodyData, token) {
    const { navigate } = this.props.navigation;
    fetch(Api.postAddUser, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      },
      body: bodyData
    })
      .then(response => response.json())
      .then(responseJson => {
        const message = responseJson.message;
        const status = responseJson.status;
        console.log(responseJson);

        switch (status) {
          case 200: {
            this.setState({
              isLoading: false
            });
            navigate("PaymentConfirmationScreen");
            this.showSnackBar(message);
            break;
          }
          case 401: {
            this.setState({
              isLoading: false
            });
            this.showSnackBar(message);
            break;
          }
          case 400: {
            this.setState({
              isLoading: false
            });
            this.showSnackBar(message);
            break;
          }
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        this.showSnackBar(JSON.stringify(error));
        console.error(error);
      });
  }
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
  
  doRedirect(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
 /**
   * This function will render Payment Screen
   */
  render() {
    return (
      <View>
        <ImageBackground
          source={Icons.bgImage}
          style={customStyles.ImageBackground}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={customStyles.mainView}>
              <View>
                <View style={[styles.card, customStyles.customCard]}>
                  <View style={customStyles.TextInputStyleClass}>
                    <View style={customStyles.searchSection}>
                      <Image
                        style={customStyles.searchIcon}
                        source={Icons.user}
                      />
                      <TextInput
                        style={customStyles.input}
                        placeholder="Card holder name"
                        keyboardType="ascii-capable"
                        onChangeText={Card_holder_name => {
                          this.setState({ Card_holder_name: Card_holder_name });
                        }}
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                  <View style={customStyles.TextInputStyleClass}>
                    <View style={customStyles.searchSection}>
                      <Image
                        style={customStyles.searchIcon}
                        source={Icons.credit_card}
                      />
                      <TextInput
                        style={customStyles.input}
                        placeholder="Card number"
                        keyboardType="numeric"
                        maxLength={19}
                        onChangeText={Card_number => {
                          var numberValidation = valid.number(Card_number);
                          if (!numberValidation.isPotentiallyValid) {
                            this.setState({ invalidCard: true });
                          } else {
                            this.setState({ invalidCard: false });
                          }
                          if (numberValidation.card) {
                            this.setState({
                              cardType: numberValidation.card.type
                            });
                          }
                          this.setState({ Card_number });
                        }}
                        underlineColorAndroid="transparent"
                      />
                      <Text style={{ marginEnd: 5, color: Colors.colorBg }}>
                        {this.state.cardType}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={[
                        customStyles.TextInputStyleClass,
                        {
                          flex: 1,
                          marginStart: 20,
                          marginEnd: 2
                        }
                      ]}
                    >
                      <View style={customStyles.searchSection}>
                        <Image
                          style={customStyles.searchIcon}
                          source={Icons.calendar}
                        />
                        <View style={customStyles.inputIOS}>
                          <RNPickerSelect
                            hideIcon={true}
                            placeholder={{
                              label: "Month",
                              value: null
                            }}
                            items={this.state.months}
                            onValueChange={value => {
                              this.setState({
                                Month: value
                              });
                            }}
                            value={this.state.Month}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        customStyles.TextInputStyleClass,
                        {
                          flex: 1,
                          marginStart: 2,
                          marginEnd: 20
                        }
                      ]}
                    >
                      <View style={customStyles.searchSection}>
                        <Image
                          style={customStyles.searchIcon}
                          source={Icons.calendar}
                        />
                        <View style={customStyles.inputIOS}>
                          <RNPickerSelect
                            hideIcon={true}
                            placeholder={{
                              label: "Year",
                              value: null
                            }}
                            items={this.state.years}
                            onValueChange={value => {
                              this.setState({
                                Year: value
                              });
                            }}
                            value={this.state.Year}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={customStyles.TextInputStyleClass}>
                    <View style={customStyles.searchSection}>
                      <Image
                        style={customStyles.searchIcon}
                        source={Icons.padlock_unlock}
                      />
                      <TextInput
                        style={customStyles.input}
                        placeholder="CCV"
                        secureTextEntry={true}
                        maxLength={3}
                        keyboardType="numeric"
                        onChangeText={ccv => {
                          this.setState({ ccv });
                        }}
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>
                </View>
                <View style={customStyles.buttonView}>
                  <TouchableOpacity onPress={() => this.doSubmitPlan()}>
                    <ImageBackground
                      source={Icons.button}
                      style={[styles.button]}
                      imageStyle={[
                        styles.buttonImageStyle,
                        { marginLeft: 40, marginRight: 40 }
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          { display: this.state.isLoading ? "none" : "flex" }
                        ]}
                      >
                        Payment
                      </Text>
                      <ActivityIndicator
                        size="large"
                        color="#FFF"
                        style={{
                          justifyContent: "center",
                          display: this.state.isLoading ? "flex" : "none"
                        }}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default StripPaymentScreen;
