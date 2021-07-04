import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';

export const Navigation = () => {
  return (
    <View style={styles.container}>
      <MapboxNavigation
        origin={[-97.760288, 30.273566]}
        destination={[-97.918842, 30.494466]}
        shouldSimulateRoute
        showsEndOfRouteFeedback
        onLocationChange={(event) => {
          const { latitude, longitude } = event.nativeEvent;
        }}
        onRouteProgressChange={(event) => {
          const {
            distanceTraveled,
            durationRemaining,
            fractionTraveled,
            distanceRemaining,
          } = event.nativeEvent;
        }}
        onError={(event) => {
          const { message } = event.nativeEvent;
        }}
        onCancelNavigation={() => {
          alert("Cancelled Navigation")
        }}
        onArrive={() => {
          alert("Arrived at destination")
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});