import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import TextInputJournal from "../../components/TextInputJournal";

import { DatabaseConnection } from "../../database/DatabaseConnection";

//Establish connection to the database
const db = DatabaseConnection.getConnection();

const CreateJournal = ({ navigation }) => {
  let [journalTitle, setJournalTitle] = useState("");
  let [journalText, setJournalText] = useState("");
  let [journalSentiment, setJournalSentiment] = useState("");

  let create_journal = () => {
    console.log(journalTitle, journalText, journalSentiment);

    if (!journalTitle) {
      alert("Please fill in the journal title!");
      return;
    }
    if (!journalText) {
      alert("Please fill in the journal text!");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_journal (journal_title, journal_text, journal_sentiment) VALUES (?,?,?)",
        [journalTitle, journalText, journalSentiment],
        (tx, results) => {
          console.log("Results", results.rowAffected);
          if (results.rowAffected > 0) {
            Alert.alert(
              "Success",
              "Succesfully created journal entry!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("JournalScreen"),
                },
              ],
              {
                cancelable: false,
              }
            );
          } else alert("Error trying to create journal entry!");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: "space-between", paddingTop: 100 }}
          >
            <TextInputJournal
              placeholder="Enter Title"
              onChangeText={(journalTitle) => setJournalTitle(journalTitle)}
              style={{ padding: 5}}
            />

            <TextInputJournal
              placeholder="Enter Journal Text"
              onChangeText={(journalText) => setJournalText(journalText)}
              maxLength={250}
              numberOfLines={5}
              multiline={true}
              style={{ padding: 5, textAlignVertical: "top" }}
            />

            <TextInput
              placeholder="Sentiment"
              onChangeText={(journalSentiment) =>
                setJournalSentiment(journalSentiment)
              }
              style={{ padding: 5 }}
            />

            <TouchableOpacity onPress={create_journal}></TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateJournal;
