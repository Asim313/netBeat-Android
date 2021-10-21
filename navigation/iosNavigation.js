import React, { Component, useEffect, useState } from 'react';
import {View,Text, ScrollView,SafeAreaView, StyleSheet, TouchableOpacity,Image, Platform} from 'react-native'
import Home from '../views/home/index';
// import FlatStreaming from '../views/2dStreaming/index';
import WalkThrough from '../views/walkThrough/index';
import { createStackNavigator } from 'react-navigation-stack';
import Details from '../views/home/details/index';
import ViewerSelection from '../views/streaming/viewerSelection';
import SimpleStreaming from '../views/2dStreaming/index';
import Streaming from '../views/streaming/iosStreaming'


    const IosRootStack = createStackNavigator({
      walkThrough: {
        screen: WalkThrough
      },
      home: {
        screen: Home
      },
      homeDetails : {
        screen: Details
      },
      viewerSelection : {
        screen: ViewerSelection
      },
      simpleStreaming : {
        screen: SimpleStreaming
      },
      iosStreaming : {
        screen: Streaming
      }
      
    },{
            headerMode: 'none',
            navigationOptions: {
              gesturesEnabled: false
            }
        });
    

export default class App extends React.Component {
  render() {
    return <IosRootStack></IosRootStack>
    
  }
}

// const screens = {}
//   screens['home'] = { screen: Home }
//   screens['streaming'] = { screen: Streaming }
//   screens['lensmode'] = { screen: LensMode }

//   const AppSwitchNavigator =  createStackNavigator({
//     ...screens,
//     default: {
//       screen: 'main'
//     }
//   }, {
//       headerMode: 'none',
//       navigationOptions: {
//         gesturesEnabled: false
//       }
//     })
  

//   const AppNave = createAppContainer(AppSwitchNavigator);

//   AppNave.router = App.router

