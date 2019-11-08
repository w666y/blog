import React from 'react';
import {
  AppRegistry, 
  StyleSheet,
  Text,
  View,
  Image,
  NativeEventEmitter
} from 'react-native';

import {NativeModules} from 'react-native';

const TodoList = NativeModules.TodoList;
const todoListEmitter = new NativeEventEmitter(TodoList);

// 例子：调用原生模块导出的方法
TodoList.create();
TodoList.add('起床');

// 例子：回调
TodoList.addWithCallback('吃早餐', (error, list) => {
  if (error === null) {
    console.log(`[addWithCallback] list.length == ${list.length}`);
  }
});

// 例子：事件监听
todoListEmitter.addListener('ItemAdded', list => {
  console.log(`[ItemAdded] list.length == ${list.length}`);
});
TodoList.addAndTriggerEvent('上班');

// 例子：返回Promise实例
const resolver = msg => console.log(`[addAndReturnPromise] [resolved], ${msg}`);
const rejecter = error => console.log(`[addAndReturnPromise] [rejected] ${error.message}`);
    
TodoList.addAndReturnPromise('加班', true).then(resolver).catch(rejecter);
TodoList.addAndReturnPromise('休息', false).then(resolver).catch(rejecter);

const CalendarManager = NativeModules.CalendarManager;
const calendarManagerEmitter = new NativeEventEmitter(CalendarManager);

class RNTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    };
  }
  componentDidMount() {



    // TodoList.getAll((list) => {
    //   // console.log(list.length);
    // });
    
    // CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');

    // CalendarManager.findEvents((error, msg) => {
    //   this.setState({msg});
    // });

    // // 监听事件，事件移除 略
    // calendarManagerEmitter.addListener('MyEvent', (msg) => {
    //   console.log(`[MyEvent] received: ${msg}`);
    // });

    // // 抛出事件
    // CalendarManager.triggerEvents('程序猿小卡');

    // const resolver = msg => console.log(`[resolved] ${msg}`);
    // const rejecter = error => console.log(`[rejected] ${error.message}`);
    
    // CalendarManager.getPromise(true).then(resolver).catch(rejecter);
    // CalendarManager.getPromise(false).then(resolver).catch(rejecter);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello 我是程序猿小卡.</Text>
        <Image        
          style={styles.avatar}
          source={{uri: 'https://avatars3.githubusercontent.com/u/2383346?s=460&v=4'}}
        />
        <Text>{this.state.msg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 60
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333'
  },
  avatar: {
    width: 300,
    height: 300,
    marginTop: 20
  }
});

// Module name
AppRegistry.registerComponent('RNTest', () => RNTest);