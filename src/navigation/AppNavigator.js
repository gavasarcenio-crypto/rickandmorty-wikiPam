import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "../screens/CharactersListScreen";
import CharacterDetailScreen from "../screens/CharacterDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="CharactersList" 
          component={CharactersListScreen}
          options={{ title: "Rick and Morty" }}
        />
        <Stack.Screen 
          name="CharacterDetail" 
          component={CharacterDetailScreen}
          options={{ title: "Detalhes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
