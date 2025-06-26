This is the NFC Fridge Inventory App, created with Expo based on your requirements.

### Getting Started

1.  **Install Dependencies:**
    Open a terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Configure Firebase:**
    Open `src/services/firebase.ts` and replace the placeholder values with your actual Firebase project configuration.

3.  **Run the App:**
    Start the development server with:
    ```bash
    npx expo start
    ```
    This will open Expo Dev Tools in your browser. You can then run the app on an iOS simulator or a physical iOS device using the Expo Go app.

    **Note:** NFC functionality will only work on a physical iOS device, not on the simulator.

### Project Structure

```
fridge-inventory/
├── src/
│   ├── components/      # Reusable components (currently empty)
│   ├── hooks/           # Custom hooks (currently empty)
│   ├── navigation/      # Navigation setup (Stack Navigator)
│   ├── screens/         # App screens (HomeScreen, AddItemScreen, etc.)
│   ├── services/        # Firebase service
│   └── types/           # TypeScript type definitions
├── App.tsx              # Main application component
└── package.json         # Project dependencies
``` 