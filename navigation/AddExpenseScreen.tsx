import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker/src/index";
import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import { FormikHelpers, useFormik } from "formik";
import { Box, CheckIcon, HStack, Select } from "native-base";
import uuid from "react-native-uuid";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import ButtonIcon from "../components/ButtonIcon";
import { auth } from "../helpers/configFirebase";
import { validSchemaAddExpense } from "../helpers/validationSchema";
import {
  createExpense,
  setExpensesOfTripSelected,
} from "../slices/expenseSlice";
import { RootState, useAppDispatch } from "../store";
import { IExpense } from "../types/inputTypes";

export default function AddExpenseScreen({ navigation }: any) {
  //Config redux
  const dispatch = useAppDispatch();

  //Get old data trip
  const { tripSelected: dataTrip } = useSelector(
    (state: RootState) => state.trip
  );

  const [typeExpense, setTypeExpense] = React.useState("Travel");

  //Setting for picker date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState("Empty");
  const [textTime, setTextTime] = useState("Empty");

  useEffect(() => {
    //Set text date
    let tempDate = date || new Date();
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setTextDate(fDate);
    setTextTime(fTime);
  }, []);

  //Handle change date time
  const onChangeDateTime = (
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

    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setTextDate(fDate);
    setTextTime(fTime);
  };

  //Show date picker
  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  //Handle reset data
  const onResetData = (formikHelpers: FormikHelpers<IExpense>) => {
    //Reset data form
    formikHelpers.resetForm();
    //Set text date and time
    let tempDate = new Date() || date;
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setTextDate(fDate);
    setTextTime(fTime);
    setTypeExpense("Travel");
  };

  //Setting form handle submit add expense
  const formik = useFormik({
    initialValues: {
      amount: 1,
      additionalComments: "",
    },
    validationSchema: validSchemaAddExpense,
    onSubmit: async (values: IExpense, formikHelpers) => {
      try {
        if (dataTrip?.id) {
          //Create new id
          const newId = uuid.v4();

          //arrange again values add date, time, type, tripId, userId, require risk assessment
          const arrangeValues: IExpense = {
            ...values,
            id: newId as string,
            date: textDate,
            time: textTime,
            type: typeExpense,
            tripId: dataTrip.id,
            userId: auth.currentUser?.uid,
          };

          //Add new expense
          await dispatch(
            createExpense({
              expense: arrangeValues,
            })
          );

          //set expenses of trip selected again to store redux
          await dispatch(
            setExpensesOfTripSelected({
              tripId: dataTrip.id,
            })
          );

          //Show message update new trip success
          ToastAndroid.show("Add new expense success !", ToastAndroid.SHORT);

          //Reset data
          onResetData(formikHelpers);

          //Navigate to detail trip
          navigation.navigate("Detail Trip");
        } else {
          //Show message error
          ToastAndroid.show(
            "Please select trip to add new expense !",
            ToastAndroid.SHORT
          );
        }
      } catch (error) {
        console.log(error);

        //Show message add new trip false
        ToastAndroid.show("Add new expense false !", ToastAndroid.SHORT);
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        paddingTop={5}
        paddingBottom={5}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Detail Trip</Text>
        <Box>
          <Ionicons
            onPress={() => navigation.navigate("Detail Trip")}
            name="arrow-back-outline"
            color="#009688"
            size={25}
          />
        </Box>
      </HStack>

      <ScrollView style={styles.scrollView}>
        <>
          <Text style={styles.label}>Trip Name</Text>
          <Text style={styles.textName}>{dataTrip?.name}</Text>

          <Text style={styles.label}>
            Type <Text style={{ color: "red" }}>*</Text>
          </Text>
          <Select
            selectedValue={typeExpense}
            w="full"
            h={10}
            placeholder="Choose Type"
            borderColor={"gray"}
            borderWidth={1}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => setTypeExpense(itemValue)}
          >
            <Select.Item label="Travel" value="Travel" />
            <Select.Item label="Food" value="Food" />
            <Select.Item label="Other" value="Other" />
          </Select>

          {/* Date picker */}
          <Text style={styles.label}>
            Date <Text style={{ color: "red" }}>*</Text>
          </Text>
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
              {textDate}
            </Text>
            <ButtonIcon
              color="white"
              size={20}
              nameIcon={"calendar-outline"}
              onPress={() => showMode("date")}
            />
          </View>

          {/* Time picker */}
          <Text style={styles.label}>
            Time <Text style={{ color: "red" }}>*</Text>
          </Text>
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
              {textTime}
            </Text>
            <ButtonIcon
              color="white"
              size={20}
              nameIcon={"time-outline"}
              onPress={() => showMode("time")}
            />
          </View>

          <Text style={styles.label}>
            Amount <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            keyboardType="numeric"
            value={formik.values.amount.toString()}
            onChangeText={formik.handleChange("amount")}
            onBlur={() => formik.setFieldTouched("amount")}
            placeholder="Enter amount here"
            style={styles.input}
          />
          {formik.touched.amount && formik.errors.amount && (
            <Text style={styles.error}>{formik.errors.amount}</Text>
          )}

          <Text style={styles.label}>Additional Comments</Text>
          <TextInput
            value={formik.values.additionalComments}
            onChangeText={formik.handleChange("additionalComments")}
            onBlur={() => formik.setFieldTouched("additionalComments")}
            placeholder="Enter additional comments here"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </>
      </ScrollView>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display={"default"}
          onChange={onChangeDateTime}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    padding: 18,
  },
  scrollView: {
    width: "100%",
  },
  label: {
    width: "100%",
    color: "black",
    marginLeft: 0,
    borderColor: "black",
    marginVertical: 5,
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
  error: {
    fontSize: 12,
    color: "#FF0D10",
  },
  appButtonContainer: {
    width: "100%",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonIconContainer: {
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textName: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    borderColor: "gray",
    borderWidth: 1,
    color: "gray",
    width: "100%",
  },
});
