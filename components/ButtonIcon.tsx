import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IProps {
  nameIcon: string;
  size: number;
  color: string;
  onPress: () => void;
}

function ButtonIcon({ nameIcon, size, color, onPress }: IProps) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.buttonIconContainer}>
        <Ionicons name={nameIcon} size={size} color={color} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  buttonIconContainer: {
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default ButtonIcon;
