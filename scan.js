import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import Login from './Login';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            scanResult: false,
            result: null,
            back: false
        };
    }
    onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            scanResult: true
        })
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                scanResult: true
            })
        }
    }
    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, scanResult: false })
    }
    render() {
        const { scan, scanResult, result } = this.state
        return (
            this.state.back ? <Login /> :
                <View style={styles.scrollViewStyle}>
                    <Fragment>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => { this.setState({ back: true }) }}>
                                <Icon name='arrow-back-ios' size={30} color='white'></Icon>
                            </TouchableOpacity>
                            <Text style={styles.textTitle}>         QR Code Scanner !</Text>
                        </View>
                        {!scan && !scanResult &&
                            <View style={styles.cardView} >
                                <Icon name='qr-code-scanner' size={100} color='black'></Icon>
                                <Text numberOfLines={8} style={styles.descText}>Click the below button to scan the QR Code</Text>
                                <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Icon name='camera-alt' size={30} color='black'></Icon>
                                        <Text style={{ ...styles.buttonTextStyle, color: 'black' }}>  Scan QR Code</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {scanResult &&
                            <Fragment>
                                <Text style={styles.textTitle1}>Result!</Text>
                                <View style={scanResult ? styles.scanCardView : styles.cardView}>
                                    <Text style={styles.result1}><Text style={styles.result}>Type: {'\n'}</Text>{result.type}</Text>
                                    <Text style={styles.result1}><Text style={styles.result}>Result: {'\n'}</Text>{result.data}</Text>
                                    <Text style={styles.result1}><Text style={styles.result} numberOfLines={8}>RawData: {'\n'}</Text>{result.rawData}</Text>
                                    <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan1}>
                                        <View style={styles.buttonWrapper}>
                                            <Icon name='camera-alt' size={30} color='black'></Icon>
                                            <Text style={{ ...styles.buttonTextStyle, color: 'black' }}>  Click to scan again</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Fragment>
                        }
                        {scan &&
                            <QRCodeScanner
                                reactivate={true}
                                showMarker={true}
                                ref={(node) => { this.scanner = node }}
                                onRead={this.onSuccess}
                                topContent={
                                    <Text style={styles.centerText}>
                                        Move your camera over the QR Code!
                                    </Text>
                                }
                            />
                        }
                    </Fragment>
                </View>
        );
    }
}
export default Scanner;