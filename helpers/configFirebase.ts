import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import { AsyncStorage } from "react-native";

// import necessary information to set up connect firebase
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "../env";

// Config connect firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get database
export const db = getDatabase(app);

// get auth
export const auth = getAuth(app);

// Async data from firebase
export const syncFirebase = async () => {
  // Get all trips off current user
  const dataTripsOject = await get(
    ref(db, "User/" + auth.currentUser?.uid + "/Trip")
  );

  // Get all expenses off current user
  const dataExpensesObject = await get(
    ref(db, "User/" + auth.currentUser?.uid + "/Expense")
  );

  //Convert object to array
  let dataTripsArr: any[] = [];
  let dataExpensesArr: any[] = [];

  if (dataTripsOject) {
    dataTripsOject.forEach((item) => {
      dataTripsArr.push(item);
    });
  }

  if (dataExpensesObject) {
    dataExpensesObject.forEach((item) => {
      dataExpensesArr.push(item);
    });
  }

  //Set data trips and expenses to AsyncStorage
  await AsyncStorage.setItem("Trip", JSON.stringify(dataTripsArr));
  await AsyncStorage.setItem("Expense", JSON.stringify(dataExpensesArr));
};

//Back up data
export const BackUpData = async () => {
  //Get data from local storage
  const trips = await AsyncStorage.getItem("Trip");
  const expenses = await AsyncStorage.getItem("Expense");

  //Clear data on firebase of current user
  remove(ref(db, "User/" + auth.currentUser?.uid));

  //Backup data to firebase
  await set(
    ref(db, "User/" + auth.currentUser?.uid + "/Trip"),
    trips ? JSON.parse(trips) : []
  );
  await set(
    ref(db, "User/" + auth.currentUser?.uid + "/Expense"),
    expenses ? JSON.parse(expenses) : []
  );
};
