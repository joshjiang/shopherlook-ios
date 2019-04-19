
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


const FeedStack = createStackNavigator({
    FeedScreen: Feed,
    InfluencerProfileScreen: InfluencerProfile,
    SinglePostScreen: SinglePost,
});

const DiscoverStack = createStackNavigator({
  DiscoverScreen: Main,
  SinglePostScreen: SinglePost,
  InfluencerProfileScreen: InfluencerProfile,
})


const TabNavigator = createBottomTabNavigator({
  FeedScreen: FeedStack,
  // FeedScreen: Feed,
  MainName: DiscoverStack,
  SettingsName: Settings,
  
});

export default createAppContainer(TabNavigator);

// class HomeScreen extends React.Component {
//   render() {}
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

// const AppNavigator2 = createStackNavigator({
//   Home: HomeScreen
// });

// export default createAppContainer(AppNavigator2);

// export default HomeScreen;