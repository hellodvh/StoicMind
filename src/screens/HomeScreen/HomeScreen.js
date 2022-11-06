import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, ActivityIndicator, Image } from "react-native";

export default function HomeScreen() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://stoic-server.herokuapp.com/random"

  const dotgrid = require("../../assets/images/dotgrid.png");

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then((json) => setData(json))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
  },[])

  return (
    
    <View style={styles.container}>
      <Image style={styles.headerImage} source={require('../../assets/images/marcusaurelius.png')} />
      <Text style={styles.headerTitleText}>StoicMind</Text>
      {
        loading ? <ActivityIndicator size="large" color="#258671"></ActivityIndicator>:
        data.map((random, index)=> (
          <View style={styles.card} key={index}>
            <ScrollView style={{margin: 10}}>
        
              <Text style={{fontSize: 16, fontWeight: "400", fontFamily: "AndadaProRegular"}}>"{random.body}"</Text>
              <Text style={{fontSize: 14, fontWeight: "500", marginTop: 2, fontFamily: "JetBrainsMonoLight", fontStyle: "italic",color: 'gray'}}>~{random.author}</Text>
            
            </ScrollView>
          </View>
        ))
      }
      
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
    borderWidth: 2,
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
    fontSize: 36,
    fontFamily: "JetBrainsMonoRegular",
    paddingBottom: 100,
  }
});
