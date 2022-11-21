import * as React from "react";
import {
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, BackUpData } from "../helpers/configFirebase";
import { setIsLogin } from "../slices/authSlice";
import { resetExpenses } from "../slices/expenseSlice";
import { resetTrips } from "../slices/tripSlice";
import { useAppDispatch } from "../store";

export default function HomeScreen({ navigation }: any) {
  //Config redux
  const dispatch = useAppDispatch();

  //Handle reset data
  const onReset = async () => {
    try {
      //Clear data from local storage
      await AsyncStorage.setItem("Trip", JSON.stringify([]));

      //Clear data trip and expenses
      dispatch(resetTrips());

      dispatch(resetExpenses());

      //Show message reset success
      ToastAndroid.show("Reset data success !", ToastAndroid.SHORT);
    } catch (error) {
      //Show message reset false
      ToastAndroid.show("Reset data false !", ToastAndroid.SHORT);
    }
  };

  //Handle back up data to firebase
  const BackUpDataToFireBase = async () => {
    try {
      BackUpData();
      //Show message backup data success
      ToastAndroid.show("Backup data success !", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Backup data false !", ToastAndroid.SHORT);
    }
  };

  //Handle logout
  const onSignOut = () => {
    //Sign out
    auth.signOut();

    //Set is login redux 
    dispatch(setIsLogin({isLogin: false}));

    //Show message sign out success
    ToastAndroid.show("Sign out success !", ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Add Trip")}
        style={styles.appButtonContainer}
      >
        <View style={styles.appButtonContent}>
          <Ionicons name="add" color="white" size={20} />
          <Text style={styles.appButtonText}>NEW TRIP</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("List Trip")}
        style={styles.appButtonContainer}
      >
        <View style={styles.appButtonContent}>
          <Ionicons name="list" color="white" size={20} />
          <Text style={styles.appButtonText}>TRIP LIST</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Contact")}
        style={styles.appButtonContainer}
      >
        <View style={styles.appButtonContent}>
          <Ionicons name="help-circle" color="white" size={20} />
          <Text style={styles.appButtonText}>ABOUT</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onReset} style={styles.appButtonContainer}>
        <View style={styles.appButtonContent}>
          <Ionicons name="refresh" color="white" size={20} />
          <Text style={styles.appButtonText}>RESET</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={BackUpDataToFireBase}
        style={styles.appButtonContainer}
      >
        <View style={styles.appButtonContent}>
          <Ionicons name="cloud-upload" color="white" size={20} />
          <Text style={styles.appButtonText}>BACKUP</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSignOut}
        style={styles.appButtonContainer}
      >
        <View style={styles.appButtonContent}>
          <Ionicons name="log-out" color="white" size={20} />
          <Text style={styles.appButtonText}>LOG OUT</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
  appButtonContainer: {
    width: "90%",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
