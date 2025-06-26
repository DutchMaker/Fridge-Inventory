import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { FoodItem } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start();

const HomeScreen = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const q = query(collection(db, 'inventory'), orderBy('added_at', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const foodItems: FoodItem[] = [];
      querySnapshot.forEach((doc) => {
        foodItems.push({ id: doc.id, ...doc.data() } as FoodItem);
      });
      setItems(foodItems);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteItem = (item: FoodItem) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.description}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            if (item.id) {
              await deleteDoc(doc(db, 'inventory', item.id));
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const scanNfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('tag', tag);
      if (tag && tag.id) {
        const nfcId = tag.id;
        const existingItem = items.find(item => item.nfc_id === nfcId);
        if (existingItem) {
          navigation.navigate('ItemDetailScreen', { item: existingItem });
        } else {
          navigation.navigate('AddItemScreen', { nfcId });
        }
      }
    } catch (ex) {
      console.warn('Oops!', ex);
      Alert.alert('Error', 'Failed to scan NFC tag.');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fridge Inventory</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text>Portions: {item.portions}</Text>
              <Text>Added: {new Date(item.added_at.seconds * 1000).toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteItem(item)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Your fridge is empty. Scan an item to add it.</Text>}
      />
      <TouchableOpacity style={styles.scanButton} onPress={scanNfc}>
        <Text style={styles.scanButtonText}>Scan NFC Tag</Text>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
  },
  itemDescription: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6c757d',
  },
  scanButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 20,
  },
});

export default HomeScreen; 