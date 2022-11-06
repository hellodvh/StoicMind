import {View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const splashImage = require('../../assets/images/splash.png');

export default function AuthScreen({onAuthenticate}) {
    return(
        <View>
            <Image source={splashImage} style={styles.image}/>
        
            <Text style={styles.description}>A.I. Powered Journal</Text>
            <TouchableOpacity 
                onPress={onAuthenticate}
                style={styles.btn}>
                <Text style={styles.text}>Authenticate</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#258671',
        padding: 10,
        borderRadius: 10,
    },
    image: {
        width: 200,
        padding: 10,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center",
        resizeMode: "contain"
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    description: {
        fontSize: 18,
        fontFamily: "JetBrainsMonoLight",
        justifyContent: "center",
        color: 'gray',
        textAlign: 'center',
        marginHorizontal: 5,
        bottom: 50,
    }
})