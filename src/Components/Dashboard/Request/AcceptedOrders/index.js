import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { CardItem, Thumbnail, Left, Body, Icon, } from 'native-base';
import { connect } from "react-redux"
import { AcceptedOrderAction, finishedOrder } from "../../../../store/action/action"


class AcceptOrders extends Component {

    componentWillMount() {
        const currentUser = this.props.currentUser.currentUser;
        console.log(currentUser)
        fetch("http://192.168.100.197:8000/getAcceptedOrder", {
            method: "post",
            body: JSON.stringify(currentUser),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                const data = JSON.parse(res._bodyInit)
                this.props.AcceptedOrderAction(data)
                console.log(data, "-----------------")
            })
            .catch((err) => { console.log(err) })
    }


    finishOrder(data) {
        console.log(data)
        this.props.finishedOrder(data)
        this.props.navigation.navigate("HeiredReview")
        fetch("http://192.168.100.197:8000/rejectOrder", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
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

    chating(data) {
        this.props.finishedOrder(data)
        this.props.navigation.navigate("ChatComponent")
    }


    seeLocatio(data) {
        this.props.finishedOrder(data)
        this.props.navigation.navigate("Location")
    }



    render() {
        const acceptedOrder = this.props.acceptedOrder.acceptedOrder
        return (
            <View style={{ flex: 1 }} >
                {(acceptedOrder.length < 1) ?
                    <View style={{
                        flex: 1,
                        justifyContent: "center", alignItems: "center"
                    }} >
                        <Image source={require("../../../../assats/noreques.png")} style={{ height: 150, width: 150 }} resizeMode="stretch" />
                        <Text style={{ color: "#454545", fontSize: 20, marginTop: 3 }} >No Request Yet</Text>
                    </View>
                    :
                    <FlatList
                        data={acceptedOrder}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}>
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
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }} >
                                                    <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between" }} >
                                                        <TouchableOpacity
                                                            onPress={this.finishOrder.bind(this, item)}
                                                            style={{
                                                                width: 80,
                                                                borderRadiud: 3,
                                                                height: 30,
                                                                backgroundColor: "#512da7",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }} >
                                                            <Text style={{ color: "#fff", fontSize: 15 }} >Fnish</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={this.chating.bind(this, item)}
                                                            style={{
                                                                width: 80,
                                                                borderRadiud: 3,
                                                                height: 30,
                                                                backgroundColor: "#512da7",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                // borderColor:"#512da7",
                                                                // borderWidth:1
                                                            }} >
                                                            <Text style={{ color: "#fff", fontSize: 15 }} >Chat</Text>
                                                        </TouchableOpacity>
                                                    </View>



                                                    <TouchableOpacity
                                                        onPress={this.seeLocatio.bind(this, item)}
                                                        style={{
                                                            width: 50,
                                                            borderRadiud: 3,
                                                            height: 30,
                                                            backgroundColor: "#fff",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            // borderColor:"#512da7",
                                                            // borderWidth:1
                                                        }} >
                                                        <Icon name={"pin"} style={{ fontSize: 23, color: "#512da7" }} />
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
        acceptedOrder: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        AcceptedOrderAction: (data) => {
            dispatch(AcceptedOrderAction(data))
        },
        finishedOrder: (data) => {
            dispatch(finishedOrder(data))
        },

    };
};

export default connect(mapStateToProp, mapDispatchToProp)(AcceptOrders)
