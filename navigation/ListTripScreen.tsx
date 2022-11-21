import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { AlertDialog, Button, HStack, Input } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import ButtonIcon from "../components/ButtonIcon";
import ItemTrip from "../components/ItemTrip";
import { setExpensesOfTripSelected } from "../slices/expenseSlice";
import {
  filterTrip,
  getTrips,
  searchTrip,
  setTripSelected,
} from "../slices/tripSlice";
import { RootState, useAppDispatch } from "../store";
import { ITrip } from "../types/inputTypes";

export default function DetailScreen({ navigation }: any) {
  //Config redux
  const dispatch = useAppDispatch();

  const { trips } = useSelector((state: RootState) => state.trip);

  //Setting for picker date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [textDateTripFilter, setTextDateTripFilter] = useState("");

  //Setting for modal filter
  const [modalTripFilterVisible, setModalTripFilterVisible] = useState(false);

  //Setting for dialog filter
  const [isOpen, setIsOpen] = useState(false);
  const [nameTripFilter, setNameTripFilter] = useState("");
  const [destinationTripFilter, setDestinationTripFilter] = useState("");

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  //UseEffect get trip from local save to store
  useEffect(() => {
    dispatch(getTrips());
  }, []);

  //Handle change date
  const onChangeDate = (
    _: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setTextDateTripFilter(fDate);
  };

  //Show date picker
  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  //Handle press trip
  const onPressTrip = (trip: ITrip) => {
    dispatch(
      setTripSelected({
        trip,
      })
    );

    dispatch(
      setExpensesOfTripSelected({
        tripId: trip.id as string,
      })
    );

    navigation.navigate("Detail Trip");
  };

  //Handle search
  const onSearchTrip = (textSearch: string) => {
    dispatch(searchTrip(textSearch));
  };

  //Handle filter
  const onFilterTrip = () => {
    console.log(textDateTripFilter);
    console.log(destinationTripFilter);
    console.log(nameTripFilter);

    dispatch(
      filterTrip({
        date: textDateTripFilter,
        destination: destinationTripFilter,
        name: nameTripFilter,
      })
    );

    //Close modal filter
    setModalTripFilterVisible(false);

    //Reset data filter
    setTextDateTripFilter("");
    setNameTripFilter("");
    setDestinationTripFilter("");
  };

  //Handle clear search and filter
  const onClearSearchFilter = async () => {
    dispatch(getTrips());
  };

  return (
    <SafeAreaView style={styles.container}>
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        paddingTop={5}
        paddingBottom={5}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>List Trip</Text>
        <HStack space={5}>
          <Ionicons
            onPress={() => setModalTripFilterVisible(true)}
            name="filter"
            color="#009688"
            size={25}
          />
          <Ionicons
            onPress={onClearSearchFilter}
            name="refresh"
            color="#009688"
            size={25}
          />
        </HStack>
      </HStack>

      <Input
        onChangeText={onSearchTrip}
        variant="rounded"
        placeholder="Search Trip Here"
        backgroundColor={"white"}
        InputRightElement={
          <Ionicons
            name="search"
            color="#009688"
            size={20}
            style={{ marginRight: 10 }}
          />
        }
      />
      <FlatList
        style={styles.listTripContainer}
        data={trips}
        renderItem={({ item }) => (
          <ItemTrip trip={item} onPress={onPressTrip} key={item.id} />
        )}
      />

      {/* dialog filter */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Filter Trip</AlertDialog.Header>
          <AlertDialog.Body>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={nameTripFilter}
              placeholder="Enter name here"
              style={styles.input}
              onChangeText={(e) => setNameTripFilter(e)}
            />
            <Text style={styles.label}>Date</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 4,
                  padding: 10,
                  marginRight: 10,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
              >
                {textDateTripFilter}
              </Text>
              <ButtonIcon
                color="white"
                size={20}
                nameIcon={"calendar-outline"}
                onPress={() => showMode("date")}
              />
            </View>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              value={destinationTripFilter}
              onChangeText={(e) => setDestinationTripFilter(e)}
              placeholder="Enter destination here"
              style={styles.input}
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme={"teal"} onPress={onFilterTrip}>
                Search
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display={"default"}
          onChange={onChangeDate}
        />
      )}

      {/* Modal filter trip */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTripFilterVisible}
        onRequestClose={() => {
          setModalTripFilterVisible(!modalTripFilterVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={nameTripFilter}
              placeholder="Enter name here"
              style={styles.input}
              onChangeText={(e) => setNameTripFilter(e)}
            />
            <Text style={styles.label}>Date</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 4,
                  padding: 10,
                  marginRight: 10,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
              >
                {textDateTripFilter}
              </Text>
              <ButtonIcon
                color="white"
                size={20}
                nameIcon={"calendar-outline"}
                onPress={() => showMode("date")}
              />
            </View>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              value={destinationTripFilter}
              onChangeText={(e) => setDestinationTripFilter(e)}
              placeholder="Enter destination here"
              style={styles.input}
            />
            <HStack justifyContent={"flex-end"} w={"full"} mt={2}>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => setModalTripFilterVisible(false)}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme={"teal"} onPress={onFilterTrip}>
                  Search
                </Button>
              </Button.Group>
            </HStack>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  listTripContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    height: 40,
    padding: 10,
    borderRadius: 4,
    width: "100%",
    marginVertical: 5,
    borderWidth: 1,
  },
  label: {
    width: "100%",
    color: "black",
    marginLeft: 0,
    borderColor: "black",
    marginVertical: 5,
  },

  centeredView: {
    flex: 1,
    marginTop: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
