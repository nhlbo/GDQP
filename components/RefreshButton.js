import React from "react";
import {Image, TouchableOpacity} from "react-native";

export default class RefreshButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          height: 30,
          width: 30,
          marginRight: 20,
        }}
        onPress={this.props.onSubmit}
      >
      <Image
        style={{
          flex: 1,
          width: 30,
          height: 30,
          resizeMode: "contain"
        }}
        source={require("../assets/refresh.png")}
      />
      </TouchableOpacity>
    )
  }
}
