import React, { Component } from "react"
import { View, TextInput, TouchableOpacity, FlatList, Text } from "react-native";
import { Icon } from "native-base"
import { connect } from "react-redux"
import firebase from "react-native-firebase"
import { messageListAction } from "../../../store/action/action"









const database = firebase.database().ref("/")
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

    componentDidMount() {
        const { messageVal } = this.state
        const currentUser = this.props.currentUser.currentUser;
        const chater = this.props.chater.finishedOrder;
        const obj = {
            senderId: currentUser.uid,
            reseverId: chater.selecterPerson.uid,
            messageText: messageVal
        }
        let arr = []
        database.child(`rooms/${obj.senderId}/messages/${obj.reseverId}/`).on("value", (snap) => {
            var messages = snap.val()
            for (key in messages) {
                arr.push({ ...messages[key], key })
            }
            this.props.messageListAction(arr)
        })
    }




    onMessageSend() {
        const { messageVal } = this.state
        const currentUser = this.props.currentUser.currentUser;
        const chater = this.props.chater.finishedOrder;

        if (messageVal !== "") {
            const obj = {
                senderId: currentUser.uid,
                reseverId: chater.selecterPerson.uid,
                messageText: messageVal
            }
            database.child(`rooms/${obj.senderId}/messages/${obj.reseverId}/`).push(obj)
            database.child(`rooms/${obj.reseverId}/messages/${obj.senderId}/`).push(obj)
            this.setState({
                messageVal: ""
            })
        }

    }


    render() {
        const messageList = this.props.messageList.messageList
        const currentUser = this.props.currentUser.currentUser;

        console.log(messageList)
        return (
            <View style={{ flex: 1, backgroundColor: "#f3f3f3" }} >

                <View style={{ flex: 1, backgroundColor: "#f3f3f3", }} >
                    <FlatList data={messageList} renderItem={({ item, index }) => {
                        return (

                            <View
                                style={(item.senderId === currentUser.uid) ?
                                    {
                                        backgroundColor: "#512da7",
                                        fontSize: 20,
                                        marginTop: 10,
                                        width: 200,
                                        borderRadius: 2,
                                        margin: 15,
                                        padding: 5,
                                        alignSelf: "flex-end",
                                    }:{
                                        backgroundColor: "#fff",
                                        fontSize: 20,
                                        marginTop: 10,
                                        width: 200,
                                        borderRadius: 2,
                                        margin: 15,
                                        padding: 5,
                                        alignSelf: "flex-start"
                                    }} >
                                <Text
                                    style={(item.senderId === currentUser) ?
                                        { color: "#512da7", fontSize: 17, textAlign: "center" } :
                                        { color: "#fff", fontSize: 17, textAlign: "center" }}
                                >{item.messageText}</Text>
                            </View>
                        )
                    }} />
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
        chater: state.root,
        messageList: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // AcceptedOrderAction: (data) => {
        //     dispatch(AcceptedOrderAction(data))
        // },
        messageListAction: (data) => {
            dispatch(messageListAction(data))
        },

    };
};

export default connect(mapStateToProp, mapDispatchToProp)(ChatComponent)
