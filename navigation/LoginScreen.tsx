import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { Box, HStack } from "native-base";
import { auth } from "../helpers/configFirebase";
import { validSchemaLogin } from "../helpers/validationSchema";
import { setIsLogin } from "../slices/authSlice";
import { useAppDispatch } from "../store";
import { IUser } from "../types/inputTypes";

export default function LoginScreen({ navigation }: any) {
  //Config redux
  const dispatch = useAppDispatch();

  //Setting form handle submit login trip
  const formik = useFormik<IUser>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validSchemaLogin,
    onSubmit: async (values) => {
      try {
        //Login
        await signInWithEmailAndPassword(auth, values.email, values.password);

        //Set is login auth redux
        dispatch(setIsLogin({ isLogin: true }));

        ToastAndroid.show("Login success !", ToastAndroid.SHORT);
      } catch (error) {
        //Show message false
        ToastAndroid.show("Email or password wrong !", ToastAndroid.SHORT);
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Box>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={() => formik.setFieldTouched("email")}
            placeholder="Enter email here"
            style={styles.input}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.error}>{formik.errors.email}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onBlur={() => formik.setFieldTouched("password")}
            placeholder="Enter password here"
            style={styles.input}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.error}>{formik.errors.password}</Text>
          )}

          <TouchableOpacity
            onPress={() => formik.handleSubmit()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Login</Text>
          </TouchableOpacity>
        </Box>
        <HStack justifyContent={"center"}>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate("Sign Up")}
          >
            Sing up new account
          </Text>
        </HStack>
      </ScrollView>
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
  scrollView: {
    width: "100%",
    padding: 15,
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
  textLink: {
    color: "#009688",
  },
});
