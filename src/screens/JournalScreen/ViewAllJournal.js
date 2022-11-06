import React, { useState, useEffect } from "react";
import { FlatList, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { DatabaseConnection } from "../../database/DatabaseConnection";

//Establish connection to the database
const db = DatabaseConnection.getConnection();

const ViewAllJournal = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_journal", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.row.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.journal_id}
        style={{
          backgroundColor: "#F2F2F2",
          marginTop: 20,
          padding: 20,
          borderRadius: 15,
        }}
      >

        <Text style={styles.textHeader}>ID</Text>
        <Text style={styles.textBottom}>{item.journal_id}</Text>

        <Text style={styles.textHeader}>Title</Text>
        <Text style={styles.textBottom}>{item.journal_title}</Text>

        <Text style={styles.textHeader}>Text</Text>
        <Text style={styles.textBottom}>{item.journal_text}</Text>

        <Text style={styles.textHeader}>Sentiment</Text>
        <Text style={styles.textBottom}>{item.journal_sentiment}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 5 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

//Styles
const styles = StyleSheet.create({
  textHeader: {
    color: "#121212",
    fontSize: 14,
    fontFamily: "JetBrainsMonoSemiBold"
  },
  textBottom: {
    color: "#121212",
    fontSize: 20,
    fontFamily: "JetBrainsMonoMedium"
  },
});

export default ViewAllJournal;
