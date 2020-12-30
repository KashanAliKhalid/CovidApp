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

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

class Countries extends React.Component
{
    constructor() {
        super();
        this.state = {
            data:'',
            countries:'',
            input:'',
            filtered:''
        }
    }

    filterArray(input)
    {
        let countries=this.state.countries
        let filter=[]
        if(input===' ')
        {
            this.setState({
                filtered:countries
            })
        }
        else
        {
            countries.forEach(item=>{
                item=item.toString();
                if(item.includes(input))
                {
                    filter.push(item)
                }
            })
        }
        this.setState({filtered:filter})

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
        await this.getcountries();
        await this.countrycode();

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
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.filterArray(text)}
                    />

                    {
                        this.state.filtered.map((item)=>(

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
      backgroundColor:'black'
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
class MyTabs extends React.Component {
    render(): React$Node {
        return (
                <Tab.Navigator
                    initialRouteName="Countries">

                    <Tab.Screen
                        options={{ headerShown:false }}
                        name="Countrystats" component={Countrystats}/>
                    <Tab.Screen
                        options={{ headerShown:false }}
                        name="Countries" component={Countries}/>

                </Tab.Navigator>
        );
    }
}

export default MyTabs
