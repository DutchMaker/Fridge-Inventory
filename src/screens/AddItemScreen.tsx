import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NavigationProp } from '@react-navigation/native';

type AddItemScreenRouteProp = RouteProp<RootStackParamList, 'AddItemScreen'>;

const AddItemScreen = () => {
  const [description, setDescription] = useState('');
  const [portions, setPortions] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute<AddItemScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { nfcId } = route.params;

  const handleAddItem = async () => {
    if (!description || !portions) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    const portionCount = parseInt(portions, 10);
    if (isNaN(portionCount) || portionCount <= 0) {
      Alert.alert('Error', 'Please enter a valid number of portions.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'inventory'), {
        nfc_id: nfcId,
        description,
        portions: portionCount,
        added_at: Timestamp.now(),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to add item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Item</Text>
      <Text style={styles.nfcIdText}>NFC Tag ID: {nfcId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Description (e.g., Chicken Soup)"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Portions (e.g., 2)"
        value={portions}
        onChangeText={setPortions}
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleAddItem}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add Item'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  nfcIdText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    color: '#6c757d',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a3d9a5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddItemScreen; 