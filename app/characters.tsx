// app/characters.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';



interface Character {
    _id: number;
    name: string;
    imageUrl: string;
}

export default function CharactersScreen() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Results',
        });
    }, [navigation]);

    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            if (!name) return;
            try {
                const response = await fetch(
                    `https://api.disneyapi.dev/character?name=${encodeURIComponent(name as string)}`
                );
                const json = await response.json();

                if (Array.isArray(json.data)) {
                    // Multiple matches
                    setCharacters(json.data);
                } else if (json.data && typeof json.data === 'object') {
                    // Single match
                    setCharacters([json.data]);
                } else {
                    setCharacters([]);
                }
            } catch (error) {
                console.error('Error fetching characters:', error);
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        };


        fetchCharacters();
    }, [name]);


    const router = useRouter();

    const renderItem = ({ item }: { item: Character }) => (
        <TouchableOpacity
            onPress={() => router.push(`/character/${item._id}`)}
            style={styles.card}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (characters.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No characters found for "{name}".</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={characters}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
        backgroundColor: '#f2f2f7', // ← soft grey background
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',      // ← white card
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        elevation: 2,                 // Android shadow
        shadowColor: '#000',         // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1c1c1e', // Dark gray text (not pure black)
    },
});
