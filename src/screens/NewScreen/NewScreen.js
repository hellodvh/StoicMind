import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function NewScreen() {
  return (
    //Container View
    <View style={styles.container}>

      <Text style={styles.headerText}>
        New Journal Entry
      </Text>

      
      <TextInput style={styles.titleTextInput} placeholder="Title"/>

      
      <TextInput style={styles.mainTextInput} multiline={true} placeholder="Text"/>

      <Button title="Run Sentiment" />
  


    </View>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3D1",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "space-evenly",
    padding: 10,
    marginBottom: 10,
  },
  titleTextInput: {
    height: 60,
    width: "90%",
    padding: 10,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E2E2",
  },

  mainTextInput: {
    height: 150,
    width: "90%",
    padding: 10,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E2E2E2",
  },
});
