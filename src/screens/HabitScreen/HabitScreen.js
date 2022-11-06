import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SentimentAnalyzer from "../../components/SentimentAnalyzer";

export default function HabitScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Habit Screen</Text> */}
      <SentimentAnalyzer/>
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
