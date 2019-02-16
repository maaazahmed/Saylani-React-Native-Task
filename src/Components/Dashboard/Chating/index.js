import React, { Component } from "react"
import { View, TextInput } from "react-native";
import { Icon } from "native-base"


export default class ChatComponent extends Component {
    static navigationOptions = {
        title: 'Add Service',
        headerStyle: { backgroundColor: '#512da7' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#ffffff',
    }

    constructor() {
        super()
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "green", }} >

                <View style={{ flex: 1, backgroundColor: "red",  }} >
                </View>

                <View style={{ height: 70, backgroundColor: "blur", borderColor: "#512da7", justifyContent: "center",  padding: 5, flexDirection: "row", alignItems:"center" }} >
                    <View style={{ backgroundColor: "brown", height: 55, flex:1 }} >

                    </View>
                    <View style={{ backgroundColor: "yellow", height: 55, width: 60 }} >
                      
                    </View>
                </View>

            </View>
        )
    }
}