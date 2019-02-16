import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native"
import { Icon } from "native-base";
import { connect } from "react-redux"

import { Container, Header, Content, Textarea, Form } from "native-base";



class BookPerson extends Component {
    static navigationOptions = {
        title: 'Add Service',
        headerStyle: { backgroundColor: '#512da7' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#ffffff',

    }
    constructor() {
        super()
        this.state = {
            serviceVal: "",
            discription: ""
        }
    }




    book() {
        const { serviceVal, discription } = this.state;
        const choseServises = this.props.choseServises.choseServises;
        const currentUser = this.props.currentUser.currentUser;        
        const obj = {
            prise: serviceVal,
            discription,
            selecterPerson: currentUser,
            selecterPersonID: currentUser.uid,
            selectedPerson: choseServises.serviceProvider.uid
        }
        // console.log(obj)
        fetch("http://192.168.100.21:8000/myOrders", {
            method: "post",
            body:JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
    }





    render() {
        const { serviceVal, discription } = this.state;

        return (
            <View style={{ flex: 1, alignItems: "center" }} >
                <View style={{ marginTop: 30, width: "90%" }} >
                    <TextInput
                        placeholderTextColor={"#512da7"}
                        placeholder="Price "
                        onChangeText={(serviceVal) => { this.setState({ serviceVal }) }}
                        style={{
                            borderColor: "#512da7",
                            borderWidth: 1,
                            height: 60,
                            width: "100%",
                            color: "#512da7",
                            fontSize: 17,
                        }} value={serviceVal} />
                </View>

                <View style={{ marginTop: 20, width: "90%" }} >
                    <Textarea
                        placeholderTextColor={"#512da7"}
                        placeholder="Discription"
                        value={discription}
                        rowSpan={10}
                        onChangeText={(discription) => { this.setState({ discription }) }}
                        style={{
                            borderColor: "#512da7",
                            borderWidth: 1,
                            width: "100%",
                            color: "#512da7",
                            fontSize: 17,
                        }} />
                </View>

                <View style={{ marginTop: 20, width: "90%" }} >
                    <TouchableOpacity onPress={this.book.bind(this)} activeOpacity={.6} style={{ height: 60, backgroundColor: "#512da7", justifyContent: "center", }} >
                        <Text style={{ textAlign: "center", fontSize: 18, color: "#fff" }} >SUBMIT</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}


const mapStateToProp = (state) => {
    return ({
        currentCategory: state.root,
        currentUser: state.root,
        choseServises: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // categoryListAction: (data) => {
        //     dispatch(categoryListAction(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(BookPerson)
