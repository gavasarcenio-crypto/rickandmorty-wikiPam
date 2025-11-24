import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { api } from "../services/api";

export default function CharacterDetailScreen({ route }) {
  const { id } = route.params;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const loadCharacter = async () => {
      const response = await api.get(`/character/${id}`);
      setCharacter(response.data);
    };

    loadCharacter();
  }, []);

  if (!character) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.text}>Status: {character.status}</Text>
      <Text style={styles.text}>Espécie: {character.species}</Text>
      <Text style={styles.text}>Gênero: {character.gender}</Text>
      <Text style={styles.text}>Origem: {character.origin.name}</Text>
      <Text style={styles.text}>Localização Atual: {character.location.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1b1e22",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1b1e22",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 26,
    color: "#fff",
    marginTop: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 6,
  },
});
