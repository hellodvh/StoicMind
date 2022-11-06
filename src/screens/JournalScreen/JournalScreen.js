import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JournalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Journal Screen</Text>
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
});
