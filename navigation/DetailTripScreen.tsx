import {
  Box,
  HStack,
  Image,
  Menu,
  Pressable,
  ScrollView,
  VStack,
} from "native-base";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import ItemExpense from "../components/ItemExpense";
import { deleteTrip } from "../slices/tripSlice";
import { RootState, useAppDispatch } from "../store";

export default function DetailTripScreen({ navigation }: any) {
  //Config redux
  const dispatch = useAppDispatch();

  const [isShowExpenses, setIsShowExpenses] = useState(false);

  //Get data trip
  const { tripSelected: dataTrip } = useSelector(
    (state: RootState) => state.trip
  );

  //Get data expenses
  const { expensesOfTripSelected: dataExpenses } = useSelector(
    (state: RootState) => state.expense
  );

  //Handle delete trip
  const onDeleteTrip = (id?: string) => {
    if (id) {
      dispatch(deleteTrip(id));

      //Show message delete trip success
      ToastAndroid.show("Delete trip success !", ToastAndroid.SHORT);

      //Navigate to List Trip screen
      navigation.navigate("List Trip");
    } else {
      //Show message delete trip success
      ToastAndroid.show("Please select trip to delete !", ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HStack justifyContent={"space-between"} paddingTop={5} paddingBottom={5}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Detail Trip</Text>
        <Box>
          <Menu
            placement="bottom right"
            w="150"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Ionicons name="menu" color="#009688" size={25} />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => navigation.navigate("Update Trip")}>
              Update
            </Menu.Item>
            <Menu.Item onPress={() => navigation.navigate("Add Expense")}>
              Add Expense
            </Menu.Item>
            <Menu.Item onPress={() => onDeleteTrip(dataTrip?.id)}>
              Delete
            </Menu.Item>
          </Menu>
        </Box>
      </HStack>

      <ScrollView>
        <VStack space={5}>
          {dataTrip?.image && (
            <Image
              style={{
                width: "100%",
                height: 300,
                borderRadius: 4,
                borderWidth: 1,
              }}
              source={{uri: dataTrip.image}}
            />
          )}
          <Text style={styles.TextTripName}>{dataTrip?.name}</Text>
          <HStack space={5}>
            <View style={styles.tripDestinationContent}>
              <MaterialIcon name="place" color="#009688" size={20} />
              <Text style={styles.tripDestinationText}>
                {dataTrip?.destination ? dataTrip?.destination : "Empty"}
              </Text>
            </View>
            <View style={styles.tripDateContent}>
              <Ionicons name="calendar" color="#009688" size={20} />
              <Text style={styles.tripDateText}>
                {dataTrip?.date ? dataTrip.date : "Empty"}
              </Text>
            </View>
          </HStack>

          <View style={styles.tripDateContent}>
            <HStack space={5}>
              <Text style={{ width: 120 }}>Description:</Text>
              <Text style={{ flex: 1 }}>
                {dataTrip?.description ? dataTrip.destination : "Empty"}
              </Text>
            </HStack>
          </View>

          <View style={styles.tripDateContent}>
            <HStack space={5}>
              <Text style={{ width: 120 }}>Note:</Text>
              <Text style={{ flex: 1 }}>
                {dataTrip?.note ? dataTrip.note : "Empty"}
              </Text>
            </HStack>
          </View>

          <View style={styles.tripDateContent}>
            <HStack space={5}>
              <Text style={{ width: 120 }}>Topic:</Text>
              <Text style={{ flex: 1 }}>
                {dataTrip?.topic ? dataTrip.topic : "Empty"}
              </Text>
            </HStack>
          </View>

          <View style={styles.tripDateContent}>
            <HStack space={5}>
              <Text style={{ width: 120 }}>Risk Assessment:</Text>
              <Text style={{ flex: 1 }}>
                {dataTrip?.RequiredRiskAssessment ? "Yes" : "No"}
              </Text>
            </HStack>
          </View>
          <View>
            {isShowExpenses ? (
              <TouchableOpacity
                onPress={() => setIsShowExpenses(!isShowExpenses)}
              >
                <HStack alignItems={"center"} space={2}>
                  <Text>Hide Expenses</Text>
                  <Ionicons name="caret-up" color="#009688" size={20} />
                </HStack>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setIsShowExpenses(!isShowExpenses)}
              >
                <HStack alignItems={"center"} space={2}>
                  <Text>Show Expenses</Text>
                  <Ionicons name="caret-down" color="#009688" size={20} />
                </HStack>
              </TouchableOpacity>
            )}
          </View>
          {isShowExpenses && (
            <VStack>
              {dataExpenses &&
                dataExpenses.map((item) => (
                  <ItemExpense expense={item} key={item.id} />
                ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "white",
  },
  TextTripName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  tripDestinationContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tripDestinationText: {
    marginLeft: 5,
  },
  tripDateContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tripDateText: {
    marginLeft: 5,
  },
});
