

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image
} from 'react-native';

class SplashScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../covid.png')}
                />
                <Text style={styles.text}>www.covidapp073.com</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
 container:
     {
         backgroundColor:'#f8ca41',
         height:'100%',
         width:'100%',
         display:'flex',
         alignItems:'center'
     },
    logo:
        {
            width:'70%',
            height:'40%',
            alignSelf:'center',
            marginTop:80
        },
    text:
        {
            fontSize:17,
            marginTop: 280,
            color: '#9f7a2f',
            fontWeight:'bold',
            fontFamily:'sans-serif',
            letterSpacing:2
        }
});

export default SplashScreen;
