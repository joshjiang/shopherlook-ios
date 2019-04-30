import React, {Component} from 'react';
import {WebView} from 'react-native';

/**
 * a webview that takes a webURL from a checkout object
 * originWhitelist={['*']}  is a hotfix for promise errors
 */
class WebCheckout extends Component {
  render() {
    return (
      <WebView
        source={{uri: this.props.navigation.getParam('webUrl', '')}}
        style={{flex:1}}
        onError={console.log('webview load error')}
        originWhitelist={['*']}
      />
    );
  }
}

export default WebCheckout;