import { useEffect, useState } from "react";
import { View, TextInput, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CharacterCard from "../components/CharacterCard";
import { api } from "../services/api";

export default function CharactersListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState("https://rickandmortyapi.com/api/character");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchCharacters = async (url, isSearch = false) => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await api.get(url.replace(api.defaults.baseURL, ""));
      const data = response.data;

      setCharacters(prev =>
        isSearch ? data.results : [...prev, ...data.results]
      );
      setNextPage(data.info.next);
    } catch (err) {
      console.warn("Erro ao carregar personagens");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters("/character");
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 1) {
      fetchCharacters(`/character/?name=${text}`, true);
    } else {
      fetchCharacters("/character", true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar personagem..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CharacterCard
            item={item}
            onPress={() =>
              navigation.navigate("CharacterDetail", { id: item.id })
            }
          />
        )}
        onEndReached={() => fetchCharacters(nextPage)}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#00ff00" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1e22",
    padding: 10,
  },
  input: {
    backgroundColor: "#2d323b",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 10,
  },
});
