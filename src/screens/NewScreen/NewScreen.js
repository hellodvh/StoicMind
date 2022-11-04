import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NewScreen</Text>
    </View>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF3D1",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
