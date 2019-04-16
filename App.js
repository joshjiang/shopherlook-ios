
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Settings from './Settings.js';
import SinglePost from './SinglePost.js';
import Feed from './Feed.js';
import Filters from './Filters.js';
import InfluencerProfile from './InfluencerProfile.js';
import Main from './Main.js';
import Cart from './Cart.js';
import SignUp from './SignUp.js';


const TabNavigator = createBottomTabNavigator({
  Feed: Cart,
  MainName: Main,
  SettingsName: Settings,
  
});

export default createAppContainer(TabNavigator);