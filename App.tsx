import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import MainContainer from "./navigation/MainContainer";
import { store } from "./store";
import {LogBox} from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainContainer />
      </NativeBaseProvider>
    </Provider>
  );
}
