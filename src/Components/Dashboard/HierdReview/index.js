import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native"
import { AirbnbRating, } from 'react-native-ratings';
import { Icon, Textarea } from "native-base";
import { connect } from "react-redux"




const { width } = Dimensions.get("window")
class HeiredReview extends Component {
    static navigationOptions = {
        title: 'Add Service',
        headerStyle: { backgroundColor: '#512da7' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#ffffff',

    }
    constructor(props) {
        super(props)
        this.state = {
            commentVal: "",
            rating: 0

        }
    }


    giveCommint() {
        const currentUser = this.props.currentUser.currentUser;
        const obj = {
            uid: currentUser.uid,
            rating: this.state.rating,
            commentVal: this.state.commentVal,
            selecterPersonID: this.props.heiredPerson.finishedOrder.selecterPersonID
        }

        if (obj.commentVal !== "") {
            fetch("http://192.168.100.197:8000/saveRatting"
                , {
                    method: "post",
                    body: JSON.stringify(obj),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    this.props.navigation.navigate("Dashboard")
                }).catch((err) => {
                    console.log(err)
                })
        }
        else {
            alert("Please write comment")
        }
    }





    ratingCompleted(rating) {
        this.setState({
            rating: rating
        })
        console.log("Rating is: " + rating)
    }



    render() {
        const currentUser = this.props.currentUser.currentUser
        console.log(currentUser, "currentUsercurrentUser")
        return (
            <View style={{ flex: 1, }} >
                <View style={{ flex: 1, }}>
                    <View style={{ alignItems: "center", height: "30%" }} >
                        <View style={{ height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#512da7" }} >
                            <View style={{ alignItems: "center", flex: 3, justifyContent: "center" }} >
                                <Image style={{ height: 115, width: 115, borderRadius: width }}
                                    resizeMode="stretch" source={{ uri: "https://avatars2.githubusercontent.com/u/31310451?s=460&v=4" }} />
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }} >
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1, }} >
                                    <View style={{
                                        width: "50%", borderRightColor: "#9c9c9c", borderRightWidth: 1,
                                        alignItems: "flex-end", paddingRight: 15
                                    }} >
                                        <Text style={{ fontSize: 17, fontWeight: "400", color: "#fff" }} >{"Aslam Khan"}</Text>
                                    </View>
                                    <View style={{ width: "50%", paddingLeft: 15 }}>
                                        <Text style={{ fontSize: 15, color: "#fff" }}>Plumber</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", flexDirection: "row", }} >
                                <AirbnbRating
                                    // type='custom'
                                    type='star'
                                    ratingCount={1}
                                    defaultRating={0}
                                    onFinishRating={this.ratingCompleted.bind(this)}
                                    showRating={false}
                                    size={17}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, alignItems: "center", marginTop: 20 }} >
                        <View style={{ width: "90%" }} >
                            <Textarea
                                value={this.state.commentVal}
                                onChangeText={(commentVal) => { this.setState({ commentVal }) }}
                                placeholderTextColor={"#512da7"}
                                placeholder="Comment"
                                // value={discription}
                                rowSpan={6}
                                // onChangeText={(discription) => { this.setState({ discription }) }}
                                style={{
                                    borderColor: "#512da7",
                                    borderWidth: 1,
                                    width: "100%",
                                    color: "#512da7",
                                    fontSize: 17,
                                }} />
                        </View>
                        <View style={{ marginTop: 20, width: "90%" }} >
                            <TouchableOpacity
                                onPress={this.giveCommint.bind(this)}
                                activeOpacity={.6} style={{ height: 55, backgroundColor: "#512da7", justifyContent: "center", }} >
                                <Text style={{ textAlign: "center", fontSize: 18, color: "#fff" }} >SUBMIT</Text>
                            </TouchableOpacity>
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
        heiredPerson: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // currentUserAction: (data) => {
        //     dispatch(currentUserAction(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(HeiredReview)

