import React from "react";
import { StyleSheet, Switch as SwitchElement, Text, View } from "react-native";

interface Iprops {
  label: string;
  value: boolean;
  onChange: (e: boolean) => void;
}

function Switch({ label, value, onChange }: Iprops) {
  return (
    <View style={styles.SwitchContainer}>
      <Text style={{ flex: 1 }}>{label}</Text>
      <SwitchElement value={value} onValueChange={onChange}/>
    </View>
  );
}

const styles = StyleSheet.create({
  SwitchContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row"
  },
});

export default Switch;
