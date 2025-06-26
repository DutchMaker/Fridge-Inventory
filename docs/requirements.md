# Functional Requirements

## High-Level Description

The NFC Fridge Inventory App is a mobile application designed for iOS devices, enabling users to efficiently track and manage the contents of their household fridge. Each food container is equipped with an NFC sticker. By scanning the NFC tag with the app, users can add new food items to the inventory, view details of existing items, and remove items when taken out. The inventory data is synced in real time across all devices used by the household, ensuring that everyone has an up-to-date view of the fridge contents.

---

## 1. Core Features

### 1.1. Add New Food Item

- User scans the NFC sticker on a food container with the app.
- The app prompts the user to enter:
  - **Description** (e.g., "Chicken Soup")
  - **Portions** (e.g., "2")
- The app automatically records the date and time of addition.
- The app stores all this information, linked to the unique NFC tag ID, in the inventory database.

### 1.2. Lookup Food Item

- User scans the NFC sticker on a container.
- The app displays:
  - Description
  - Portions
  - Date and time added

### 1.3. Remove Food Item

- User scans the NFC sticker when removing an item from the fridge.
- The app shows the item details.
- User confirms removal; the item is deleted from the shared inventory database.

### 1.4. View All Items

- The app provides a simple list view of all current fridge items:
  - Description
  - Portions
  - Date and time added
- The list updates in real time across all devices.

---

## 2. Sync and Storage

- All inventory data is stored in a cloud database with real-time sync.
- All changes are reflected across all household devices instantly.
- No login or user profiles required; the inventory is shared.
- Data persists after app closure or device restart.

---

## 3. NFC Integration

- NFC scanning is required for all app actions (add, lookup, remove).
- Each NFC tag’s unique ID links to a single inventory entry.
- When scanning a new tag, the app prompts for item info. When scanning a known tag, it retrieves stored data.

---

## 4. UI/UX

- Interface is simple and functional; only essential features are shown.
- List of fridge items is text-only, no photos or graphics.
- Minimal steps per workflow; each action is streamlined.
- No dashboards, notifications, or analytics features.

---

## 5. Security & Privacy

- No user authentication required.
- Data security and privacy are handled by the chosen cloud provider.
- Intended for private household use only.

---

# Technical Requirements

## 1. Platform

- iOS-only, installed via sideloading (Xcode, TestFlight, or Expo tools).
- No App Store distribution needed.

## 2. Recommended Technology Stack

- **Frontend:** React Native with Expo (TypeScript preferred for code assist compatibility)
- **NFC Integration:** `expo-nfc` or a compatible library
- **Backend:** Firebase Firestore (real-time, free tier)
- **Cloud Sync:** All inventory data synced in real time using Firebase

## 3. Data Model

- Each inventory entry contains:
  - `nfc_id` (string): unique NFC tag identifier
  - `description` (string): item description
  - `portions` (number): quantity/portion count
  - `added_at` (timestamp): date and time of entry

## 4. Dependencies

- React Native / Expo SDK
- Expo NFC library
- Firebase (Firestore) SDK

## 5. Deployment

- App is built and deployed directly to household iPhones via manual install methods (no App Store submission)
- Standard provisioning profiles used for ad hoc or personal distribution

---

