import React, { Component } from 'react'
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    TextInput
} from 'react-native'
import firebase from 'react-native-firebase';
import Scanner from './scan';

firebase.initializeApp({
    apiKey: "AIzaSyCw6oUgHoryEFmJX44TN3GGAXHiLHBPAE0",
    appId: "1:1086055633826:android:de03ae43d9030ce05758fb",
    authDomain: "scanner-f36ca.firebaseapp.com",
    databaseURL: "https://scanner-f36ca.firebaseio.com",
    projectId: "scanner-f36ca",
    storageBucket: "scanner-f36ca.appspot.com",
    messagingSenderId: "1086055633826"
})

class Login extends Component {
    state = {
        phone: '',
        confirmResult: null,
        verificationCode: '',
        userId: '',
        scanner: false
    }
    validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(this.state.phone)
    }
    handleSendCode = () => {
        // Request to send OTP
        if(this.state.phone === '+91 9398829902'){
            if (this.validatePhoneNumber()) {
                firebase
                    .auth()
                    .signInWithPhoneNumber(this.state.phone)
                    .then(confirmResult => {
                        this.setState({ confirmResult })
                    })
                    .catch(error => {
                        alert(error.message)
                        console.log(error)
                    })
            }
        }else{
            alert('Something went wrong! Try again with different number')
        }
    }
    changePhoneNumber = () => {
        this.setState({ confirmResult: null, verificationCode: '' })
    }
    handleVerifyCode = () => {
        // Request for OTP verification
        const { confirmResult, verificationCode } = this.state
        if (verificationCode.length == 6) {
            confirmResult
                .confirm(verificationCode)
                .then(user => {
                    this.setState({
                        userId: user.uid,
                        scanner: true
                    })
                    alert(`Successfully logged in!`)
                })
                .catch(error => {
                    alert(error.message)
                    console.log(error)
                })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }
    renderConfirmationCodeView = () => {
        return (
            <View style={styles.verificationView}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Verification code'
                    placeholderTextColor='white'
                    value={this.state.verificationCode}
                    keyboardType='numeric'
                    onChangeText={verificationCode => {
                        this.setState({ verificationCode })
                    }}
                    maxLength={6}
                />
                <TouchableOpacity
                    style={[styles.themeButton, { marginTop: 20 }]}
                    onPress={this.handleVerifyCode}>
                    <Text style={styles.themeButtonTitle}>Verify Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
    // ... rest of the code
    render() {
        return (
            this.state.scanner ? <Scanner /> :
                <SafeAreaView style={[styles.container, { backgroundColor: 'black' }]}>
                    <View style={styles.page}>
                        <Text style={styles.login}>LOGIN</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter phone number with country code'
                            placeholderTextColor='white'
                            keyboardType='phone-pad'
                            value={this.state.phone}
                            onChangeText={phone => {
                                this.setState({ phone })
                            }}
                            maxLength={15}
                            editable={this.state.confirmResult ? false : true}
                        />
                        <TouchableOpacity
                            style={[styles.themeButton, { marginTop: 20 }]}
                            onPress={
                                this.state.confirmResult
                                    ? this.changePhoneNumber
                                    : this.handleSendCode
                            }>
                            <Text style={styles.themeButtonTitle}>
                                {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
                            </Text>
                        </TouchableOpacity>
                        {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
                    </View>
                </SafeAreaView>
        )
    }
}
export default Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        marginTop: 20,
        width: '90%',
        height: 40,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10,
        color: 'white',
        fontSize: 18
    },
    themeButton: {
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5
    },
    themeButtonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    verificationView: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50
    },
    login: {
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'white'
    }
})