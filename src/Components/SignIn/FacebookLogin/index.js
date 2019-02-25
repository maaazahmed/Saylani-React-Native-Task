import React, { Component } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux"
import { currentUserAction, isLoaderAction } from "../../../store/action/action"
import IP_ADDRESS from "../../../../IP"

class Facebook extends Component {

  async facebookLogin() {
    this.props.isLoaderAction(true)
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      const data = await AccessToken.getCurrentAccessToken();
      if (result.isCancelled) {
        this.props.isLoaderAction(false)

      }
      else if (!data) {
        this.props.isLoaderAction(false)
        alert("Something went wrong obtaining the users access token")
      }
      else {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        const user = firebaseUserCredential.user._user;
        delete user.providerData
        fetch(`https://saylani-task-app.herokuapp.com/setUser`, {
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
          alert("Someting want to wrong !")
          this.props.isLoaderAction(false)

        })
      }
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

