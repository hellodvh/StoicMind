import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
const splashImage = require("../../assets/images/splash.png");
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AuthScreen({ onAuthenticate }) {
  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />

      <Text style={styles.description}>Authenticate to log in</Text>

      <TouchableOpacity onPress={onAuthenticate} style={styles.btn}>
        <Ionicons
          name="finger-print-outline"
          color={"white"}
          size={16}
          style={styles.btnIcon}
        ></Ionicons>
        <Text style={styles.btnText}>Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  btn: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#258671",
    padding: 15,
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,1)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  btnIcon: { 
    paddingRight: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "JetBrainsMonoMedium",
  },
  image: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    resizeMode: "contain",
  },

  description: {
    fontSize: 18,
    fontFamily: "JetBrainsMonoLight",
    justifyContent: "center",
    color: "gray",
    textAlign: "center",
    margin: 20,
    paddingBottom: 20,
  },
});
