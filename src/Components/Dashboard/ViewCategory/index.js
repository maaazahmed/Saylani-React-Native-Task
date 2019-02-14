import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,

} from 'react-native';
import { Icon } from "native-base"
import { connect } from "react-redux"
import { categoryListAction, servicesACtion } from "../../../store/action/action"


const {  height } = Dimensions.get("window")
class ViewCategory extends Component {
    componentWillMount() {
        const currentCategory = this.props.currentCategory.currentCategory;
        const obj = {
            id: currentCategory._id
        }
        fetch(`http://192.168.0.102:8000/getServieces`, {
            method: "post",
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(JSON.parse(res._bodyInit), "current")
            this.props.servicesACtion(JSON.parse(res._bodyInit))
        }).catch((error) => {
            console.log("Error:", error)
        })
    }


    render() {
        let serviceList = this.props.serviceList.serviceList;
        console.log(serviceList,"serviceList")
        return (
            <View style={{ flex: 1, backgroundColor: "#f2f2f2" }} >
                <View style={{ flex: 1, zIndex: 0, backgroundColor: "#512da7" }}>
                </View>

                <View style={{ flex: 2 }}>
                </View>
                <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0, right: 0,
                    bottom: 0
                }} >
                    <View style={{ height: "20%", justifyContent: "center" }} >
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }} >
                            <Text style={{ fontSize: 19, color: "#fff", fontWeight: "300" }} > Categories</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddServis")} style={{}} >
                                {/* <ion-icon name="contact"></ion-icon> <Text style={{ fontSize: 16, color: "#fff", fontWeight: "300" }} > Add Service</Text> */}
                                <Icon name="add" style={{ color: "#fff", fontSize: 25, }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: "50%", alignItems: "center", marginTop: 10, }} >
                            <View style={{
                                width: "93%", height: 50, backgroundColor: "#462997",
                                borderRadius: 3, flexDirection: "row", alignItems: "center", paddingLeft: 15, paddingRight: 15
                            }}>
                                <Icon name="search" style={{ color: "#8a60ff", fontSize: 20, }} />
                                <TextInput placeholder="Search" placeholderTextColor="#8a60ff" style={{ flex: 1, backgroundColor: "#462997", borderRadius: 3, fontSize: 17, color: "#fff" }} />
                            </View>
                        </View>

                    </View>

                    <View style={{ flex: 1, marginTop: 10 }} >
                        <FlatList
                            data={serviceList}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={index} style={{
                                        backgroundColor: "#fff", height: 120, padding: 5, borderRadius: 2,
                                        marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20, flexDirection: "row"
                                    }} >
                                        <View style={{
                                            width: "25%",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }} >
                                            <Image
                                                style={{
                                                    height: "75%",
                                                    width: "75%", 
                                                    borderRadius: height,

                                                }}
                                                resizeMode={"center"}
                                                source={{ uri: item.serviceProvider.profilePic }} />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10 }} >
                                            <View style={{ padding: 5 }} >
                                                <Text style={{ color: "#1f1f1f", fontSize: 19, fontWeight: "400" }}>{item.categoryVal}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "center" }} >
                                                <Text style={{ color: "#383a3c", fontSize: 15, }}>{"Services"}</Text>
                                                {/* <TouchableOpacity activeOpacity={0.5} style={{
                                                    backgroundColor: "#6144b3", borderRadius: 50,
                                                    padding: 7, width: 100, flexDirection: "row", justifyContent: "space-around",
                                                    alignItems: "center", marginRight: -15,
                                                }} >
                                                    <Text style={{ fontSize: 14, color: "#fff", fontWeight: "300" }} >See</Text>
                                                    <Icon name="eye" style={{ color: "#fff", fontSize: 17, }} />
                                                </TouchableOpacity> */}
                                            </View>
                                            <View style={{ flex: 1, padding: 5, justifyContent: "center", evolution: 5 }} >
                                                <Text style={{ color: "#383a3c", fontSize: 15, }}>{item.dicription}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                </View>
            </View>
        )
    }
}




const mapStateToProp = (state) => {
    return ({
        serviceList: state.root,
        currentCategory: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        categoryListAction: (data) => {
            dispatch(categoryListAction(data))
        },
        servicesACtion: (data) => {
            dispatch(servicesACtion(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(ViewCategory




)
