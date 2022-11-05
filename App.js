import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/screens/routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

export default function App() {
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

  if(!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}
