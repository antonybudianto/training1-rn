import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MarketScreen from "./screens/MarketScreen";
import HomeScreen from "./screens/HomeScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import WalletScreen from "./screens/WalletScreen";
import AccountScreen from "./screens/AccountScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Market">
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-home-outline" size={20} color="black" />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-newspaper-outline" size={20} color="black" />
            ),
          }}
          component={DiscoverScreen}
        />
        <Tab.Screen
          name="Market"
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-stats-chart" size={20} color="black" />
            ),
          }}
          component={MarketScreen}
        />
        <Tab.Screen
          name="Wallet"
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-wallet-outline" size={20} color="black" />
            ),
          }}
          component={WalletScreen}
        />
        <Tab.Screen
          name="Account"
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-people-outline" size={20} color="black" />
            ),
          }}
          component={AccountScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
