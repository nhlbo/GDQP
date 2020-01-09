import React from "react";
import {View, Text} from "react-native";
import {millisecondsToHuman} from "../utils/TimerUtils.js";

export default class StopWatch extends React.Component {
  render() {
    return (
      <View style={{width: 43, marginRight: 7, alignItems: "flex-start"}}>
        <Text style={{fontWeight: "bold",}}>{millisecondsToHuman(this.props.elapsed)}</Text>
      </View>
    )
  }
}
