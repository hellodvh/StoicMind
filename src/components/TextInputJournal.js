import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const TextInputJournal = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onSubmitEditing}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        blurOnSubmit={false}
        placeholder={props.placeholder}
        placeholderTextColor="#121212"
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        style={props.style}
        value={props.value}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};
export default TextInputJournal;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#E2E2E2",
    backgroundColor:"#FFFFFF",
    borderWidth: 1,
    borderRadius: 20,
  },
});
