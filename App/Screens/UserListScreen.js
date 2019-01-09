/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Main App File
 * Description : This file Manage Design and UI integration.
 */

import React, { Component } from "react";
import { View } from "react-native";
import UserListStyle from "../Resources/UserListStyle";
import UserListComponent from "../Componets/UserListComponent";

class UserListScreen extends Component {
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
  componentDidMount() {
    this.makeRemoteRequest();
  }
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
  render() {
    return (
      <View style={UserListStyle.container}>
        <UserListComponent data={this.state.data} />
      </View>
    );
  }
}

export default UserListScreen;
