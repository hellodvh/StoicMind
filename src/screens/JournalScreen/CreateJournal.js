import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

//SQLite Database
import { DatabaseConnection } from "../../database/DatabaseConnection";
//Establish connection to the database
const db = DatabaseConnection.getConnection();

//Tensorflow
import * as tf from '@tensorflow/tfjs';
//Convolution Neural Network(CNN) trained dataset.

const CreateJournal = () => {
  const [journalText, setJournalText] = useState('');
  const [journalSentiment, setJournalSentiment] = useState('');
  //const [testText, setText] = useState('');

  //Load model and metadata.
  //Tensorflow Sentiment Model and Metadata url.
  const url = {
    model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
  };

  //Tensorflow - Load model.
  async function loadModel(url) {
    try {
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
    } catch (err) {
      console.log(err);
    }
  }

  //Tensorflow - Load metadata.
  async function loadMetadata(url) {
    try {
      const metadataJson = await fetch(url.metadata);
      const metadata = await metadataJson.json();
      setMetadata(metadata);
    } catch (err) {
      console.log(err);
    }
  }

  //Tensorflow - React Hook
  const [metadata, setMetadata] = useState();
  const [model, setModel] = useState();
  const [testScore, setScore] = useState();
  const [trimedText, setTrim] = useState();
  const [seqText, setSeq] = useState();
  const [padText, setPad] = useState();
  const [inputText, setInput] = useState();

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url)
      loadMetadata(url)
    });
  }, [])

  //Tensorflow - Get Sentiment score function.
  const getSentimentScore =(text) => {
    console.log(text)
    //Convert sentences to tensor input.
    //Tokenize each word in the sentences.
    const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    setTrim(inputText)
    console.log(inputText)

    //Convert the alphabetical token to numerical token using metadata
    const OOV_INDEX = 2;
    const sequence = inputText.map(word => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });

    //Fix the sequence into fix length (truncating and padding) via padSequences function.
    const PAD_INDEX = 0
    const padSequences = (sequences, maxLen, padding = 'pre', truncating = 'pre', value = PAD_INDEX) => {
      return sequences.map(seq => {
        if (seq.length > maxLen) {
          if (truncating === 'pre') {
            seq.splice(0, seq.length - maxLen);
          } else {
            seq.splice(maxLen, seq.length - maxLen);
          }
        }
        if (seq.length < maxLen) {
          const pad = [];
          for (let i = 0; i < maxLen - seq.length; ++i) {
            pad.push(value);
          }
          if (padding === 'pre') {
            seq = pad.concat(seq);
          } else {
            seq = seq.concat(pad);
          }
        }
        return seq;
      });
    }
    const paddedSequence = padSequences([sequence], metadata.max_len);
    //Convert the paddedSequence into our tensor2D matrix.
    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    //Load the tensor2D into our model - model.predict
    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    setScore(score)
    return score;
  }

  //SQLite Query
  let create_journal = () => {
    console.log(journalText);
     if (!journalText) {
      alert("Please fill in the journal text!");
      return;
    }
    //SQLite Insert
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_journal (journal_text, journal_sentiment) VALUES (?,?)', //journal_sentiment ?
        [journalText, journalSentiment], //journalSentiment
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Succesfully created journal entry!',
              [
                {
                  text: "Ok",
                  onPress: () => console.log("OK Pressed"),
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
    <SafeAreaView style={{flex: 1}}>
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingTop: 50,
        }}
      >
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Write journal..."
            onChangeText={(journalText, journalSentiment) => {setJournalText(journalText); setJournalSentiment(journalSentiment)}} //(journalSentiment) = setJournalSentiment(journalSentiment) / testText, setText
            maxLength={250}
            numberOfLines={6}
            multiline={true}
            style={styles.inputText}
          />
          <Ionicons
            style={{
              alignSelf: "flex-end",
              justifyContent: "center",
              padding: 10,
            }}
            name="help-circle-outline"
            size={30}
            color="#B3E4C5"
          ></Ionicons>
        </View>

        {/* //Speech-to-Text 

        <TouchableOpacity style={styles.btnMic} onPress={null}>
        <Ionicons
            style={{
              alignSelf: "center",
              justifyContent: "center",
              padding: 10,
            }}
            name="mic"
            size={30}
            color="#FFFFFF"
          ></Ionicons>
        </TouchableOpacity> */}
        {journalSentiment !== "" ?
        <TouchableOpacity style={styles.btnCalculate} onPress={() => { getSentimentScore(journalSentiment); create_journal();}}>
        <Ionicons name="calculator-outline" color={"black"} size={16} style={styles.btnIcon}></Ionicons>
          <Text style={styles.btnTextCalc}>Calculate</Text>
        </TouchableOpacity>
        : <></>}

        <TouchableOpacity style={styles.btnAnalyze} onPress={getSentimentScore}>
        <Ionicons name="analytics-outline" color={"white"} size={16} style={styles.btnIcon}></Ionicons>
          <Text style={styles.btnText}>Analyze</Text>
        </TouchableOpacity>

        <TouchableOpacity title="Save" style={styles.btn} onPress={create_journal}>
        <Ionicons name="save-outline" color={"white"} size={16} style={styles.btnIcon}></Ionicons>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
};

export default CreateJournal;

const styles = StyleSheet.create({
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

  btnAnalyze: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#B3E4C5",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "rgba(0,0,0, 1)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },

  btnCalculate: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#FFF3D1",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "rgba(0,0,0, 1)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },

  btnMic: {
    width: 60,
    height: 60,
    backgroundColor: "#258671",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "rgba(0,0,0, 1)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1, 
    elevation: 2, 
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "JetBrainsMonoMedium",
  },

  btnTextCalc: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "JetBrainsMonoMedium",
  },

  inputBox: {
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 20,
  },

  inputText: {
    fontFamily: "AndadaProRegular",
    fontSize: 16,
    padding: 5,
    height: 200,
    backgroundColor: "transparent",
    textAlignVertical: "top",
  },
});
