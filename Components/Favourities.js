import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Alert,
    ImageBackground,
    Dimensions,
    TouchableOpacity, TextInput,
} from 'react-native';
import Loader from './loader';
import Countrystats from './Countrystats';
import { NavigationEvents } from "react-navigation";

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Favourities extends React.Component
{
    constructor() {
        super();
        this.state = {
            data:'',
            countries:'',
            input:'',
            arr:''

        }
    }

    async  getData () {
        try {
            // this.clearAsyncStorage()

            let jsonValue = await AsyncStorage.getItem('favourities')
            if(jsonValue!==null)
            {
                this.setState({
                    arr:jsonValue.split(","),
                })
            }
        } catch(e) {
            // error reading value
        }
    }


    colorgenerator()
    {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;


    }


    async componentDidMount()
    {
        this._unsubscribe=this.props.navigation.addListener('focus',()=>{
          this.getData();
        })
        await this.getData();
        await this.getcountries();
        await this.countrycode();

    }
    async componentWillUnmount(): void {
        await this.getData();
        this._unsubscribe();
        console.log(this.state.dbdata)

    }

    async countrycode()
    {
        const response= await fetch(`https://restcountries.eu/rest/v2`)
        let data= await response.json()
        this.setState({data:data})

    }

    async getcountries()
    {
        let response=await fetch("https://world-population.p.rapidapi.com/allcountriesname", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "eaa57f09b5mshfa37000565d3890p1b4ebfjsn31d376656e37",
                "x-rapidapi-host": "world-population.p.rapidapi.com"
            }
        })

        let data=await response.json();
        this.setState({
            countries:data.body.countries,
            filtered:data.body.countries
        })

    }

    checkcode(name)
    {
        if(name=="United States")
        {
            name='United States Minor Outlying Islands'
        }

        if(name=="Russia")
        {
            name='Russian Federation'
        }
        let code=''
        this.state.data.forEach(item=>{
            if(item.name === name)
            {
                code= item.alpha2Code.toString()

            }
        })
        return code;
    }



    render(): React.ReactNode {
        const { navigation } = this.props;
        if(this.state.data!=='') {
            return (
                <View style={styles.container}>

                    {
                        this.state.arr.map((item)=>(

                            <TouchableOpacity onPress={ ()=>{navigation.navigate('Countrystats',{
                                name:item

                            })}} key={item} style={{...styles.listitem, backgroundColor: this.colorgenerator()}}>
                                <Text style={styles.listtext}>{item}</Text>
                                <Image
                                    style={styles.flag}
                                    source={{uri: `https://www.countryflags.io/${this.checkcode(item)}/flat/64.png`}}
                                />
                            </TouchableOpacity>

                        ))
                    }


                </View>
            );
        }
        else
        {
            return <Loader/>
        }
    }
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'black',
        height:'100%',
    },
    listitem:
        {
            height:70,
            width:'98%',
            borderRadius:15,
            marginTop:7,
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
    listtext:
        {
            fontSize:24,
            color:'white',
            letterSpacing:3,
            textTransform:'uppercase',
            marginLeft:10,
            fontWeight:'bold'

        },
    flag:
        {
            width:80,
            height:80,
            position:'absolute',
            marginLeft:280
        },
    input:
        {
            width:'98%',
            height:60,
            borderWidth:2,
            borderColor:'white',
            borderRadius: 15,
            marginTop: 10,
            color:'white',
            fontSize: 20,
            textAlign:'center'
        }


});


const Tab = createStackNavigator();
class MyTabs2 extends React.Component {
    render(): React$Node {
        return (
            <Tab.Navigator
                initialRouteName="Favourities">

                <Tab.Screen
                    options={{ headerShown:false }}
                    name="Countrystats" component={Countrystats}/>
                <Tab.Screen
                    options={{ headerShown:false }}
                    name="Favourities" component={Favourities}/>

            </Tab.Navigator>
        );
    }
}

export default MyTabs2
