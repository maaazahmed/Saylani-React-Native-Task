
import React, { Component } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux"
import { currentUserAction, isLoaderAction } from "../../../store/action/action"


class Facebook extends Component {

  async facebookLogin() {
    this.props.isLoaderAction(true)
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        this.props.isLoaderAction(false)
        // handle this however suites the flow of your app
        // console.log(result.isCancelled)
        //  this.props.isLoaderAction(false)
        // throw new Error('User cancelled request');
      }

      // console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        this.props.isLoaderAction(false)
        // handle this however suites the flow of your app
        // throw new Error('Something went wrong obtaining the users access token');
        alert("Something went wrong obtaining the users access token")
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      // console.log(JSON.stringify(firebaseUserCredential.user.toJSON()))
      // console.log(firebaseUserCredential.user._user)
      const user = firebaseUserCredential.user._user;

      /********************************************** */
      /********************************************** */
      /********************************************** */
      delete user.providerData
      // console.log(user)
      fetch(`http://192.168.0.103:8000/setUser`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status == 200) {
          console.log(res, "current")
          this.props.currentUserAction(JSON.parse(res._bodyInit))
          this.props.isLoaderAction(false)
          this.props.navigation.navigate("Dashboard")
        }
      }).catch((error) => {
        console.log("Error:", error)
        this.props.isLoaderAction(false)

      })
      /********************************************** */
      /********************************************** */
      /********************************************** */
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.headingContainer} >
          <Text style={styles.headingText} >APPLICATION</Text>
        </View> */}
        {/* <View style={styles.buttonContaier} > */}

        <TouchableOpacity
          onPress={this.facebookLogin.bind(this)}
          style={styles.fbBtn} >
          <View style={styles.FBIconContainer} >
            <Icons name="facebook-f" style={styles.FBIcon} />
          </View>
          <View style={styles.FBTextContainer} >
            <Text style={styles.FBText} >LOG IN WITH FACEBOOK</Text>
          </View>
        </TouchableOpacity>


        {/* </View> */}
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
    backgroundColor: "#fff",
    height: "100%",
    width: "70%",
    elevation: 10,
    flexDirection: "row",
  },
  FBIconContainer: {
    height: "100%",
    width: "20%",
    backgroundColor: "#3849a5",
    justifyContent: "center",
    alignItems: "center"
  },
  FBIcon: {
    color: "#fff",
    fontSize: 30
  },
  FBTextContainer: {
    flex: 1,
    backgroundColor: "#5a5edb",
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

export default connect(mapStateToProp, mapDispatchToProp)(Facebook)

