/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Main App File
 * Description : This file Manage Design and UI integration.
 */

import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import UserListStyle from "../Resources/UserListStyle";
import UserListComponent from "../Componets/UserListComponent";

class UserListScreen extends Component {
  /**
   * This function will call initiate State which can used
   * in whole screen.
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  /**
   * This function will call initiate Screen.
   */
  componentDidMount() {
    this.makeRemoteRequest();
  }

  /**
   * This function will call Web Service and returns List of Users.
   */

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  /**
   * This function will navigate to Add User and Payment Screen.
   */
  doAddUser(screen) {
    const { navigate } = this.props.navigation;
    navigate(screen);
  }
  /**
   * This function will render screen Design and UI.
   */
  render() {
    return (
      <View style={UserListStyle.container}>
        <UserListComponent data={this.state.data} />
        <TouchableOpacity onPress={() => this.doAddUser("StripePayment")}>
          <Text>Add User</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UserListScreen;
