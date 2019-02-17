
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Facebook from "./FacebookLogin/index"
import Google from "./Google/index"
import { connect } from "react-redux"
import {Spinner } from 'native-base';


class SignComponent extends Component {
    render() {
        console.log(this.props.isLoader.isLoader)
        const isLoader = this.props.isLoader.isLoader
        return (



            <View style={styles.container}>
                {(isLoader) ?
                    <View style={{ backgroundColor: "#512da7", flex:1, justifyContent: "center", alignItems: "center", }} >
                        <Spinner color='#fff' />
                        <Text style={{ fontSize: 20, color: "#fff", }} >Signing...</Text>
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: "center", }} >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                            <Image source={require("../../assats/logo_26_puma.png")}
                                style={{ height: 250, width: 250, }}
                                resizeMode="stretch"
                            />
                        </View>
                        <View style={{ flex: 1 }} >
                            <View style={{ justifyContent: "space-around", }} >
                                <Facebook navigation={this.props.navigation} />
                            </View>
                            <View style={{ justifyContent: "space-around", marginTop: 20 }} >
                                <Google navigation={this.props.navigation} />
                            </View>
                        </View>
                    </View>
                }

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



const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        isLoader: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        //   currentUserAction: (data) => {
        //     dispatch(currentUserAction(data))
        //   },
        //   isLoaderAction: (data) => {
        //     dispatch(isLoaderAction(data))
        //   },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(SignComponent)

