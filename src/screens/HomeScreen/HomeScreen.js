import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";

//Import Database
import { DatabaseConnection } from "../../database/DatabaseConnection";
//Database Connection
const db = DatabaseConnection.getConnection();

export default function HomeScreen() {
  //SQLite Database
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_journal'",
        [],
        function (tx, res) {
          //console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_journal(journal_id INTEGER PRIMARY KEY AUTOINCREMENT, journal_text VARCHAR(250))", //journal_sentiment VARCHAR(250)
              []
            );
            txn.executeSql("DROP TABLE IF EXISTS table_journal", []);
          }
        }
      );
    });
  }, []);

  //Fetch - Random Stoic Quotes
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://stoic-server.herokuapp.com/random";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require("../../assets/images/marcusaurelius.png")}
      />
      <Text style={styles.headerTitleText}>StoicMind</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#258671"></ActivityIndicator>
      ) : (
        data.map((random, index) => (
          <View style={styles.card} key={index}>
            <ScrollView style={{ margin: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  fontFamily: "AndadaProRegular",
                }}
              >
                "{random.body}"
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  marginTop: 2,
                  fontFamily: "JetBrainsMonoLight",
                  fontStyle: "italic",
                  color: "gray",
                }}
              >
                - {random.author}
              </Text>
            </ScrollView>
          </View>
        ))
      )}
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
    fontWeight: "bold",
  },
  card: {
    height: 200,
    width: "90%",
    padding: 5,
    marginHorizontal: 2,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 200,
    width: 200,
    justifyContent: "center",
  },
  headerTitleText: {
    fontSize: 32,
    color: "#0B4236",
    fontFamily: "JetBrainsMonoRegular",
    paddingBottom: 50,
  },
});
