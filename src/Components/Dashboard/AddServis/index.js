import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native"
import { Icon } from "native-base";
import { connect } from "react-redux"

import { Container, Header, Content, Textarea, Form } from "native-base";



class AddServis extends Component {
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

    


    AddService() {
        const { serviceVal, discription } = this.state;
        // console.log(this.props.currentCategory.currentCategory, "currentCategorycurrentCategorycurrentCategorycurrentCategory")
        const currentCategory = this.props.currentCategory.currentCategory;
        const currentUser = this.props.currentUser.currentUser
        delete currentUser._id
        delete currentUser.email
        // console.log(currentUser,"9999999999")
        // console.log(obj, "---------------------")

        const obj = {
            serviceVal,
            discription,
            categoryID: currentCategory._id,
            serviceProvider:currentUser
        }

        fetch("http://192.168.0.102:8000/addService", {
            method: "post",
            body:JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res)=>{
            console.log(res)
            this.props.navigation.navigate("ViewCategory")
        }).catch((err)=>{
          console.log(err)
        })
    }





    render() {
        const { serviceVal, discription } = this.state
        return (
            <View style={{ flex: 1, alignItems: "center" }} >
                <View style={{ marginTop: 30, width: "90%" }} >
                    <TextInput
                        placeholderTextColor={"#512da7"}
                        placeholder="Enter your skill"
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
                    <TouchableOpacity onPress={this.AddService.bind(this)} activeOpacity={.6} style={{ height: 60, backgroundColor: "#512da7", justifyContent: "center", }} >
                        <Text style={{ textAlign: "center", fontSize: 18, color: "#fff" }} >SUBMIT</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}


const mapStateToProp = (state) => {
    return ({
        categoryList: state.root,
        currentCategory: state.root,
        currentUser: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // categoryListAction: (data) => {
        //     dispatch(categoryListAction(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(AddServis)
