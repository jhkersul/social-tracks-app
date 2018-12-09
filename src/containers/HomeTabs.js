import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import ListenScreen from './ListenScreen';
import SettingsScreen from './SettingsScreen';
import StatisticsScreen from './StatisticsScreen';
import Colors from '../constants/Colors';
import Icon from '../components/Icon';

const HomeTabs = createBottomTabNavigator(
  {
    Listen: ListenScreen,
    Statistics: StatisticsScreen,
    Settings: SettingsScreen,
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: (iconProps) => {
        const { routeName } = navigation.state;
        const { focused } = iconProps;
        const icons = {
          Listen: 'play-circle',
          Statistics: 'chart-pie',
          Settings: 'sliders-h',
        };

        return (
          <Icon
            name={icons[routeName]}
            color={focused ? Colors.white : 'rgba(255, 255, 255, 0.5)'}
            size={25}
          />
        );
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: Colors.default,
      },
      labelStyle: {
        color: Colors.white,
      },
    },
  },
);

export default HomeTabs;
