/**
 * Created by Citrusbug.
 * User: Ishan Vyas
 * Date: 09/01/19
 * Time: 12:00 PM
 * Title : Main App File
 * Description : This file used for maintain Screens custom Components.
 */
import React, { PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../Resources/Colors";
import UserListStyle from "../Resources/UserListStyle";
class UserListComponent extends PureComponent {
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
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: Colors.colorSeparator,
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <TextInput placeholder="Type Here..." />;
  };
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
  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  renderItem(item, index) {
    return (
      <View>
        <View style={UserListStyle.itemStyle}>
          <Image style={UserListStyle.icon} source={item.picture.thumbnail} />
          <View>
            <Text>{`${item.name.first} ${item.name.last}`}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </View>
    );
  }
}

UserListComponent.propTypes = {
  data: PropTypes.array,
  navigation: PropTypes.object
};
export default UserListComponent;
