import {useEffect} from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAdditionalUserInfo } from "firebase/auth";

//Screen
import AddExpenseScreen from "./AddExpenseScreen";
import AddTripScreen from "./AddTripScreen";
import ContactScreen from "./ContactScreen";
import DetailTripScreen from "./DetailTripScreen";
import HomeScreen from "./HomeScreen";
import ListTripScreen from "./ListTripScreen";
import LoginScreen from "./LoginScreen";
import SingUpScreen from "./SingUpScreen";
import UpdateTripScreen from "./UpdateTripScreen";
import { auth, syncFirebase } from "../helpers/configFirebase";
import { useSelector } from "react-redux";
import { RootState } from "../store";

//Screen names
const loginName = "Login";
const signUpName = "Sign Up";
const homeName = "Home";
const addTripName = "Add Trip";
const ListTripName = "List Trip";
const contactName = "Contact";
const DetailTripName = "Detail Trip";
const UpdateTripName = "Update Trip";
const AddExpenseName = "Add Expense";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  //Get data auth
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLogin) {
      //Sync data from firebase
      syncFirebase();
    }
  }, [isLogin]);

  return (
    <>
      {!isLogin ? (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={loginName}
            screenOptions={{
              tabBarStyle: {
                display: "none",
              },
            }}
          >
            <Tab.Screen name={loginName} component={LoginScreen} />
            <Tab.Screen name={signUpName} component={SingUpScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                  iconName = focused ? "home" : "home-outline";
                } else if (rn === addTripName) {
                  iconName = focused ? "add" : "add-outline";
                } else if (rn === ListTripName) {
                  iconName = focused ? "list" : "list-outline";
                } else if (rn === DetailTripName) {
                  iconName = focused ? "bus" : "bus-outline";
                } else if (rn === contactName) {
                  iconName = focused ? "help-circle" : "help-circle-outline";
                }

                return (
                  <Ionicons
                    name={iconName as string}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "#009688",
            })}
          >
            <Tab.Screen name={homeName} component={HomeScreen} options={{}} />
            <Tab.Screen name={addTripName} component={AddTripScreen} />
            <Tab.Screen
              name={ListTripName}
              component={ListTripScreen}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name={DetailTripName}
              options={{
                tabBarItemStyle: {
                  borderWidth: 2,
                  display: "none",
                },
                headerShown: false,
              }}
              component={DetailTripScreen}
            />
            <Tab.Screen
              name={UpdateTripName}
              options={{
                tabBarItemStyle: {
                  borderWidth: 2,
                  display: "none",
                },
                headerShown: false,
              }}
              component={UpdateTripScreen}
            />
            <Tab.Screen
              name={AddExpenseName}
              options={{
                tabBarItemStyle: {
                  borderWidth: 2,
                  display: "none",
                },
                headerShown: false,
              }}
              component={AddExpenseScreen}
            />
            <Tab.Screen name={contactName} component={ContactScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
