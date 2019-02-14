
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Facebook from "./FacebookLogin/index"
import Google from "./Google/index"


export default class SignComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                    <Image source={require("../../assats/logo_26_puma.png")}
                        style={{ height: 250, width: 250, }}
                        resizeMode="stretch"
                    />
                </View>

                <View style={{ flex: 1 }} >
                    <View style={{ justifyContent: "space-around" }} >
                        <Facebook navigation={this.props.navigation} />
                    </View>
                    <View style={{ justifyContent: "space-around", marginTop: 20 }} >
                        <Google navigation={this.props.navigation} />
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#512da7',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
