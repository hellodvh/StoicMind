import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//SQLite Database
import { DatabaseConnection } from "../../database/DatabaseConnection";
//Establish connection to the database
const db = DatabaseConnection.getConnection();

//SQLite Query
let delete_journal = () => {
  //SQLite Delete table_journal onPress function.
  db.transaction(function (tx) {
    tx.executeSql('DELETE FROM table_journal');
  });
};

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <TouchableOpacity
        onPress={delete_journal}
        style={styles.btn}>
          <Ionicons name="trash-outline" color={"white"} size={16} style={styles.btnIcon}></Ionicons>
        <Text style={styles.btnText}>Delete Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => null}
        style={styles.btn}>
          <Ionicons name="log-out-outline" color={"white"} size={16} style={styles.btnIcon}></Ionicons>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#258671",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "rgba(0,0,0, 1)", // IOS
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
  title: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 15,
    paddingBottom: 20,
  },
});
