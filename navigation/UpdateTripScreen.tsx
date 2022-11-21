import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker/src/index";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
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

import { useFormik } from "formik";
import { Box, Button, HStack, VStack } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import ButtonIcon from "../components/ButtonIcon";
import Switch from "../components/Switch";
import { openImageByCamera, openImagePicker } from "../helpers/pickerImage";
import { validSchemaAddTrip } from "../helpers/validationSchema";
import { setTripSelected, updateTrip } from "../slices/tripSlice";
import { RootState, useAppDispatch } from "../store";
import { ITrip } from "../types/inputTypes";

export default function UpDateTripScreen({ navigation }: any) {
  //Config redux
  const dispatch = useAppDispatch();

  //Get old data trip
  const { tripSelected: oldDataTrip } = useSelector(
    (state: RootState) => state.trip
  );

  console.log(oldDataTrip);

  //Setting for modal add image
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [ImageTrip, setImageTrip] = useState<string>();

  //Setting for picker date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState("Empty");

  //Initial data form
  const [isRequiredRiskAssessment, setIsRequiredRiskAssessment] = useState(
    oldDataTrip?.RequiredRiskAssessment ? true : false
  );

  useEffect(() => {
    if (oldDataTrip?.date) {
      setTextDate(oldDataTrip.date);
    } else {
      //Set text date and time
      let tempDate = date || new Date();
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      setTextDate(fDate);
    }

    if (oldDataTrip?.image) {
      setImageTrip(oldDataTrip.image);
    } else {
      setImageTrip(undefined);
    }
  }, [oldDataTrip]);

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
    setTextDate(fDate);
  };

  //Show date picker
  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  //Handle change switch
  const onChangeSwitch = (e: boolean) => {
    setIsRequiredRiskAssessment(e);
  };

  //initial values form
  const initialValues: ITrip = {
    name: oldDataTrip?.name ? oldDataTrip?.name : "",
    destination: oldDataTrip?.destination ? oldDataTrip?.destination : "",
    description: oldDataTrip?.description ? oldDataTrip?.description : "",
    note: oldDataTrip?.note ? oldDataTrip?.note : "",
    topic: oldDataTrip?.topic ? oldDataTrip?.topic : "",
  };

  //Setting form and handle submit update trip
  const formik = useFormik<ITrip>({
    initialValues: initialValues,
    validationSchema: validSchemaAddTrip,
    onSubmit: async (values) => {
      try {
        if (oldDataTrip?.id) {
          //Arrange again data to add date and require risk assessment
          const dataUpdate: ITrip = {
            ...values,
            date: textDate,
            RequiredRiskAssessment: isRequiredRiskAssessment,
            image: ImageTrip,
            id: oldDataTrip.id,
          };

          //Update trip
          dispatch(
            updateTrip({
              idTrip: oldDataTrip.id,
              dataUpdate,
            })
          );

          //Set selected trip
          dispatch(
            setTripSelected({
              trip: dataUpdate,
            })
          );

          //Show message update new trip success
          ToastAndroid.show("Update data trip success !", ToastAndroid.SHORT);

          //Navigate to detail trip
          navigation.navigate("Detail Trip");
        } else {
          //Show message error
          ToastAndroid.show(
            "Please select trip to update !",
            ToastAndroid.SHORT
          );
        }
      } catch (error) {
        //Show message add new trip false
        ToastAndroid.show("Update data trip false !", ToastAndroid.SHORT);
      }
    },
  });

  //Handle get image from library
  const onGetImageLibrary = async () => {
    const imageBase64 = (await openImagePicker()) as {
      base64?: string;
    };
    if (imageBase64.base64) {
      setModalImageVisible(false);
      setImageTrip("data:image/jpeg;base64," + imageBase64.base64);
    }
  };

  //Handle get image from camera
  const onGetImageCamera = async () => {
    const imageBase64 = (await openImageByCamera()) as {
      base64?: string;
    };
    if (imageBase64.base64) {
      setModalImageVisible(false);
      setImageTrip("data:image/jpeg;base64," + imageBase64.base64);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        paddingTop={5}
        paddingBottom={5}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Update Trip</Text>
        <Box>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            color="#009688"
            size={25}
          />
        </Box>
      </HStack>
      <ScrollView style={styles.scrollView}>
        <Box>
          <Text style={styles.label}>Image Trip</Text>
          <TouchableOpacity onPress={() => setModalImageVisible(true)}>
            <HStack
              mt={1}
              mb={1}
              w={"full"}
              height={100}
              borderWidth={1}
              borderRadius={4}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"hidden"}
            >
              {ImageTrip ? (
                <Image
                  source={{ uri: ImageTrip }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Ionicons name={"image"} size={40} color={"#009688"} />
              )}
            </HStack>
          </TouchableOpacity>

          <Text style={styles.label}>
            Trip Name <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            onBlur={() => formik.setFieldTouched("name")}
            placeholder="Enter name here"
            style={styles.input}
          />
          {formik.touched.name && formik.errors.name && (
            <Text style={styles.error}>{formik.errors.name}</Text>
          )}

          <Text style={styles.label}>
            Destination <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            value={formik.values.destination}
            onChangeText={formik.handleChange("destination")}
            onBlur={() => formik.setFieldTouched("destination")}
            placeholder="Enter destination here"
            style={styles.input}
          />
          {formik.touched.destination && formik.errors.destination && (
            <Text style={styles.error}>{formik.errors.destination}</Text>
          )}

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

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={formik.values.description}
            onChangeText={formik.handleChange("description")}
            onBlur={() => formik.setFieldTouched("description")}
            placeholder="Enter description here"
            style={styles.input}
          />

          <Text style={styles.label}>
            Note <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            value={formik.values.note}
            onChangeText={formik.handleChange("note")}
            onBlur={() => formik.setFieldTouched("note")}
            placeholder="Enter note here"
            style={styles.input}
          />
          {formik.touched.note && formik.errors.note && (
            <Text style={styles.error}>{formik.errors.note}</Text>
          )}

          <Text style={styles.label}>
            Topic <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInput
            value={formik.values.topic}
            onChangeText={formik.handleChange("topic")}
            onBlur={() => formik.setFieldTouched("topic")}
            placeholder="Enter topic here"
            style={styles.input}
          />
          {formik.touched.topic && formik.errors.topic && (
            <Text style={styles.error}>{formik.errors.topic}</Text>
          )}

          <Switch
            value={isRequiredRiskAssessment}
            label={"Risk Assessment"}
            onChange={onChangeSwitch}
          />

          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Update Trip</Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>

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
        visible={modalImageVisible}
        onRequestClose={() => {
          setModalImageVisible(!modalImageVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <VStack w={"full"} mt={2} space={2}>
              <Button colorScheme={"teal"} onPress={onGetImageLibrary}>
                Photo library
              </Button>
              <Button colorScheme={"teal"} onPress={onGetImageCamera}>
                Camera
              </Button>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setModalImageVisible(!modalImageVisible)}
              >
                Cancel
              </Button>
            </VStack>
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
