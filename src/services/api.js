import axios from "axios";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "../screens/CharactersListScreen";
import CharacterDetailScreen from "../screens/CharacterDetailScreen";

const Stack = createStackNavigator();

// Configuração da instância do Axios para a API do Rick and Morty
export const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

// Componente para exibir um cartão de personagem
export function CharacterCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>
          {item.status} - {item.species}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Componente para o cabeçalho com logo e portal
function HeaderTitle() {
  return (
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
  );
}

// Configuração do navegador de telas
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1b1e22",
          },
          headerTitleAlign: "center",
        }}
      >
        {/* Tela inicial com a lista de personagens */}
        <Stack.Screen
          name="CharactersList"
          component={CharactersListScreen}
          options={{
            headerTitle: () => <HeaderTitle />,
          }}
        />
        {/* Tela de detalhes do personagem */}
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
          options={{
            headerTitle: () => <HeaderTitle />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#272b33",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    color: "#ccc",
    marginTop: 4,
  },
});
