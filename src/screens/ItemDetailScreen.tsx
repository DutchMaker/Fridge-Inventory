import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NavigationProp } from '@react-navigation/native';

type ItemDetailScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetailScreen'>;

const ItemDetailScreen = () => {
  const [loading, setLoading] = useState(false);
  const route = useRoute<ItemDetailScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { item } = route.params;

  const handleRemoveItem = async () => {
    setLoading(true);
    try {
      if (item.id) {
        await deleteDoc(doc(db, 'inventory', item.id));
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Item ID is missing.');
      }
    } catch (error) {
      console.error('Error removing document: ', error);
      Alert.alert('Error', 'Failed to remove item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.header}>Item Details</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Description:</Text> {item.description}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Portions:</Text> {item.portions}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Added:</Text> {new Date(item.added_at.seconds * 1000).toLocaleString()}</Text>
        <Text style={styles.nfcIdText}>NFC Tag ID: {item.nfc_id}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRemoveItem}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Removing...' : 'Remove Item'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'space-between',
  },
  detailsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  nfcIdText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#6c757d',
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#f0a1a8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemDetailScreen; 