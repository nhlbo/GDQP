import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default class QuestionContainer extends React.Component {
  onPress = (id, truth) => {
    if (!this.props.disable)
      this.props.answerOnPress(this.props.data.id, id, truth);
  }

  render() {
    const arr = this.props.data.answer.map((obj, index) => {
      var rObj = {};
      rObj["id"] = index;
      rObj["clause"] = obj.clause;
      rObj["truth"] = obj.truth;
      return rObj;
    });

    return (
      <View style={styles.container}>
        <Text>Câu {this.props.id}: {this.props.data.question}</Text>
        {
          arr.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.buttonContainer}
                onPress={() => this.onPress(item.id, item.truth)}
              >
                <View style={{alignItems: "center", flexDirection: "row"}}>
                  <View style={styles.circle}>
                    {this.props.data.value === item.id && (<View style={styles.checkedCircle}/>)}
                  </View>
                </View>
                {this.props.disable ?
                  (item.truth ?
                    (
                      <Text style={styles.trueTextContainer}>{item.clause}</Text>
                    ) : this.props.data.value === item.id ? <Text style={styles.falseTextContainer}>{item.clause}</Text> : <Text style={styles.textContainer}>{item.clause}</Text>
                  ) : <Text style={styles.textContainer}>{item.clause}</Text>
                }
              </TouchableOpacity>

          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "green",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  trueTextContainer: {
    flex: 1,
    marginLeft: 10,
    color: "green",
    fontWeight: "bold",
  },
  falseTextContainer: {
    flex: 1,
    marginLeft: 10,
    color: "red",
  }
})
