import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';


interface CharacterDetail {
    _id: number;
    name: string;
    imageUrl: string;
    films: string[];
}

export default function CharacterDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const [character, setCharacter] = useState<CharacterDetail | null>(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetch(`https://api.disneyapi.dev/character/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCharacter(data.data); // <-- fix is here
                navigation.setOptions({ title: data.data.name });
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    useLayoutEffect(() => {
        if (character) {
            navigation.setOptions({
                headerShown: true,
                title: character.name,
                headerBackTitleVisible: false, // optional: hides "Back" text on iOS
            });
        }
    }, [navigation, character]);

    if (loading || !character) {
        return (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            </View>
    );
    }

    return (
        <View style={styles.container}>

        <Image source={{ uri: character.imageUrl }} style={styles.image} />
    <Text style={styles.sectionTitle}>Films</Text>
        <FlatList
    data={character.films}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => <Text style={styles.filmItem}>• {item}</Text>}
    />
    </View>
);
}

    const styles = StyleSheet.create({
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 16,
        },
        image: {
            width: '100%',
            height: 280,
            maxHeight: 300,
            borderRadius: 16,
            resizeMode: 'cover',
            backgroundColor: '#eee',
            marginBottom: 24, // ← add this!
        },

        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        filmItem: {
            fontSize: 16,
            paddingVertical: 4,
        },
    });
