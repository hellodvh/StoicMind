import React, { Component } from "react";
//import { useState } from "react";
import Sentiment from "sentiment";
import { View, Text, TextInput } from "react-native";

const sentiment = new Sentiment();

class SentimentAnalyzer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentimentScore: null,
      generalSentiment: null,
    };
    this.findSentiment = this.findSentiment.bind(this);
  }

  findSentiment(event) {
    const result = sentiment.analyze(event.target.value);
    this.setState({
      sentimentScore: result.score,
    });
    if (result.score < 0) {
      this.setState({
        generalSentiment: "Negative",
      });
    } else if (result.score > 0) {
      this.setState({
        generalSentiment: "Positive",
      });
    } else {
      this.setState({
        generalSentiment: "Neutral",
      });
    }
  }

  render() {
    return (
      <View>
        <Text>Text Sentiment Analysis</Text>
        <Text>Enter text for real-time analysis:</Text>
        <TextInput onChange={this.findSentiment}></TextInput>
        <Text>Sentiment Score: {this.state.sentimentScore}</Text>
        <Text>General Sentiment: {this.state.generalSentiment}</Text>
      </View>
    );
  }
}

export default SentimentAnalyzer;
