/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore.js'
import Router from './app/containers/Router'
import {
  AppRegistry,
} from 'react-native';
const store = configureStore()
export default class pickup extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('pickup', () => pickup);
