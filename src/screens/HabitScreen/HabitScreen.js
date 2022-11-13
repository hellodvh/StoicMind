import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HabitScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Habit Tracker</Text>
      
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
