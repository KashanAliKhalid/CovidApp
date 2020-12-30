import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";

export default class Loader extends React.Component {

    render() {
        return (
            <AnimatedSplash
                translucent={true}
                isLoaded={false}
                logoImage={require("../covid2.png")}
                backgroundColor={"#f8ca41"}
                logoHeight={150}
                logoWidth={150}
            >
            </AnimatedSplash>
        );
    }
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    }
});

