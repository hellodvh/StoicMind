import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";

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
      {
        loading ? <Text>Loading...</Text>:
        data.map((random)=> (
          <View style={styles.card}>
            <ScrollView style={{margin: 10}}>
            
              <Text style={{fontSize: 16, fontWeight: "400"}}>"{random.body}"</Text>
              <Text style={{fontSize: 14, fontWeight: "500", marginTop: 2, fontStyle: "italic",color: 'gray'}}>~{random.author}</Text>
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
    backgroundColor: "#FFF3D1",
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    
  }
});
