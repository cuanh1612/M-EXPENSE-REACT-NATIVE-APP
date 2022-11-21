import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ITrip } from "../types/inputTypes";

interface IProps {
  onPress: (trip: ITrip) => void;
  trip: ITrip;
}

function ItemTrip({ onPress, trip }: IProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(trip)}
      style={styles.itemTripContainer}
      key={trip.id}
    >
      {
        trip.image && (
          <Image source={{uri: trip.image}} style={styles.imageTrip}/>
        )
      }
      <Text style={styles.tripName}>{trip.name}</Text>
      <View style={styles.tripDateContent}>
        <Ionicons name="calendar" color="#009688" size={20} />
        <Text style={styles.tripDateText}>{trip.date}</Text>
      </View>
      <View style={styles.tripDestinationContent}>
        <MaterialIcon name="place" color="#009688" size={20} />
        <Text style={styles.tripDestinationText}>{trip.destination}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemTripContainer: {
    borderWidth: 2,
    borderColor: "#009688",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden"
  },
  tripName: {
    fontWeight: "bold",
    margin: 5,
    fontSize: 18,
  },
  tripDateContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  tripDestinationContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  tripDateText: {
    marginLeft: 5,
  },
  tripDestinationText: {
    marginLeft: 5,
  },
  imageTrip: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.5
  }
});

export default ItemTrip;
