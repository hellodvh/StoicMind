/*
/ Sentiment pkg - SentimentAnalyzer not in use!!!
*/

import React from "react";
import { useState, useRef } from "react";
import Sentiment from "sentiment";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SentimentAnalyzer() {
  const sentiment = useRef();
  const [result, setResult] = useState(null);

  const checkSentiment = new Sentiment();

  function getSentimentAnalyze() {
    if (sentiment.current.value !== "") {
      console.log(sentiment);
      setResult(checkSentiment.analyze([sentiment.current.value]));
    }
  }
  // function clearSentiment() {
  //   sentiment.current.value = "";
  //   setResult(null);
  // }
  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: "400"}}>Text Sentiment Analysis</Text>
      <TextInput style={styles.textInput} ref={sentiment}></TextInput>
      <View>
        
        <TouchableOpacity style={styles.btn} onPress={getSentimentAnalyze}><Text style={styles.btnText}>Analyze</Text></TouchableOpacity>
        
        {/* <TouchableOpacity style={styles.btn} onPress={clearSentiment}><Text style={styles.btnText}>Clear</Text></TouchableOpacity> */}
      </View>
      
      <Text>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  btn:{
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#258671",
    padding: 10,
    marginTop: 50,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },

  textInput:{
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#E2E2E2",
    backgroundColor:"#FFFFFF",
    borderWidth: 1,
    borderRadius: 20,
  }

})
