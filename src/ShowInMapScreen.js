import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableNativeFeedback,
    Image
} from 'react-native';

import openMap from 'react-native-open-maps';

const Campus = (props) => {
    return (
        <View style={[styles.generalView, props.additionalStyle]}>
            <View>
                <Text style={styles.label}>{props.campus}</Text>
            </View>
            <TouchableNativeFeedback onPress={() => {
                openMap({
                    latitude: props.latitude,
                    longitude: props.longitude,
                });
            }}>
                <View style={[styles.button, props.buttonStyle]}>
                    <Text style={styles.buttonText}>Open in Maps</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const ShowInMapScreen = ({ navigation }) => {

    const SUNGAI_LONG = {
        name: 'Sungai Long Campus',
        latitude: 3.0402,
        longitude: 101.7944,
    }

    const KAMPAR = {
        name: 'Kampar Campus',
        latitude: 4.3364,
        longitude: 101.142,
    }

    useEffect(() => { 
        navigation.setParams({ 
            headerTitle: 'Map',
            drawerIcon: (
                <Image
                    style={{width: 30, height: 30, backgroundColor: 'transparent'}}
                    source={require('../assets/img/map_icon.png')}
                />
            ),
        });
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Campus
                campus={KAMPAR.name}
                latitude= {KAMPAR.latitude}
                longitude= {KAMPAR.longitude}
                additionalStyle={{
                    paddingBottom: 100
                }}
                buttonStyle={{
                    backgroundColor: '#E50039'
                }}
            />
            <Campus
                campus={SUNGAI_LONG.name}
                latitude= {SUNGAI_LONG.latitude}
                longitude= {SUNGAI_LONG.longitude}
                buttonStyle={{
                    backgroundColor: '#0D6786'
                }}
            />
            <StatusBar style='auto'/>
        </SafeAreaView>
    );
}

ShowInMapScreen.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('headerTitle'),
    drawerIcon: screenProps.navigation.getParam('drawerIcon'),
});

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
    },
});

export default ShowInMapScreen;