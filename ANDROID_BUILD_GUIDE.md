# How to Build the Android APK

Since you have Android Studio installed, follow these steps to generate the APK file for your phone.

## 1. Prepare the Project
Open your terminal (or Command Prompt) and navigate to the project folder. Run the following commands to install dependencies, build the web assets, and sync them to Android:

```bash
# Install dependencies (if not already done)
npm install

# Build the web application
# (This creates the 'dist' folder with all your assets from 'public')
npm run build

# Sync the web build to the Android project
npx cap sync android
```

## 2. Build the APK

### Option A: Using the Command Line (Fastest)
Run this command from the `android/` directory:

```bash
cd android
./gradlew assembleDebug
```
*(On Windows, use `gradlew assembleDebug` without the `./`)*

Once finished, the APK will be located at:
`android/app/build/outputs/apk/debug/app-debug.apk`

### Option B: Using Android Studio
1. Open the `android` folder in Android Studio.
2. Wait for the project to sync (it should now use Java 17 automatically).
3. Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
4. When finished, click **locate** in the popup to find the `app-debug.apk`.

## 3. Install on Your Phone
1. Connect your Android phone to your computer via USB.
2. Enable **USB Debugging** on your phone (in Developer Options).
3. Transfer the `app-debug.apk` file to your phone.
4. Open the file on your phone to install it.

### Troubleshooting
*   **Java Version Error:** If you still see errors about Java versions, ensure your `JAVA_HOME` environment variable points to JDK 17 or higher, although the project is now configured to request Java 17 compatibility.
*   **Missing Images:** We have restructured the project to put images in the `public/` folder. If images are still missing, try running `npm run build` and `npx cap sync android` again.
