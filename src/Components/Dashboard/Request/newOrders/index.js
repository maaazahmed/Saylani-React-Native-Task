import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { CardItem, Thumbnail, Left, Body, } from 'native-base';
import { connect } from "react-redux"
import { myOrderAction } from "../../../../store/action/action"


class PendingRequests extends Component {

    componentWillMount() {
        const currentUser = this.props.currentUser.currentUser;
        // console.log(currentUser)
        fetch("http://192.168.100.197:8000/getMyOrders", {
            method: "post",
            body: JSON.stringify(currentUser),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                const data = JSON.parse(res._bodyInit)
                this.props.myOrderAction(data)
                console.log(data, "-----------------")
            })

            .catch((err) => { console.log(err) })
    }


    rejectOrder(data) {
        console.log(data)
        fetch("http://192.168.100.197:8000/rejectOrder", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }


    acceptOrder(data) {
        console.log(data)
        fetch("http://192.168.100.197:8000/acceptOrder", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
    }



    render() {
        // console.log(this.props.myOrders.myOrders, "30")
        const myOrders = this.props.myOrders.myOrders;
        // console.log(myOrders.length < 1)
        return (
            <View style={{ flex: 1, backgroundColor: "#f3f3f3", }} >
                {(myOrders.length < 1) ?
                    <View style={{
                        flex: 1,
                        justifyContent: "center", alignItems: "center"
                    }} >

                        <Image source={require("../../../../assats/noreques.png")} style={{ height: 150, width: 150 }} resizeMode="stretch" />
                        <Text style={{ color: "#454545", fontSize: 22, marginTop: 3 }} >No Request Yet</Text>

                    </View>
                    :
                    <FlatList
                        data={myOrders}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginTop:3}}>
                                    <CardItem style={{}} >
                                        <Left>
                                            <Thumbnail source={{ uri: item.selecterPerson.profilePic }} />
                                            <Body>
                                                <Text>{item.selecterPerson.username}</Text>
                                                <Text note>April 15, 2016</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <View style={{ flexDirection: "row", }} >
                                                    <Text style={{ fontSize: 18, color: "#512da7" }} >
                                                        Rate:
                                             </Text>
                                                    <View style={{ marginLeft: 5 }} >
                                                        <Text style={{ fontSize: 16, color: "#512da7", }} >
                                                            {item.prise}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Body transparent textStyle={{ color: '#87838B' }}>
                                                <Text style={{ fontSize: 16, color: "#512da7" }}>{item.discription}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Body transparent textStyle={{ color: '#87838B' }}>
                                                <View style={{ width: "50%", flexDirection: "row", justifyContent: "space-between", }} >
                                                    <TouchableOpacity
                                                        onPress={this.acceptOrder.bind(this, item)}
                                                        style={{
                                                            width: 100,
                                                            borderRadiud: 3,
                                                            height: 35,
                                                            backgroundColor: "#512da7",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }} >
                                                        <Text style={{ color: "#fff", fontSize: 15 }} >Accept</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={this.rejectOrder.bind(this, item)}
                                                        style={{
                                                            width: 100, height: 35,
                                                            backgroundColor: "#fff",
                                                            justifyContent: "center",
                                                            alignItems: "center", borderColor: "#512da7", borderWidth: 1, borderRadiud: 3
                                                        }} >
                                                        <Text style={{ color: "#512da7", fontSize: 15 }} >Reject</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </View>
                            )
                        }} keyExtractor={(item) => item._id} />}
            </View>
        );
    }
}




const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        myOrders: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        myOrderAction: (data) => {
            dispatch(myOrderAction(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(PendingRequests)
