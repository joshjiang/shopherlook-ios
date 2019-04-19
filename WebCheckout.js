import React, {Component} from 'react';
import {WebView} from 'react-native';

class WebCheckout extends Component {
  render() {
    return (
      <WebView
        source={{uri: this.props.navigation.getParam('webUrl', '')}}
        style={{flex:1}}
      />
    );
  }
}

export default WebCheckout;