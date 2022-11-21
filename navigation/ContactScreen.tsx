import { Box, View, useColorModeValue, Text, HStack } from "native-base";
import {
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const Contact = () => {
  //Handle view to github
  const viewGithub = async () => {
    await Linking.openURL("https://github.com/cuanh1612");
  };

  //Handle view to facebook
  const viewFacebook = async () => {
    await Linking.openURL(
      "https://www.facebook.com/profile.php?id=100014461876748"
    );
  };

  //Handle view to linkedin
  const viewLinkedin = async () => {
    await Linking.openURL(
      "https://www.linkedin.com/in/nguy%E1%BB%85n-huy-b48619240/"
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          ...styles.container,
          backgroundColor: useColorModeValue("white", "#0E153A"),
        }}
      >
        <Image
          style={{
            ...styles.avatar,
            borderColor: useColorModeValue("#009688", "#E2F3F5"),
          }}
          source={require("../assets/avatar.png")}
        />

        <Box
          style={{
            ...styles.intro,
            borderColor: useColorModeValue("#009688", "#E2F3F5"),
          }}
        >
          My name is Nguyen Quang Huy (born 2001). I'm a web and application
          programmer. If you need help, don't hesitate to contact me.
        </Box>

        <Box>
          <Text
            style={{
              ...styles.titleInfor,
              color: useColorModeValue("#009688", "#E2F3F5"),
            }}
          >
            Infor:
          </Text>
        </Box>

        <HStack shadow={5} style={styles.contact}>
          <HStack>
            <AntDesign name="github" size={24} color="#009688" />
            <Text style={styles.contactLable}>cuanh1612</Text>
          </HStack>
          <Box>
            <TouchableWithoutFeedback onPress={viewGithub}>
              <AntDesign name="link" size={24} color="black" />
            </TouchableWithoutFeedback>
          </Box>
        </HStack>

        <HStack shadow={5} style={styles.contact}>
          <HStack>
            <MaterialCommunityIcons name="gmail" size={24} color="#009688" />
            <Text style={styles.contactLable}>huynqdev1612@gmail.com</Text>
          </HStack>
        </HStack>

        <HStack shadow={5} style={styles.contact}>
          <HStack>
            <AntDesign name="phone" size={24} color="#009688" />
            <Text style={styles.contactLable}>+84 833876372</Text>
          </HStack>
        </HStack>

        <HStack shadow={5} style={styles.contact}>
          <HStack>
            <AntDesign name="facebook-square" size={24} color="#009688" />
            <Text style={styles.contactLable}>Huy Nguyễn</Text>
          </HStack>
          <Box>
            <TouchableWithoutFeedback onPress={viewFacebook}>
              <AntDesign name="link" size={24} color="black" />
            </TouchableWithoutFeedback>
          </Box>
        </HStack>

        <HStack shadow={5} style={styles.contact}>
          <HStack>
            <AntDesign name="linkedin-square" size={24} color="#009688" />
            <Text style={styles.contactLable}>Nguyễn Huy</Text>
          </HStack>
          <Box>
            <TouchableWithoutFeedback onPress={viewLinkedin}>
              <AntDesign name="link" size={24} color="black" />
            </TouchableWithoutFeedback>
          </Box>
        </HStack>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
  },

  avatar: {
    width: "100%",
    height: 300,
    borderRadius: 4,
    marginTop: 20,
    borderWidth: 1,
  },

  intro: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },

  titleInfor: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },

  contact: {
    width: "100%",
    height: 50,
    backgroundColor: "#E2F3F5",
    shadowColor: "#000",
    borderRadius: 4,
    paddingHorizontal: 25,
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },

  contactLable: {
    color: "black",
    marginLeft: 25,
    fontSize: 16,
  },
});

export default Contact;
