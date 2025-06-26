import { Timestamp } from 'firebase/firestore';

export interface FoodItem {
  id?: string;
  nfc_id: string;
  description: string;
  portions: number;
  added_at: Timestamp;
} 