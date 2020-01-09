import React from "react";
import {
  ScrollView, View, Text, StyleSheet, Image, Linking
} from "react-native";

export default class InfoView extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      gestureEnabled: false,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTintColor: "black",
      headerTitleStyle: {color: "black"},
      title: "THÔNG TIN",
    };
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.textContainer, {marginTop: 10}]}>Hướng dẫn</Text>
        <View style={{height: 40, flexDirection: "row", justifyContent: "flex-start", marginTop: 20, flex: 1, alignItems: "center"}}>
          <View>
            <Image
              style={{
                flex: 1,
                width: 40,
                height: 40,
                resizeMode: "contain",
              }}
              source={require("../assets/refresh.png")}
            />
          </View>
          <Text style={[styles.textContainer, {marginLeft: 20}]}>Làm đề khác</Text>
        </View>
        <View style={{height: 40, flexDirection: "row", justifyContent: "flex-start", marginTop: 20, flex: 1, alignItems: "center"}}>
          <View>
            <Image
              style={{
                flex: 1,
                width: 40,
                height: 40,
                resizeMode: "contain",
              }}
              source={require("../assets/check-mark-button.png")}
            />
          </View>
          <Text style={[styles.textContainer, {marginLeft: 20}]}>Nộp bài</Text>
        </View>
        <Text style={[styles.textContainer, {marginTop: 30}]}>Ứng dụng này sẽ giúp các bạn ôn tập tốt môn Giáo Dục Quốc Phòng.</Text>
        <View style={{flexDirection: "row", flex: 1}}>
          <Text style={[styles.textContainer, {marginTop: 10}]}>Câu hỏi và đáp án dựa trên tài liệu tại {}
            <Text
              style={[styles.textContainer, {marginTop: 10, color: "blue"}]}
              onPress={() => {Linking.openURL("https://drive.google.com/open?id=1YXYTOwMIGenVg24r4sShkYF4dFy25ql1")}}>
              đây
            </Text>
          .</Text>
        </View>
        <Text style={[styles.textContainer, {marginTop: 10}]}>Tác giả: Nguyễn Hoàng Long - sinh viên Đại học Khoa học Tự nhiên TPHCM.</Text>
        <View style={{flexDirection: "row"}}>
          <Text style={[styles.textContainer, {marginTop: 10}]}>Nếu có góp ý, hãy liên hệ với mình qua { }
            <Text
              style={[styles.textContainer, {marginTop: 10, color: "blue"}]}
              onPress={() => {
                Linking.canOpenURL("fb://profile/100014108702108")
                  .then((supported) => {
                    if (!supported) {
                      Linking.openURL("https://www.facebook.com/profile.php?id=100014108702108")
                    } else {
                      Linking.openURL("fb://profile/100014108702108")
                    }})
                  .catch(err => console.error("An error occurred", err))
              }}>
              Facebook
            </Text>
          .</Text>
        </View>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    padding: 10,
    paddingTop: 0,
  },
  textContainer: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  }
})
