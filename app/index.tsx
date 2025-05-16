// app/index.tsx

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, Text } from 'react-native';


export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);


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
            <Text style={styles.title}>Disney Character Search</Text>
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                placeholder="Search Disney Characters..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid="transparent"
                selectionColor="#5a7cd1"
            />
            <Pressable style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>

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
        backgroundColor: '#fff',
        color: '#000',
    },
    button: {
        backgroundColor: '#5a7cd1',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#333',
    },
    inputFocused: {
        borderColor: '#5a7cd1',
        borderWidth: 2,

    },

});
