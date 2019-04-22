
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Settings from './Settings.js';
import SinglePost from './SinglePost.js';
import Feed from './Feed.js';
import Filters from './Filters.js';
import InfluencerProfile from './InfluencerProfile.js';
import Main from './Main.js';
import Cart from './Cart.js';
import SignUp from './SignUp.js';
import WebCheckout from './WebCheckout'
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    header: "feed"
  },
  WebCheckoutScreen: WebCheckout,
  InfluencerProfileScreen: InfluencerProfile,
  SinglePostScreen: SinglePost,
});

const DiscoverStack = createStackNavigator({
  DiscoverScreen: Main,
  SinglePostScreen: SinglePost,
  InfluencerProfileScreen: InfluencerProfile,
})

const TabNavigator = createBottomTabNavigator({
  // Feed: {
  //   screen: FeedStack,
  //   headerTitle: `Feed`
  //   // navigationOptions: ({ navigation }) => ({
  //   //   header: `Feed`,
  //   // })
  // },
  Feed: FeedStack,
  // FeedScreen: Feed,
  Discover: DiscoverStack,
  // Discover: {
  //   screen: DiscoverStack,
  //   navigationOptions: ({ navigation }) => ({
  //     title: `Discover`,
  //   }),
  // },
  Settings: Settings,

},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: '#ffd6dd',
      inactiveTintColor: 'gray',
    },
  }
);

//https://infinitered.github.io/ionicons-version-3-search/

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Feed') {
    // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    // iconName = `ios-arrow-back${focused ? '' : '-outline'}`;
    iconName = `ios-people`;

    // We want to add badges to home tab icon
    // IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Discover') {
    // iconName = `ios-baseball${focused ? '' : '-outline'}`;
    iconName = `ios-flower`
  } else if (routeName === 'Settings') {
    // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    iconName = `ios-options`
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

//not needed, possibly future implementation
class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};



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