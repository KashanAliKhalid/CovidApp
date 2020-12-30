
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
    Dimensions
} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Loader from './loader';

class Worldstats extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            confirmed:'',
            recovered:'',
            critical:'',
            Deaths:'',
            lastupdated:'',
            world:''
        }

    }


    async getcountrydata(){

        try {
            const response = await fetch("https://covid-19-data.p.rapidapi.com/totals", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "eaa57f09b5mshfa37000565d3890p1b4ebfjsn31d376656e37",
                    "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
                }
            })
            let data = await response.json();
            data=data[0]

            this.setState({
                confirmed: data.confirmed,
                recovered: data.recovered,
                critical: data.critical,
                Deaths: data.deaths,
                lastupdated: data.lastUpdate,

            })

        }
        catch(e) {
            console.log(`Error: ${e}`)
        }

    }


    async getpopulation(){
        const response= await fetch("https://world-population.p.rapidapi.com/worldpopulation", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "eaa57f09b5mshfa37000565d3890p1b4ebfjsn31d376656e37",
                "x-rapidapi-host": "world-population.p.rapidapi.com"
            }
        })

        let data= await response.json()
        this.setState({
            world:data.body.world_population
        })

    }



    async componentDidMount()
    {
        await this.getcountrydata();
        await this.getpopulation();
    }
    render(): React.ReactNode {
        let confirmed = parseInt(this.state.confirmed)
        let world = parseInt(this.state.world)
        let recovered = parseInt(this.state.recovered)
        let deaths = parseInt(this.state.Deaths)
        let critical = parseInt(this.state.critical)
        const data = [

            {
                name: "Confirmed",
                population:  (confirmed/world)*100,
                color: "#3caf85",
                legendFontColor: "white",
                legendFontSize: 15
            },
            {
                name: "Recovered",
                population: (recovered/confirmed)*100,
                color: "#f7464a",
                legendFontColor: "white",
                legendFontSize: 15
            },
            {
                name: "Critical",
                population: (critical/  confirmed)*100,
                color: "yellow",
                legendFontColor: "white",
                legendFontSize: 15
            },
            {
                name: "Deaths",
                population: (deaths/confirmed)*100,
                color: "#ff7f00",
                legendFontColor: "white",
                legendFontSize: 15
            },

        ];
        if (this.state.world != '') {
            return (
                <ImageBackground source={require("../bg.jpeg")} style={styles.image}>

                    <Text style={styles.text}>WORLD STATS</Text>
                    <Text style={styles.updated}>Updated on:{this.state.lastupdated}</Text>

                    <View style={styles.container}>
                        <BarChart
                            data={{
                                labels: ["Confirmed", "Recovered", "Critical", "Deaths"],
                                datasets: [
                                    {
                                        data: [
                                            this.state.confirmed,
                                            this.state.recovered,
                                            this.state.critical,
                                            this.state.Deaths,
                                        ]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={300}
                            yAxisInterval={1}
                            barPercentage={1}
                            showValuesOnTopOfBars={true}// optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#9f7a2f",
                                backgroundGradientFrom: "#037b9e",
                                backgroundGradientTo: "#74020e",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 0
                                },
                                propsForDots: {
                                    r: "10",
                                    strokeWidth: "5",
                                    stroke: "black"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 10,
                            }}
                        />
                    </View>


                    <PieChart
                        data={data}
                        width={390}
                        height={330}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 0,
                                marginBottom: 20,
                            },
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"50"}
                        center={[10, 10]}
                        absolute={false}
                        avoidFalseZero={true}

                    />
                </ImageBackground>
            );
        }
        else{
            return(<Loader/>)
        }
    }




}

const styles = StyleSheet.create({
    image: {
        width:'100%',
        height:'100%'
    },
    text:
        {
            textAlign:'center',
            fontWeight:'bold',
            fontSize:30,
            color:'white',
            letterSpacing:4,
            fontFamily:'sans-serif'
        },
    updated:
        {
            color:'white',
            fontSize: 15,
            textAlign: 'center'
        }
});

export default Worldstats
