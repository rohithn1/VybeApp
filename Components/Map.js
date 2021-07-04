import React from "react";
import { 
    StyleSheet, 
    View, 
    Text } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Keys from '../keys'
import RNLocation from 'react-native-location'

const styles = StyleSheet.create({
    mapcontainer: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    map: {
        flex: 1
    }
})

MapboxGL.setAccessToken(Keys["mapbox-token"])

class Map extends React.Component {

    constructor(){
        super()

        this.state = {
            location: {longitude: 0, latitude: 0},
            render: false
        }

        RNLocation.configure({
            distanceFilter: 5.0,
            allowsBackgroundLocationUpdates: true,
            desiredAccuracy: {
                ios: "best",
                android: "balancedPowerAccuracy"
            }
        })
        
        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "fine",
                rationale: {
                    title: "User Location Services",
                    message: "We use your location to provide the best possible route to your destination. This data is never stored by Vybe.",
                    buttonPositive: "Allow",
                    buttonNegative: "Deny"
                }
            }
        }).then(granted => {
        
            if (granted) {
        
                this._getLocation()

            }
        
        })

    }

    _getLocation = () => {

        this.locationSubscription = RNLocation.subscribeToLocationUpdates(

            locations => {

                this.setState({location: locations[0]})

                this.setState({render: true})

                console.log(this.state.location)

                this.forceUpdate()

            }

        )

    }

    render(){

        const {location} = this.state


        if (this.state.render) {

            return ( 

                <View style = {styles.mapcontainer}>
                    <MapboxGL.MapView
                        styleURL = "mapbox://styles/rohithn1/ckomd1xuh341819qiw5mz8lbk"
                        style = {styles.map}
                    >
                        <MapboxGL.UserLocation/>
                        <MapboxGL.Camera
                            zoomLevel = {17}
                            centerCoordinate = {[location.longitude, location.latitude]}
                            animationMode = {'flyTo'}
                            animationDuration={1000}
                        />
                    </MapboxGL.MapView>
                </View>
        
            )

        } else {
            return ( 

                <View style = {styles.mapcontainer}>
                    <Text>Loading...</Text>
                </View>
        
            )
        }
        
    }

}

export default Map