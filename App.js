
import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Settings from './Settings.js';
import SinglePost from './SinglePost.js';
import Feed from './Feed.js';
import InfluencerProfile from './InfluencerProfile.js';
import Main from './Main.js';
import WebCheckout from './WebCheckout'
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

//Views that can be accessed from Feed
const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    header: "feed"
  },

  WebCheckoutScreen: WebCheckout,
  InfluencerProfileScreen: InfluencerProfile,
  SinglePostScreen: SinglePost,
});

//Views that can be accessed from Discover/Main
const DiscoverStack = createStackNavigator({
  DiscoverScreen: {
    screen: Main,
    header: "discover"
  },

  DiscoverScreen: Main,
  SinglePostScreen: SinglePost,
  InfluencerProfileScreen: InfluencerProfile,
});

//Navigation for the footer 
const TabNavigator = createBottomTabNavigator({

  //Able to access three views from the footer
  Feed: FeedStack,
  Discover: DiscoverStack,
  Settings: Settings,

}, 

//Dynamic changes to the footer design based on what route/view is chosen
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {

      //symbol is purple for the current view 
      activeTintColor: 'purple',

      //symbol is grey for the other views
      inactiveTintColor: 'gray',
    },
});

//Symbols for the footer navigation bar
const getTabBarIcon = (navigation,tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;

  //different tabs have different symbols
  if (routeName === 'Feed') {
    iconName = `ios-people`;
  } else if (routeName === 'Discover') {
    iconName = `ios-flower`
  } else if (routeName === 'Settings') {
    iconName = `ios-options`
  }

  //Returns the specific symbol based on what route is selected
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

export default createAppContainer(TabNavigator);
