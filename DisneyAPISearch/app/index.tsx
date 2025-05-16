// app/index.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';


export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (query.trim()) {
            router.push({ pathname: '/characters', params: { name: query.trim() } });
        }
    };

    useFocusEffect(
        useCallback(() => {
            setQuery('');
        }, [])
    );


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search Disney Characters..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}

            />
            <Button title="Search" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
});
