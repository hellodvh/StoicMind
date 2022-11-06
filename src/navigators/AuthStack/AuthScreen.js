import {View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const marcusImage = require('../../assets/images/marcusaurelius.png');

export default function AuthScreen({onAuthenticate}) {
    return(
        <View>
            <Image source={marcusImage} style={styles.image}/>
            <Text style={styles.title}>StoicMind</Text>
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
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    title: {
        fontSize: 38,
        fontFamily: "AndadaProMedium",
        marginVertical: 30,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        fontFamily: "JetBrainsMonoLight",
        color: 'gray',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 50,
    }
})