import React from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DatabaseConnection } from "../../database/DatabaseConnection";
import ViewAllJournal from "./ViewAllJournal";

const db = DatabaseConnection.getConnection();

const JournalScreen = () => {
  
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_journal'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.lenght);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_journal", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_journal(journal_id INTEGER PRIMARY KEY AUTOINCREMENT, journal_title VARCHAR(20), journal_text VARCHAR(255), journal_sentiment VARCHAR(20))",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <View style={styles.container}>
    <ViewAllJournal/>
    </View>
  
  )
};

export default JournalScreen;

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
});
