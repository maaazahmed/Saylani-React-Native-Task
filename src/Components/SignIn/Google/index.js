
import React, { Component } from 'react';
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { currentUserAction, isLoaderAction } from "../../../store/action/action"
import { connect } from "react-redux"

class Google extends Component {
    async  googleLogin() {
        this.props.isLoaderAction(true)
        try {
            console.log("running...")
            // add any configuration settings here:
            await GoogleSignin.configure();
            const data = await GoogleSignin.signIn();
            // this.props.navigation.navigate("Dashboard")

            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // console.log(credential)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            // console.log(firebaseUserCredential.user._user,"GOOGLE")
            const user = firebaseUserCredential.user._user;

            delete user.providerData
            fetch(`http://192.168.100.241:8000/setUser`, {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    // console.log(res, "current")
                    this.props.currentUserAction(JSON.parse(res._bodyInit))
                    this.props.isLoaderAction(false)
                    this.props.navigation.navigate("Dashboard")
                }
            }).catch((error) => {
                console.log("Error:", error)
                this.props.isLoaderAction(false)
            })
        } catch (e) {
            this.props.isLoaderAction(false)
            console.error(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.googleLogin.bind(this)}
                    style={styles.fbBtn} >
                    <View style={styles.FBIconContainer} >
                        <Icons name="google" style={styles.FBIcon} />
                    </View>
                    <View style={styles.FBTextContainer} >
                        <Text style={styles.FBText} >LOG IN WITH GOOGLE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
        height: 60
    },
    headingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headingText: {
        fontSize: 20,
        fontWeight: "500",
    },
    buttonContaier: {
        flex: 1,
        alignItems: "center"
    },
    fbBtn: {
        backgroundColor: "#000",
        height: "100%",
        width: "70%",
        elevation: 10,
        flexDirection: "row",
    },
    FBIconContainer: {
        height: "100%",
        width: "20%",
        backgroundColor: "#bd0d00",
        justifyContent: "center",
        alignItems: "center"
    },
    FBIcon: {
        color: "#fff",
        fontSize: 30
    },
    FBTextContainer: {
        flex: 1,
        backgroundColor: "#ff2620",
        justifyContent: "center"
    },
    FBText: {
        textAlign: "center",
        color: "#fff", fontSize: 18,
    }
});



const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        currentUserAction: (data) => {
            dispatch(currentUserAction(data))
        },
        isLoaderAction: (data) => {
            dispatch(isLoaderAction(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Google)

