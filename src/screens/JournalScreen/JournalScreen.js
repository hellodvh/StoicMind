import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { DatabaseConnection } from "../../database/DatabaseConnection";
const db = DatabaseConnection.getConnection();

const JournalScreen = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_journal", [], (tx, results) => {
        var data = [];
        for (let i = 0; i < results.rows.length; ++i)
          data.push(results.rows.item(i));
        setFlatListItems(data);
      });
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View key={item.journal_id} style={styles.journalCard}>
        <View style={styles.journalCardTop}>
          <Text style={styles.journalId}>{item.journal_id}</Text>
          <Image
            style={styles.journalSentiment}
            source={require("../../assets/images/neutral.png")}
          />
        </View>

        <Text style={styles.journalText}>{item.journal_text}</Text>
        <Text style={styles.journalText}>{item.journal_sentiment}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <View style={styles.container}>
          <FlatList
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>

    </SafeAreaView>
  );
};

export default JournalScreen;

//Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  journalCard: {
    minHeight: 150,
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  journalCardTop: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  journalId: {
    alignSelf: "flex-start",
    color: "#666666",
    fontFamily: "AndadaProSemiBold",
    fontSize: 12,
  },
  journalText: {
    alignSelf: "center",
  },
  journalSentiment: {
    alignSelf: "flex-end",
  },
});
