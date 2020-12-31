/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'


// import Countries from './Components/Countries'
import Worldstats from './Components/Worldstats'
import SplashScreen from './Components/Splashscreen'
import MyTabs2 from './Components/Favourities';
import MyTabs from './Components/Countries';


const Tab = createMaterialBottomTabNavigator();
class Nav extends React.Component{
  render(): React$Node {
    return (
        <NavigationContainer>
        <Tab.Navigator
            initialRouteName="World"
            activeColor='white'
            inactiveColor='gray'
            shifting={true}
            barStyle={{ backgroundColor: 'red',height:50}}
        >

          <Tab.Screen

              name="World" component={Worldstats}
              options={{
                tabBarColor:'#037b9e',
                tabBarIcon: ({ color }) => (
                    <Icon name="globe" type="ionicon" size={25} color="white" />
                ),
              }}
          />

          <Tab.Screen

              name="Countries" component={MyTabs}
              options={{
                tabBarColor:'#74020e',
                tabBarIcon: ({ color }) => (
                    <Icon name="list" type="ionicon" size={25}  color="white" />
                ),
              }}
          />

            <Tab.Screen

                name="Favourities" component={MyTabs2}
                options={{
                    tabBarColor:'#f8ca41',
                    tabBarIcon: ({ color }) => (
                        <Icon name="star" type="ionicon" size={25}  color="white" />
                    ),
                }}
            />
        </Tab.Navigator>
        </NavigationContainer>
    );
  }
}


class CountryStats extends React.Component{

  constructor(props) {
    super(props);

    this.state = { isLoading: true,
    }
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
        setTimeout(
            () => { resolve('result') },
            3000
        )
    );
  }





  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }
  render() {
    if (this.state.isLoading) {
      return (<SplashScreen />);
    }
    else
    {
      return (
          <Nav/>
      )
    }

  };
}






const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'red'
  },
});

export default CountryStats;
