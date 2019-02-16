import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, Modal, FlatList } from "react-native"
import { connect } from "react-redux";
import { myRatingActionActio } from "../../../store/action/action"
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, } from 'native-base';
import { AirbnbRating } from "react-native-ratings"


const { width } = Dimensions.get("window")
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            mailVal: "",
            phonNumerVale: "",
            emailEditFlage: false,
            phonNumerFlege: false,
            modalVisible: false
        }
    }


    componentDidMount() {
        const currentUser = this.props.currentUser.currentUser;

        fetch("http://192.168.100.21:8000/getMyratting"
            , {
                method: "post",
                body: JSON.stringify({ uid: currentUser.uid }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                this.props.myRatingActionActio(JSON.parse(res._bodyInit))
                console.log(res._bodyInit)

            }).catch((err) => {
                console.log(err, ",,,")
            })
    }




    emailEdit() {
        const currentUser = this.props.currentUser.currentUser;

        const obj = {
            email: this.state.mailVal,
            uid: currentUser.uid

        }
        fetch("http://192.168.100.29:8000/mailEdit"
            , {
                method: "post",
                body: JSON.stringify(obj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                this.setState({
                    emailEditFlage: false,
                })
            }).catch((err) => {
                console.log(err, ",,,")
            })
    }



    phonNumerEdit() {
        const currentUser = this.props.currentUser.currentUser;
        this.setState({
            emailEditFlage: false,
        })

        const obj = {
            phoneNumber: this.state.phonNumerVale,
            uid: currentUser.uid
        }
        fetch("http://192.168.100.21:8000/nhoneNumberEdit"
            , {
                method: "post",
                body: JSON.stringify(obj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                this.setState({
                    phonNumerFlege: false,
                })
            }).catch((err) => {
                console.log(err, ",,,")
            })
    }



    render() {
        const currentUser = this.props.currentUser.currentUser;
        const getAllRatting = this.props.getAllRatting.myAllRatting;
        console.log(getAllRatting, "------------------0")
        return (
            <View style={{ flex: 1, }} >
                <View style={{ backgroundColor: "#512da7", flex: 1 }} />
                <View style={{ backgroundColor: "#efefef", flex: 2 }} />
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", evolution: 5 }} >
                        <View style={{ width: "90%", height: "75%", backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }} >
                            <View style={{ alignItems: "center", flex: 3, justifyContent: "center" }} >
                                <Image style={{ height: 115, width: 115, borderRadius: width }} resizeMode="stretch" source={{ uri: currentUser.profilePic }} />
                            </View>
                            <View style={{ alignItems: "center" }} >
                                <View style={{ justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ fontSize: 19, fontWeight: "400", color: "#512da7" }} >{currentUser.username}</Text></View>
                            </View>
                            <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                                <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }} >
                                    <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} style={{ height: 40, width: 100, backgroundColor: "#512da7", justifyContent: "center", alignItems: "center" }} >
                                        <Text style={{ color: "#fff", fontSize: 17 }}>Views</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }} >
                        <View>
                            {(this.state.emailEditFlage) ?
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <TextInput onChangeText={(mailVal) => this.setState({ mailVal })}
                                        style={{ flex: 1, borderColor: "#512da7", borderWidth: 1 }} />
                                    <TouchableOpacity onPress={this.emailEdit.bind(this)}
                                        style={{ width: 60, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 3 }} >
                                        <Icon name="done-all" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="mail" style={{ color: "#512da7", fontSize: 30, }} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center" }} >
                                        <Text style={{ fontSize: 17, color: "#512da7" }}>{currentUser.emailForUser}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ emailEditFlage: true })}
                                        activeOpacity={.5} style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="create" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>


                        <View>
                            {(this.state.phonNumerFlege) ?
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <TextInput onChangeText={(phonNumerVale) => this.setState({ phonNumerVale })} style={{ flex: 1, borderColor: "#512da7", borderWidth: 1 }} />
                                    <TouchableOpacity onPress={this.phonNumerEdit.bind(this)}
                                        style={{ width: 60, height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 3 }} >
                                        <Icon name="done-all" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                                    <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="call" style={{ color: "#512da7", fontSize: 30, }} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center" }} >
                                        <Text style={{ fontSize: 17, color: "#512da7" }}>{currentUser.phoneNumber}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ phonNumerFlege: true })} activeOpacity={.5} style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                        <Icon name="create" style={{ color: "#512da7", fontSize: 25, }} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={{ flexDirection: "row", height: 50, width: "90%", marginTop: 20 }} >
                            <View style={{ width: 70, justifyContent: "center", alignItems: "center" }} >
                                <Icon name="pin" style={{ color: "#512da7", fontSize: 30, }} />
                            </View>
                            <View style={{ flex: 1, justifyContent: "center" }} >
                                <Text style={{ fontSize: 17, color: "#512da7" }}>Location</Text>
                            </View>
                        </View>



                    </View>

                </View>
                <Modal
                    animationType={"fade"}
                    onRequestClose={() => { }}
                    visible={this.state.modalVisible} >
                    <View style={{ flex: 1, backgroundColor: "#0000008f", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ height: "90%", width: "90%", backgroundColor: "#f3f3f3", }} >
                            <FlatList
                                data={getAllRatting}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ marginTop: 3 }}>
                                            {/* <CardItem header>
                                                <Text style={{ color: "#512da7" }}>{"Maaz Ahmed"}</Text>
                                            </CardItem>
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
                                            </CardItem> */}
                                            <Card>
                                                <CardItem header>
                                                    <Text>Maaz Khan</Text>
                                                </CardItem>
                                                <CardItem>
                                                    <Body>
                                                        <Text>
                                                            {item.commentVal}
                                                        </Text>
                                                    </Body>
                                                </CardItem>
                                                <CardItem footer>
                                                    <AirbnbRating
                                                        type='star'
                                                        ratingCount={1}
                                                        defaultRating={item.rating}
                                                        showRating={false}
                                                        size={17}
                                                    />
                                                </CardItem>
                                            </Card>
                                        </View>
                                    )
                                }} keyExtractor={(item) => item._id} />
                            <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }} >
                                <TouchableOpacity activeOpacity={.6} onPress={() => this.setState({ modalVisible: false })} style={{ height: 40, width: "100%", backgroundColor: "#512da7", justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ color: "#fff", fontSize: 17 }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        )
    }
}



const mapStateToProp = (state) => {
    return ({
        currentUser: state.root,
        getAllRatting: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        myRatingActionActio: (data) => {
            dispatch(myRatingActionActio(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Profile)

