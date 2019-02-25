import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native"
import { Icon } from "native-base";
import { connect } from "react-redux"
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Review from "./Rewiew/index"
import About from "./About"



const { width } = Dimensions.get("window")
class Hiring extends Component {
    constructor() {
        super()
        this.state = {
            mailVal: "",
            phonNumerVale: "",
            emailEditFlage: false,
            phonNumerFlege: false
        }
    }

    render() {
        // console.log(this.props.chosenServise.choseServises)
        const choseServises = this.props.chosenServise.choseServises
        return (
            <View style={{ flex: 1, }} >
                <View style={{ backgroundColor: "#512da7", flex: 1 }} />
                <View style={{ backgroundColor: "#efefef", flex: 2.5 }} />
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", evolution: 5 }} >
                        <View style={{ width: "90%", height: "80%", backgroundColor: "#fff", justifyContent: "center", alignItems: "stretch" }} >

                            <View style={{ alignItems: "center", flex: 1, justifyContent: "center", marginTop: 10 }} >
                                <Image style={{ height: 115, width: 115, borderRadius: width }}
                                    resizeMode="stretch" source={{ uri: "https://scontent-lga3-1.cdninstagram.com/vp/4e2d33393bbc23175d3f23016d5463b0/5CE044F8/t51.2885-15/sh0.08/e35/c0.135.1080.1080/s640x640/37947835_258634254964036_2963327847109754880_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com" }} />
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }} >

                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1, }} >
                                    <View style={{
                                        width: "50%", borderRightColor: "#9c9c9c", borderRightWidth: 1,
                                        alignItems: "flex-end", paddingRight: 10
                                    }} ><Text style={{ fontSize: 19, fontWeight: "400", color: "#512da7" }} >{choseServises.serviceProvider.username}</Text></View>
                                    <View style={{ width: "50%", paddingLeft: 10 }}><Text style={{ fontSize: 15 }}>{choseServises.serviceVal}</Text></View>
                                </View>
                                <View style={{ flexDirection: "row", height: 50, justifyContent: "center", }} >
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("BookPerson")} style={{ backgroundColor: "#512da7", flex: 1, width: "50%", alignItems: "center", justifyContent: "center", }} >
                                        <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                                            <Icon name="checkmark-circle" style={{ color: "#fff", fontSize: 20, }} />
                                            <Text style={{ fontSize: 17, color: "#fff", }} >Book Now</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={{ backgroundColor: "#fff", flex: 1, width: "60%", alignItems: "center", justifyContent: "center", borderColor: "#512da7", borderWidth: .5 }} >
                                        <View style={{ width: "50%", height: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center", }} >
                                            <Icon name="chatboxes" style={{ color: "#512da7", fontSize: 23, }} />
                                            <Text style={{ fontSize: 17, color: "#512da7", }} >Message</Text>
                                        </View>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center", marginTop: 20, backgroundColor: "#fff" }} >
                        <View style={{ width: "90%", height: "100%" }} >
                            <Tabs tabBarUnderlineStyle={{ height: 2, width: "50%", backgroundColor: "#512da7" }} tabContainerStyle={{ width: "100%", alignSelf: "center", }} >
                                <Tab
                                    tabStyle={{ backgroundColor: '#fff', }}
                                    activeTabStyle={{ backgroundColor: '#fff' }}
                                    activeTextStyle={{ color: "#512da7" }}
                                    textStyle={{ color: '#777777' }}

                                    heading="About">
                                    <About about={choseServises} />
                                </Tab>
                                <Tab
                                    tabStyle={{ backgroundColor: '#fff', }}
                                    activeTabStyle={{ backgroundColor: '#fff' }}
                                    activeTextStyle={{ color: "#512da7" }}
                                    textStyle={{ color: '#777777' }}
                                    heading="Review">
                                    <Review  />
                                </Tab>
                            </Tabs>
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
        chosenServise: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // currentUserAction: (data) => {
        //     dispatch(currentUserAction(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Hiring)

