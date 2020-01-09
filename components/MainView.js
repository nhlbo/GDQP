import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, Alert, FlatList,
} from "react-native";
import {withNavigation} from "react-navigation";
import {qBank} from "./QuestionBank.js";
import StopWatch from "./StopWatch.js";
import QuestionContainer from "./QuestionContainer.js";
import SubmitButton from "./SubmitButton.js";
import RefreshButton from "./RefreshButton.js";

const TIMER_INTERVAL = 1000;
const TIME_A = 1200000;
const TIME_B = 900000;

export default class MainView extends React.Component {
  state = {
    elapsed: 0,
    disable: false,
    firstTime: true,
    point: 0,
    db: [],
  }

  static navigationOptions = ({navigation}) => {
    return {
      gestureEnabled: false,
      headerTitle: "",
      headerTintColor: "black",
      headerRight: () => (
        <View style={styles.viewTopContainer}>
          <RefreshButton onSubmit={navigation.state.params.handleRefresh}/>
          <SubmitButton onSubmit={navigation.state.params.handleSubmit}/>
          <StopWatch
            elapsed={navigation.getParam("elapsed", navigation.getParam("hocPhan") === 3 ? TIME_B : TIME_A)}
          />
        </View>

      ),
    };
  };

  handleAnswerPress = (id, ans, truth) => {
    var tmp = this.state.db;
    this.setState({
      db: this.state.db.map(obj => {
        if (obj.id === id) {
          const rObj = obj;
          this.setState({point: this.state.point + truth - tmp[id].pre});
          rObj["pre"] = truth;
          rObj["value"] = ans;
          return rObj;
        }
        return obj;
      })
    });
  }

  handleSubmit = () => {
    if (!this.state.disable) {
      this.handleDone();
    }
  }

  handleRefresh = () => {
    this.setState({point: 0});
    this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true});
    this.setState({db: qBank[this.props.navigation.getParam("hocPhan") - 1].sort(() => 0.5 - Math.random()).slice(0, this.props.navigation.getParam("numberOfQuestion"))},
      function () {
        this.setState({
          db: this.state.db.map((obj, index) => {
            var rObj = obj;
            rObj["value"] = -1;
            rObj["id"] = index;
            rObj["pre"] = 0;
            return rObj;
          })
        });
      }
    )
    clearInterval(this.timer);
    this.setState({disable: false, elapsed: this.props.navigation.getParam("hocPhan") === 3 ? TIME_B + 1000 : TIME_A + 1000},
      function () {
        if (this.state.firstTime) this.setState({firstTime: false, elapsed: this.state.elapsed - TIMER_INTERVAL})
      }
    );
    this.timer = setInterval(() => {
      this.setState({elapsed: this.state.elapsed - TIMER_INTERVAL});
      this.props.navigation.setParams({elapsed: this.state.elapsed});
      if (this.state.elapsed === 0) {
        this.handleDone();
        Alert.alert(
          ("Hết giờ"),
          "",
          [{text: "Ok"}]
        );
      }
    }, TIMER_INTERVAL);

  }

  handleDone() {
    this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true});
    clearInterval(this.timer);
    if (!this.state.disable) {
      this.setState({disable: !this.state.disable});
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({handleRefresh: this.handleRefresh});
    this.props.navigation.setParams({handleSubmit: this.handleSubmit});
    this.handleRefresh();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.db != nextState.db || this.state.disable != nextState.disable);
  }

  render() {
    const {db} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => (
            this.state.disable && (
              <View style={styles.pointContainer}>
                <Text style={{fontSize: 17, fontWeight: "bold", color: "green"}}>Kết quả</Text>
                <Text style={{fontSize: 17}}>Bạn được: {this.state.point * 10 / this.props.navigation.getParam("numberOfQuestion")} điểm</Text>
                <Text style={{fontSize: 17}}>Số câu đúng: {this.state.point}</Text>
              </View>
            )
          )}
          ref="listRef"
          data={db}
          initialNumToRender={6}
          windowSize={6}
          renderItem={({item}) =>
            <QuestionContainer
              disable={this.state.disable}
              key={item.id}
              id={item.id + 1}
              data={item}
              extraData={item}
              answerOnPress={this.handleAnswerPress}
            />
          }
          keyExtractor={(item, index) => item + index}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
  viewTopContainer: {
    height: 35,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    paddingBottom: 5,
  },
  viewButtomContainer: {
    marginTop: 10,
    paddingRight: 20,
  },
  pointContainer: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
  }
})
