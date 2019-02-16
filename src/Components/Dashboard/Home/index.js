import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList
} from 'react-native';
import { Icon } from "native-base"
import { connect } from "react-redux"
import { categoryListAction, currentCategoryAction } from "../../../store/action/action"



class Home extends Component {
    componentWillMount() {
        fetch("http://192.168.100.21:8000/getCategory", {
            method: "get"
        })
            .then((suc) => {
                const data = JSON.parse(suc._bodyInit)
                console.log(data)
                this.props.categoryListAction(data)
            })
            .catch((err) => { console.log(err) })
    }


    selectedCategory(data) {
        // console.log(data,"DATA")
        this.props.currentCategoryAction(data)
        this.props.navigation.navigate("ViewCategory")
    }

    render() {
        let categoryList = this.props.categoryList.cagoryList;
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
                            <TouchableOpacity style={{}} >
                                {/* <ion-icon name="contact"></ion-icon> <Text style={{ fontSize: 16, color: "#fff", fontWeight: "300" }} > Add Service</Text> */}
                                <Icon name="contact" style={{ color: "#fff", fontSize: 25, }} />
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
                        {/* <ScrollView> */}
                        <FlatList
                            data={categoryList}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={index} style={{
                                        backgroundColor: "#fff", height: 150, padding: 5, borderRadius: 2,
                                        marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20, flexDirection: "row"
                                    }} >
                                        <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }} >
                                            <Image
                                                style={{ height: "90%", width: "90%", borderRadius: 3 }} resizeMode={"stretch"}
                                                source={{ uri: item.image }} />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10 }} >
                                            <View style={{ padding: 5 }} >
                                                <Text style={{ color: "#1f1f1f", fontSize: 19, fontWeight: "400" }}>{item.categoryVal}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "center" }} >
                                                <Text style={{ color: "#383a3c", fontSize: 15, }}>{"Services"}</Text>
                                                <TouchableOpacity onPress={this.selectedCategory.bind(this, item)} activeOpacity={0.5} style={{
                                                    backgroundColor: "#6144b3", borderRadius: 50,
                                                    padding: 7, width: 100, flexDirection: "row", justifyContent: "space-around",
                                                    alignItems: "center", marginRight: -15,
                                                }} >
                                                    <Text style={{ fontSize: 14, color: "#fff", fontWeight: "300" }} >See</Text>
                                                    <Icon name="eye" style={{ color: "#fff", fontSize: 17, }} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 1, padding: 5, justifyContent: "center", evolution: 5 }} >
                                                <Text style={{ color: "#383a3c", fontSize: 15, }}>{item.dicription}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item._id}/>

                        {/* </ScrollView> */}
                    </View>
                </View>
            </View>
        )
    }
}




const mapStateToProp = (state) => {
    return ({
        categoryList: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        categoryListAction: (data) => {
            dispatch(categoryListAction(data))
        },
        currentCategoryAction: (data) => {
            dispatch(currentCategoryAction(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home)
