import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/screens/routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AuthScreen from "./src/navigators/AuthStack/AuthScreen";
import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Enter Password",
    });
    auth.then((result) => {
      setIsAuthenticated(result.success);
      console.log(result);
    });
  }

  const [fontsLoaded] = useFonts({
    AndadaProBold: require("./src/assets/fonts/AndadaPro-Bold.ttf"),
    AndadaProMedium: require("./src/assets/fonts/AndadaPro-Medium.ttf"),
    AndadaProRegular: require("./src/assets/fonts/AndadaPro-Regular.ttf"),
    AndadaProSemiBold: require("./src/assets/fonts/AndadaPro-SemiBold.ttf"),
    JetBrainsMonoBold: require("./src/assets/fonts/JetBrainsMono-Bold.ttf"),
    JetBrainsMonoLight: require("./src/assets/fonts/JetBrainsMono-Light.ttf"),
    JetBrainsMonoMedium: require("./src/assets/fonts/JetBrainsMono-Medium.ttf"),
    JetBrainsMonoRegular: require("./src/assets/fonts/JetBrainsMono-Regular.ttf"),
    JetBrainsMonoSemiBold: require("./src/assets/fonts/JetBrainsMono-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {isAuthenticated ? (
          <Routes setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <AuthScreen onAuthenticate={onAuthenticate} />
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
