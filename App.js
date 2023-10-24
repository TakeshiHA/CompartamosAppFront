import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import ClientFormScreen from "./screens/ClientFormScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Compartamos",
            headerStyle: {
              backgroundColor: "#ce0058",
            },
            headerTitleStyle: {
              color: "#ffffff",
              fontWeight: "bold",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ClientFormScreen")}
              >
                <Text style={{ color: "#fff", marginRight: 20, fontSize: 15 }}>
                  New
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ClientFormScreen"
          component={ClientFormScreen}
          options={{
            title: 'Create a Client',
            headerStyle: {
              backgroundColor: "#ce0058",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;