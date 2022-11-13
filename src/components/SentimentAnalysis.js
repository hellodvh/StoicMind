/*
/ Sentiment pkg - SentimentAnalysis not in use!!!
*/

import React from "react";
import { View, Text } from "react-native";

export default function SentimentAnalysis(props) {
  return (
    <View>
      <Text>Sentiment Results</Text>
      <Text>Score: {props.analysis.score}</Text>
      <Text>
        Sentiment:
        {props.analysis.score === 0
          ? "Neutral 😐"
          : props.analysis.score > 0
          ? "Positive 👍"
          : "Negative 👎"}
      </Text>
    </View>
  );
}
