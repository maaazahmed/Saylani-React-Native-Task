import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native"
import { Icon } from "native-base";
import { connect } from "react-redux"




const { width } = Dimensions.get("window")
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            mailVal: "",
            phonNumerVale: "",
            emailEditFlage: false,
            phonNumerFlege: false
        }
    }




    emailEdit() {
        const currentUser = this.props.currentUser.currentUser;
        console.log(currentUser.uid)
     
        const obj = {
            email: this.state.mailVal,
            uid: currentUser.uid

        }
        fetch("http://192.168.100.29:8000/mailEdit"
            , {
                method: "post",
                body: JSON.stringify(obj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                this.setState({
                    emailEditFlage: false,
                })
            }).catch((err) => {
                console.log(err, ",,,")
            })
    }



    phonNumerEdit() {
        const currentUser = this.props.currentUser.currentUser;
        this.setState({
            emailEditFlage: false,
        })

        const obj = {
            phoneNumber: this.state.phonNumerVale,
            uid: currentUser.uid
        }
        fetch("http://192.168.100.29:8000/nhoneNumberEdit"
            , {
                method: "post",
                body: JSON.stringify(obj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                this.setState({
                    phonNumerFlege: false,
                })
            }).catch((err) => {
                console.log(err, ",,,")
            })
    }



    render() {
        const currentUser = this.props.currentUser.currentUser
        console.log(currentUser, "currentUsercurrentUser")
        return (
            <View style={{ flex: 1, }} >
                <View style={{ backgroundColor: "#512da7", flex: 1 }} />
                <View style={{ backgroundColor: "#efefef", flex: 2 }} />
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", evolution: 5 }} >
                        <View style={{ width: "90%", height: "75%", backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }} >
                            <View style={{ alignItems: "center", flex: 3, justifyContent: "center" }} >
                                <Image style={{ height: 115, width: 115, borderRadius: width }} resizeMode="stretch" source={{ uri: currentUser.profilePic }} />
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }} >
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1, }} >
                                    <View style={{
                                        width: "50%", borderRightColor: "#9c9c9c", borderRightWidth: 1,
                                        alignItems: "flex-end", paddingRight: 15
                                    }} ><Text style={{ fontSize: 19, fontWeight: "400", color: "#512da7" }} >{currentUser.username}</Text></View>
                                    <View style={{ width: "50%", paddingLeft: 15 }}><Text style={{ fontSize: 15 }}>Plumber</Text></View>
                                </View>
                            </View>
                            <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
                                <Icon name="star" style={{ color: "#fff", fontSize: 25, }} />
                                <Icon name="star-outline" style={{ color: "#512da7", fontSize: 25, padding: 5 }} />
                                <Icon name="star-outline" style={{ color: "#512da7", fontSize: 25, padding: 5 }} />
                                <Icon name="star-outline" style={{ color: "#512da7", fontSize: 25, padding: 5 }} />
                                <Icon name="star-outline" style={{ color: "#512da7", fontSize: 25, padding: 5 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }} >
                        <View>
                            {(this.state.emailEditFlage) ?
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <TextInput onChangeText={(mailVal) => this.setState({ mailVal })}
                                     style={{ flex: 1, borderColor: "#512da7", borderWidth: 1 }} />
                                    <TouchableOpacity onPress={this.emailEdit.bind(this)}
                                        style={{ width: 60, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 3 }} >
                                        <Icon name="done-all" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="mail" style={{ color: "#512da7", fontSize: 30, }} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center" }} >
                                        <Text style={{ fontSize: 17, color: "#512da7" }}>{currentUser.emailForUser}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ emailEditFlage: true })}
                                        activeOpacity={.5} style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="create" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>


                        <View>
                            {(this.state.phonNumerFlege) ?
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <TextInput onChangeText={(phonNumerVale) => this.setState({ phonNumerVale })} style={{ flex: 1, borderColor: "#512da7", borderWidth: 1 }} />
                                    <TouchableOpacity onPress={this.phonNumerEdit.bind(this)}
                                        style={{ width: 60, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 3 }} >
                                        <Icon name="done-all" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="call" style={{ color: "#512da7", fontSize: 30, }} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center" }} >
                                        <Text style={{ fontSize: 17, color: "#512da7" }}>{currentUser.phoneNumber}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ phonNumerFlege: true })} activeOpacity={.5} style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="create" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                            <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                <Icon name="pin" style={{ color: "#512da7", fontSize: 30, }} />
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }} >
                                <Text style={{ fontSize: 17, color: "#512da7" }}>Location</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}



const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // currentUserAction: (data) => {
        //     dispatch(currentUserAction(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Profile)

