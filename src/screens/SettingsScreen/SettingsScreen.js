import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SettingsScreen({ setIsAuthenticated }) {

  return (

    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>

      <TouchableOpacity
        onPress={() => setIsAuthenticated(false)}
        style={styles.btn}>
        <Text style={styles.btnText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  text: {
    fontSize: 22,
    fontFamily: "AndadaProSemiBold"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  btn: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#258671",
    padding: 10,
    marginTop: 50,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 15,
    paddingBottom: 20,
  },
});
