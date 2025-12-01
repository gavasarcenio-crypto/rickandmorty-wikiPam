// src/navigation/AppNavigation.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "../screens/CharactersListScreen";
import CharacterDetailScreen from "../screens/CharacterDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="CharactersList">
      <Stack.Screen
        name="CharactersList"
        component={CharactersListScreen}
        options={{ title: "Personagens" }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: "Detalhes" }}
      />
    </Stack.Navigator>
  );
}
