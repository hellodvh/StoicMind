import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 


export default function ButtonNew({ focused, size, color }) {
  return (
    <View style={[styles.container, { backgroundColor: focused ? '#258671' : '#B3E4C5'}]}>
      <Ionicons name={focused ? "create-outline" : "add"} size={30} color={focused ? '#B3E4C5' : '#258671'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#258671",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
