import React from "react";
import {
  Image, View, Text, TouchableOpacity, StyleSheet
} from "react-native";

export default class Menu extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{maxHeight: 400, flex: 1, margin: 20}}>
          <Image
            resizeMode="contain"
            style={{flex: 1}}
            source={require('../assets/icon.png')}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate("MainView", {hocPhan: 1, numberOfQuestion: 20})}
        >
          <Text style={styles.textContainer}>HỌC PHẦN 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate("MainView", {hocPhan: 2, numberOfQuestion: 20})}
        >
          <Text style={styles.textContainer}>HỌC PHẦN 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate("MainView", {hocPhan: 3, numberOfQuestion: 10})}
        >
          <Text style={styles.textContainer}>HỌC PHẦN 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, {marginBottom: 40}]}
          onPress={() => this.props.navigation.navigate("InfoView")}
        >
          <Text style={styles.textContainer}>THÔNG TIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  buttonContainer: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "center",
  },
  textContainer: {
    color: "white",
    fontWeight: "bold",
  }
})
