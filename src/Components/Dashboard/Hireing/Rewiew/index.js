import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, } from 'native-base';
import { myRatingAction } from "../../../../store/action/action"
import { connect } from "react-redux"

import { AirbnbRating, } from 'react-native-ratings';



class Review extends Component {
    componentWillMount() {
        // const currentUser = this.props.currentUser.currentUser;
        const choseServises = this.props.choseServises.choseServises;
        fetch("http://192.168.100.21:8000/getRatting", {
            method: "post",
            body: JSON.stringify({ uid: choseServises.serviceProvider.uid }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            this.props.myRatingAction(JSON.parse(res._bodyInit))
            console.log(JSON.parse(res._bodyInit, "0000000000000000000"))
        }).catch((er) => {
            console.log(er)
        })
    }

    render() {
        const myRating = this.props.myRating.myRatting;
        console.log(myRating, "MY RATTING")
        return (
            <View style={{ flex: 1, backgroundColor: "#f3f3f3", marginTop: 10 }} >
                <FlatList
                    data={myRating}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginTop: 3 }}>
                                {/* <CardItem style={{}} >
                                    <Left>
                                        <Body>
                                            <Text>Maaz Ahmed</Text>
                                        </Body>
                                    </Left>
                                </CardItem> */}
                                <CardItem>
                                    <Left>
                                        <Body transparent textStyle={{ color: '#87838B' }}>
                                            <Text style={{ fontSize: 16, color: "#512da7" }}>{item.commentVal}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem style={{}}>
                                    <Body transparent textStyle={{ color: '#87838B' }}>
                                        <AirbnbRating
                                            type='star'
                                            ratingCount={1}
                                            defaultRating={item.rating}
                                            showRating={false}
                                            size={17}
                                        />
                                    </Body>
                                </CardItem>
                            </View>
                        )
                    }} keyExtractor={(item) => item._id} />
            </View>
        )
    }
}




const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        choseServises: state.root,
        myRating: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        myRatingAction: (data) => {
            dispatch(myRatingAction(data))
        },


    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Review)
