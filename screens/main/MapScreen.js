import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  console.log(route);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="standard"
        region={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          title={route.title}
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.latitude,
          }}
          description="It is here"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
