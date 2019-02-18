// https://medium.com/quick-code/how-to-add-awesome-maps-to-a-react-native-app-%EF%B8%8F-fc7cbde9c7e9


import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    AppState
} from "react-native";
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";
import firebase from "react-native-firebase";
import { connect } from "react-redux"






const database = firebase.database().ref("/")
const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class Location extends React.Component {
    static navigationOptions = {
        title: 'Locatio',
        headerStyle: { backgroundColor: '#512da7' },
        headerTitleStyle: { color: '#fff' },
        headerTintColor: '#ffffff',
    }
    constructor(props) {
        super(props);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE
            })
        };

    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => { },
            error => alert(error.message),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    componentDidMount() {
        const { coordinate } = this.state;
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const { coordinate, routeCoordinates, distanceTravelled } = this.state;
            const { latitude, longitude } = position.coords;
            const newCoordinate = {
                latitude,
                longitude
            };

            if (Platform.OS === "android") {
                if (this.marker) {
                    this.marker._component.animateMarkerToCoordinate(
                        newCoordinate,
                        500
                    );
                }
            } else {
                coordinate.timing(newCoordinate).start();
            }

            // this.setState({
            //     latitude,
            //     longitude,
            //     routeCoordinates: routeCoordinates.concat([newCoordinate]),
            //     distanceTravelled:
            //         distanceTravelled + this.calcDistance(newCoordinate),
            //     prevLatLng: newCoordinate
            // });
            const obj = {
                latitude,
                longitude,
                routeCoordinates: routeCoordinates.concat([newCoordinate]),
                distanceTravelled:
                    distanceTravelled + this.calcDistance(newCoordinate),
                prevLatLng: newCoordinate
            }

            const currentUser = this.props.currentUser.currentUser
            database.child(`Location/${currentUser.uid}/`).set(obj)
            const selectedPersonID = this.props.worker.finishedOrder.selecterPerson.uid



            database.child(`Location/${selectedPersonID}`).on("value", (snap) => {
                console.log(snap.val(), "snap")
                const place = snap.val()
                this.setState({
                    latitude: place.latitude,
                    longitude: place.longitude,
                    routeCoordinates: place.routeCoordinates,
                    distanceTravelled: place.distanceTravelled,
                    prevLatLng: place.prevLatLng,
                    coordinate: new AnimatedRegion({
                        latitude:  place.latitude,
                        longitude:  place.longitude
                    })
                })
            })



            console.log(selectedPersonID)
        }, (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }



    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    getMapRegion = () => {
        const obj = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }

        return obj
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showUserLocation
                    followUserLocation
                    loadingEnabled
                    region={this.getMapRegion()}
                >
                    {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}
                    <Marker.Animated
                        ref={marker => {
                            this.marker = marker;
                        }}
                        // coordinate={{
                        //     latitude: this.state.latitude,
                        //     longitude: this.state.longitude,
                        // }}
                        coordinate={
                            this.state.coordinate
                        } 
                        />
                </MapView>
                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity> */}
                </View>
            </View>
        );
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
        currentUser: state.root,
        worker: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // myOrderAction: (data) => {
        //     dispatch(myOrderAction(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Location)
