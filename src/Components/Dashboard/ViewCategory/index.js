import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Button,
} from 'react-native';
import { Icon } from "native-base"
import { connect } from "react-redux"
import { servicesACtion, choseServisesAction } from "../../../store/action/action"
// import SearchInput, { createFilter } from 'react-native-search-filter';



// const KEYS_TO_FILTERS = [""]
const { height } = Dimensions.get("window")
class ViewCategory extends Component {
    static navigationOptions = {
        title: 'Service',
        headerStyle: { backgroundColor: '#512da7' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#ffffff',


    }
    constructor() {
        super();

    }

    componentWillMount() {
        const currentCategory = this.props.currentCategory.currentCategory;
        const obj = {
            id: currentCategory._id
        }
        let arr = []
        fetch(`http://192.168.100.197:8000/getServieces`, {
            method: "post",
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            for (let i = 0; i < JSON.parse(res._bodyInit).length; i++) {
                const element = JSON.parse(res._bodyInit)[i];
                if(element.uid !== this.props.currentUser.currentUser.uid){
                    arr.push(element)
                }
            }
            this.props.servicesACtion(arr)
        }).catch((error) => {
            console.log("Error:", error)
        })
    }

    // searchUpdated(term) {
    //     this.setState({ searchTerm: term })
    // }
    choseServises(data) {
        console.log(data, "DATA")
        this.props.choseServisesAction(data)
        this.props.navigation.navigate("Hiring")
    }



    render() {
        let serviceList = this.props.serviceList.serviceList;
        console.log(serviceList, "serviceList")
        return (
            <View style={{ flex: 1, backgroundColor: "#f3f3f3" }} >
                <View style={{ flex: 1 }} >
                    {(serviceList.length < 1) ?
                      
                            <View style={{
                                flex: 1,
                                justifyContent: "center", alignItems: "center"
                            }} >

                                <Image source={require("../../../assats/noreques.png")} style={{ height: 150, width: 150 }} resizeMode="stretch" />
                                <Text style={{ color: "#454545", fontSize: 20, marginTop: 3 }} >No Catogory Yet</Text>
                            </View>
              
                        :
                        <View style={{ flex: 1, backgroundColor: "#f3f3f3" }} >
                            <FlatList
                                data={serviceList}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View key={index} style={{
                                            backgroundColor: "#fff", padding: 5, borderRadius: 2,
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
                                                            padding: 4, width: 100, flexDirection: "row", justifyContent: "space-around",
                                                            alignItems: "center",
                                                            margin: 10
                                                        }} >
                                                        <Text style={{ fontSize: 16, color: "#fff", fontWeight: "300", }} >Hire me</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item._id}
                            />
                        </View>}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("AddServis")}
                        activeOpacity={0.7} style={{
                            height: 60,
                            width: 60,
                            backgroundColor: "#512da7",
                            borderRadius: height, elevation: 4,
                            position: "absolute", bottom: 25,
                            justifyContent: "center",
                            alignItems: "center",
                            right: 25
                        }} >
                        <Icon name="add" style={{ color: "#fff", fontSize: 23, }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}




const mapStateToProp = (state) => {
    return ({
        serviceList: state.root,
        currentCategory: state.root,
        currentUser:state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        choseServisesAction: (data) => {
            dispatch(choseServisesAction(data))
        },
        servicesACtion: (data) => {
            dispatch(servicesACtion(data))
        },

    };
};

export default connect(mapStateToProp, mapDispatchToProp)(ViewCategory




)
