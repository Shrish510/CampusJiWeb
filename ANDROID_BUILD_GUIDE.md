# How to Build the Android APK

Since you have Android Studio installed, follow these steps to generate the APK file for your phone.

## 1. Prepare the Project
Open your terminal (or Command Prompt) and navigate to the project folder. Run the following commands to install dependencies and build the web assets:

```bash
# Install dependencies
npm install

# Build the web application (creates the dist/ folder)
npm run build

# Sync the web build to the Android project
npx cap sync android
```

## 2. Open in Android Studio
You can open the Android project directly from the terminal or manually.

**Option A: Terminal**
```bash
npx cap open android
```

**Option B: Manual**
1. Open Android Studio.
2. Select **Open**.
3. Navigate to the `android/` folder inside your project directory and select it.

## 3. Build the APK
Once Android Studio has loaded the project and finished its initial sync (this might take a few minutes):

1. Go to the top menu and select **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
2. Android Studio will start compiling the app.
3. When finished, a popup will appear in the bottom-right corner saying "APK(s) generated successfully".
4. Click on **locate** in that popup to open the folder containing the `app-debug.apk`.

## 4. Install on Your Phone
1. Connect your Android phone to your computer via USB.
2. Enable **USB Debugging** on your phone (in Developer Options).
3. Transfer the `app-debug.apk` file to your phone.
4. Open the file on your phone to install it (you may need to allow installation from unknown sources).

### Alternative: Run Directly from Android Studio
If your phone is connected and Developer Options are enabled:
1. Select your phone from the device dropdown menu in the top toolbar of Android Studio.
2. Click the green **Run** (Play) button.
3. The app will build and automatically install/launch on your phone.
