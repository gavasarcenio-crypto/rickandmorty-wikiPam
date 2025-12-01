import { useEffect, useState } from "react";
import { View, TextInput, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CharacterCard from "../components/CharacterCard";
import { api } from "../services/api";

export default function CharactersListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchCharacters = async (url, isSearch = false) => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await api.get(url.replace(api.defaults.baseURL, ""));
      const data = response.data;

      // Atualiza a lista de personagens
      setCharacters((prev) => (isSearch ? data.results : [...prev, ...data.results]));
      setNextPage(data.info.next); // Salva a próxima página
    } catch (err) {
      console.error("Erro ao carregar personagens:", err.message);
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
      {/* Campo de busca */}
      <TextInput
        placeholder="Buscar personagem..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
      />

      {/* Lista de personagens */}
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CharacterCard
            item={item}
            onPress={() => navigation.navigate("CharacterDetail", { id: item.id })}
          />
        )}
        onEndReached={() => fetchCharacters(nextPage)}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#00ff00" />}
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
