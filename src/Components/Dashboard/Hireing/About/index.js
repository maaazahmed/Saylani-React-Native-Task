import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native"
import { Icon } from "native-base";




export default class About extends Component {
    render() {
        const about = this.props.about;
        return (
            <View style={{ flex: 1 }} >
                <ScrollView>
                    <View style={{ marginTop: 20, paddingTop: 10 }} >
                        <Text style={{ fontSize: 17, color: "#512da7" }}>{about.discription}</Text>
                    </View>
                    <View style={{  }} >
                        <View style={{ flexDirection: "row", height: 50,  }} >
                            <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                <Icon name="mail" style={{ color: "#512da7", fontSize: 25, }} />
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }} >
                                <Text style={{ fontSize: 17, color: "#512da7" }}>{about.serviceProvider.emailForUser}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", height: 50,   }} >
                            <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                <Icon name="call" style={{ color: "#512da7", fontSize: 25, }} />
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }} >
                                <Text style={{ fontSize: 17, color: "#512da7" }}>{about.serviceProvider.phoneNumber}</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}