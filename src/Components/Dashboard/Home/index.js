import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Modal,
    Dimensions,

} from 'react-native';
import { Icon } from "native-base"
import { connect } from "react-redux"
import { categoryListAction, currentCategoryAction, adminDataAction } from "../../../store/action/action"
import SearchInput, { createFilter } from 'react-native-search-filter';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';


const KEYS_TO_FILTERS = ["categoryVal"];
const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;





class Home extends Component {
    constructor() {
        super()
        this.state = {
            searchTerm: "",
            modalVisible: false,
            // a: {
            //     latitude: LATITUDE,
            //     longitude: LONGITUDE,
            // },

            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE
            })
        }
    }

    // https://saylani-task-app.herokuapp.com/
    componentWillMount() {
        fetch("https://saylani-task-app.herokuapp.com/getCategory", {
            method: "get"
        })
            .then((suc) => {
                const data = JSON.parse(suc._bodyInit)
                this.props.categoryListAction(data)
            })
            .catch((err) => { console.log(err) })


        navigator.geolocation.getCurrentPosition(
            position => { },
            error => alert(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );


        fetch("http://192.168.100.156:8000/getAdmin", {
            method: "get"
        }).then((res) => {
            const data = JSON.parse(res._bodyInit)
            // console.log(data)
            this.props.adminDataAction(data)
        }).catch((err) => {
            console.log("Fail ", err)
        })






    }
    componentDidMount() {
        const currentUser = this.props.currentUser.currentUser.location
        if (currentUser === undefined) {
            this.setState({
                modalVisible: true
            })
        }
        const { coordinate } = this.state;
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const { coordinate } = this.state;
            const { latitude, longitude } = position.coords;
            const newCoordinate = {
                latitude,
                longitude
            };
            coordinate.timing(newCoordinate).start();
            this.setState({
                latitude,
                longitude,
            });

        }, (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }






    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
    selectedCategory(data) {
        this.props.currentCategoryAction(data)
        this.props.navigation.navigate("ViewCategory")
    }
    getMapRegion = () => {
        const obj = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        return obj
    }
    _onDragEnd(ev) {
        const coordinate = event.nativeEvent.coordinate;
        this.setState({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        })
        console.log(ev.nativeEvent)
    }

    saveLocation() {
        const currentUser = this.props.currentUser.currentUser
        const location = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }

        const obj = {
            location,
            currentUser: currentUser.uid
        }

        fetch("http://192.168.100.156:8000/svaeLocation", {
            method: "post",
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((suc) => {
            alert("Location Saveed")
        }).catch((err) => {
            console.log(err)
        })
        this.setState({ modalVisible: false })
    }

    adminChat() {
        // const currentUser = this.props.currentUser.currentUser
        // console.log(currentUser,"-----")
        this.props.navigation.navigate("AdminChat")
    }

 

    render() {
        // console.log(this.state.coordinate, "this.state.coordinate")
        let categoryList = this.props.categoryList.cagoryList;
        const filteredData = categoryList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <View style={{ flex: 1, backgroundColor: "#f2f2f2" }} >
                <View style={{ flex: 1, zIndex: 0, backgroundColor: "#512da7" }} />

                <View style={{ flex: 2 }} />

                <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 55
                }} >
                    {/* <ion-icon name="chatboxes"></ion-icon> */}
                    <View style={{ height: "20%", justifyContent: "center" }} >
                        <View style={{ flex: 1, justifyContent: "center", padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                            <Text style={{ fontSize: 19, color: "#fff", fontWeight: "300" }} > Categories</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "20%" }} >
                                <TouchableOpacity onPress={this.adminChat.bind(this)} activeOpacity={0.5} >
                                    <Icon name="chatboxes" style={{ fontSize: 23, color: "#fff" }} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} activeOpacity={0.5} >
                                    <Icon name="pin" style={{ fontSize: 23, color: "#fff" }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: "50%", alignItems: "center", marginTop: 10, }} >
                            <View style={{
                                width: "93%", height: 50, backgroundColor: "#462997",
                                borderRadius: 3, flexDirection: "row", alignItems: "center", paddingLeft: 15, paddingRight: 15
                            }}>
                                <Icon name="search" style={{ color: "#8a60ff", fontSize: 20, }} />
                                <TextInput
                                    onChangeText={(term) => { this.searchUpdated(term) }}
                                    placeholder="Search catogory"
                                    placeholderTextColor="#8a60ff"
                                    style={{
                                        flex: 1,
                                        backgroundColor: "#462997",
                                        borderRadius: 3,
                                        fontSize: 17,
                                        color: "#fff"
                                    }} />
                            </View>
                        </View>
                    </View>

                    {(filteredData.length < 1) ?
                        <View style={{
                            flex: 1,
                            justifyContent: "center", alignItems: "center"
                        }} >

                            <Image source={require("../../../assats/noreques.png")} style={{ height: 150, width: 150 }} resizeMode="stretch" />
                            <Text style={{ color: "#454545", fontSize: 22, marginTop: 3 }} >No Request Yet</Text>
                        </View>
                        :
                        <View style={{ flex: 1, backgroundColor: "#f3f3f3" }} >
                            <FlatList
                                data={filteredData}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View key={index} style={{
                                            backgroundColor: "#fff", height: 150, padding: 5, borderRadius: 2,
                                            marginTop: 3, flexDirection: "row"
                                        }} >
                                            <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }} >
                                                <Image
                                                    style={{ height: "90%", width: "90%", borderRadius: 3 }} resizeMode={"stretch"}
                                                    source={{ uri: item.image }} />
                                            </View>
                                            <View style={{ flex: 1, marginLeft: 10 }} >
                                                <View style={{ padding: 5 }} >
                                                    <Text style={{ color: "#1f1f1f", fontSize: 19, fontWeight: "400" }}>{item.categoryVal}</Text>
                                                </View>
                                                <View style={{ flex: 1, padding: 5, justifyContent: "center", evolution: 5 }} >
                                                    <Text style={{ color: "#383a3c", fontSize: 15, }}>{item.dicription}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end", alignItems: "center", marginTop: 5 }} >
                                                    <TouchableOpacity onPress={this.selectedCategory.bind(this, item)} activeOpacity={0.5} style={{
                                                        backgroundColor: "#6144b3", borderRadius: 50,
                                                        padding: 7, width: 100, flexDirection: "row", justifyContent: "space-around",
                                                        alignItems: "center",
                                                    }} >
                                                        <Text style={{ fontSize: 14, color: "#fff", fontWeight: "300" }} >See</Text>
                                                        <Icon name="eye" style={{ color: "#fff", fontSize: 17, }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item._id} />

                            <Modal visible={this.state.modalVisible}
                                transparent={true}
                                onRequestClose={() => { }}
                                animationType={"fade"} >
                                <View style={{ flex: 1, backgroundColor: "#0000008c", justifyContent: "center", alignItems: "center" }} >
                                    <View style={{ height: "90%", width: "90%", backgroundColor: "#f2f2f2" }} >
                                        <MapView
                                            style={styles.map}
                                            showUserLocation
                                            followUserLocation
                                            loadingEnabled
                                            region={this.getMapRegion()}>
                                            <Marker
                                                coordinate={this.getMapRegion()}
                                                onSelect={(e) => console.log('onSelect', e)}
                                                onDrag={(e) => console.log('onDrag', e)}
                                                onDragStart={(e) => console.log('onDragStart', e)}
                                                onDragEnd={this._onDragEnd.bind(this)}
                                                onPress={(e) => console.log('onPress', e)}
                                                draggable={true}
                                            ></Marker>
                                        </MapView>
                                        <View style={{ flexDirection: "row", width: "100%", height: 50, justifyContent: "space-around", alignItems: "center", position: "absolute", bottom: 5 }} >
                                            <TouchableOpacity onPress={this.saveLocation.bind(this)} style={{ height: "100%", width: "40%", justifyContent: "center", alignItems: "center", backgroundColor: "#512da7" }} >
                                                <Text style={{ color: "#fff", fontSize: 18 }} >
                                                    Save
                                             </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={{ height: "100%", width: "40%", justifyContent: "center", alignItems: "center", backgroundColor: "#512da7" }} >
                                                <Text style={{ color: "#fff", fontSize: 18 }} >
                                                    Close
                                             </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>}
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,

    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    }
});


const mapStateToProp = (state) => {
    return ({
        categoryList: state.root,
        currentUser: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        categoryListAction: (data) => {
            dispatch(categoryListAction(data))
        },
        currentCategoryAction: (data) => {
            dispatch(currentCategoryAction(data))
        },
        adminDataAction: (data) => {
            dispatch(adminDataAction(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home)
