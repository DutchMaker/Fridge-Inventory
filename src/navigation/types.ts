import { FoodItem } from '../types';

export type RootStackParamList = {
  HomeScreen: undefined;
  AddItemScreen: { nfcId: string };
  ItemDetailScreen: { item: FoodItem };
}; 