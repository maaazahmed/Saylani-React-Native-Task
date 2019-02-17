import React, { Component } from "react"
import { View, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "native-base"
import { connect } from "react-redux"


class ChatComponent extends Component {
    static navigationOptions = {
        title: 'Add Service',
        headerStyle: { backgroundColor: '#512da7' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#ffffff',
    }

    constructor() {
        super()
        this.state = {
            messageVal: ""
        }
    }

    onMessageSend() {
        const { messageVal } = this.state
        const currentUser = this.props.currentUser.currentUser;
        // console.log(currentUser.uid)
        // console.log(chater.selecterPerson.uid)
        const chater = this.props.chater.finishedOrder;

        if (messageVal !== "") {
            const obj = {
                senderID:currentUser.uid,
                resverId:chater.selecterPerson.uid,
                messageText:messageVal
            }
            console.log(obj)

        }

    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#f3f3f3" }} >

                <View style={{ flex: 1, backgroundColor: "red", }} >
                </View>

                <View style={{ height: 55, justifyContent: "center", flexDirection: "row", alignItems: "center" }} >
                    <View style={{ backgroundColor: "brown", flex: 1 }} >
                        <TextInput
                            onChangeText={(messageVal) => { this.setState({ messageVal }) }}
                            multiline={true} placeholder="Write message... " placeholderTextColor={"#8a60ff"} style={{ flex: 1, backgroundColor: "#512da7", fontSize: 17, color: "#fff" }} />
                    </View>
                    <TouchableOpacity onPress={this.onMessageSend.bind(this)} style={{ backgroundColor: "#512da7", height: 55, width: 60, justifyContent: "center", alignItems: "center" }} >
                        < Icon name="send" style={{ fontSize: 30, color: "#fff" }} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}






const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        chater: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // AcceptedOrderAction: (data) => {
        //     dispatch(AcceptedOrderAction(data))
        // },
        // finishedOrder: (data) => {
        //     dispatch(finishedOrder(data))
        // },

    };
};

export default connect(mapStateToProp, mapDispatchToProp)(ChatComponent)
