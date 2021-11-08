import React, { Component } from 'react';
import Login from './Login';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  StyleSheet,
  Platform,
  Image,
  View,
  Text,
} from 'react-native';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }
  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 5000);
  }
  render() {
    let Splash_Screen = (
      <View style={styles.splashScreen}>
        <View style={styles.content}>
          <Text style={styles.text1}>QR Code Scanner!</Text>
          <Icon name='qr-code-scanner' size={200} color='white'></Icon>
          <Text style={styles.text2}>Scan any code and find the result!</Text>
        </View>
      </View>)
    return (
      <>{
        (this.state.isVisible === true) ? Splash_Screen : <Login />
      }
      </>
    )
  }
}
export default App
const styles = StyleSheet.create(
  {
    splashScreen:
    {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'black'
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '50%'
    },
    text1: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white'
    },
    text2: {
      textAlign: 'center',
      fontSize: 24,
      color: 'white'
    }
  });