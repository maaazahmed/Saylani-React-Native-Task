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
import { AllWorkersAction, choseServisesAction } from "../../../store/action/action"
import SearchInput, { createFilter } from 'react-native-search-filter';
import geolib from "geolib"


const KEYS_TO_FILTERS = ["serviceProvider.emailForUser", "serviceProvider.phoneNumber"];
const { height } = Dimensions.get("window")
class AllWorkers extends Component {
    constructor() {
        super()
        this.state = {
            searchTerm: '',
        }
    }

    componentWillMount() {
        const currentCategory = this.props.currentCategory.currentCategory;
        const currentUser = this.props.currentUser.currentUser
        const obj = {
            id: currentCategory._id
        }


        // console.log(a, currentUser.location,"AAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAA")
        // let distance = geofire.distance([User1Lat, User1Lon], [User2Lat, User2Lon])
        // if (distance < 5) {
        // }

        fetch(`http://192.168.100.197:8000/allWorkers`, {
            method: "get",
        }).then((res) => {
            const myLocation = {
                latitude: currentUser.location.latitude,
                longitude: currentUser.location.longitude,
            }
            const data = JSON.parse(res._bodyInit)
            const arr = []
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const location = data[i].serviceProvider.location
                const a = geolib.getDistance(myLocation,
                    {
                        latitude: location.latitude,
                        longitude: location.longitude
                    });
                if (a < 10) {
                   arr.push(element)
                 }
            }
            this.props.AllWorkersAction(arr)
        }).catch((error) => {
            console.log("Error:", error)
        })
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }


    choseServises(data) {
        console.log(data, "DATA")
        this.props.choseServisesAction(data)
        this.props.navigation.navigate("Hiring")
    }










    a() {
        let distance = geofire.distance([User1Lat, User1Lon], [User2Lat, User2Lon])
        if (distance < 5) {
        }
    }















    render() {
        const currentUser = this.props.currentUser.currentUser
        let allWokers = this.props.allWokers.allWokers;
        const filteredData = allWokers.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        console.log(filteredData, "filteredData")

        return (
            <View style={{ flex: 1, backgroundColor: "#f3f3f3" }} >
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
                        <View style={{ flex: 1, flexDirection: "row", padding: 15 }} >
                            <Text style={{ fontSize: 19, color: "#fff", fontWeight: "300" }} > All Weokers</Text>
                        </View>
                        <View style={{ height: "50%", alignItems: "center", marginTop: 10, }} >
                            <View style={{
                                width: "93%", height: 50, backgroundColor: "#462997",
                                borderRadius: 3, flexDirection: "row", alignItems: "center", paddingLeft: 15, paddingRight: 15
                            }}>
                                <Icon name="search" style={{ color: "#8a60ff", fontSize: 20, }} />
                                <TextInput
                                    onChangeText={(term) => { this.searchUpdated(term) }}
                                    placeholder="Search by email, contact or location" placeholderTextColor="#8a60ff"
                                    style={{ flex: 1, backgroundColor: "#462997", borderRadius: 3, fontSize: 17, color: "#fff" }} />
                            </View>
                        </View>

                    </View>

                    <View style={{ flex: 1, }} >
                        <FlatList
                            data={filteredData}
                            renderItem={({ item, index }) => {
                                return (item.serviceProvider.uid !== currentUser.uid) ? (
                                    <View key={index} style={{
                                        backgroundColor: "#fff", padding: 5,
                                        marginTop: 3, flexDirection: "row"
                                    }} >
                                        <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }} >
                                            <Image
                                                style={{ height: 70, width: 70, borderRadius: height }} resizeMode={"stretch"}
                                                source={{ uri: item.serviceProvider.profilePic }} />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10 }} >
                                            <View style={{ padding: 5 }} >
                                                <Text style={{ color: "#1f1f1f", fontSize: 19, fontWeight: "400" }}>{item.serviceProvider.username}</Text>
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 5, justifyContent: "center", }} >
                                                <Text note style={{ color: "#383a3c", }}>{item.discription}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "center" }} >
                                                <TouchableOpacity
                                                    onPress={this.choseServises.bind(this, item)}
                                                    activeOpacity={0.5} style={{
                                                        backgroundColor: "#6144b3", borderRadius: 4,
                                                        padding: 4, width: 70, flexDirection: "row", justifyContent: "space-around",
                                                        alignItems: "center",
                                                        margin: 10
                                                    }} >
                                                    <Text style={{ fontSize: 16, color: "#fff", fontWeight: "300", }} >Hire me</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                ) : null
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
        currentCategory: state.root,
        allWokers: state.root,
        currentUser: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        choseServisesAction: (data) => {
            dispatch(choseServisesAction(data))
        },
        AllWorkersAction: (data) => {
            dispatch(AllWorkersAction(data))
        },

    };
};

export default connect(mapStateToProp, mapDispatchToProp)(AllWorkers)
