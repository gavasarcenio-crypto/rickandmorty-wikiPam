
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image } from "react-native";
import CharactersListScreen from "../screens/CharactersListScreen";
import CharacterDetailScreen from "../screens/CharacterDetailScreen";
import portalImg from "../assets/portal.png";
import logoImg from "../assets/logo.png";


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: "#1b1e22",
    },
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/portal.png")}
          style={{ width: 40, height: 40, marginRight: 8 }}
        />
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 150, height: 40, resizeMode: "contain" }}
        />
      </View>
    ),
  }}
>
  <Stack.Screen 
    name="CharactersList" 
    component={CharactersListScreen}
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