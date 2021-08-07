import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image
} from 'react-native';

const LoginScreen = ({ navigation }) => {

    const USERNAME_KEY = 'username';
    const PASSWORD_KEY = 'password';

    const CORRECT_USERNAME = 'utar';
    const CORRECT_PASSWORD = '1234';

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [inputInvalid, setInputInvalid] = useState(false);

    const userNameInput = useRef(TextInput);
    const passwordInput = useRef(TextInput);
    const loginButton = useRef(TouchableOpacity);

    useEffect(() => { 
        navigation.setParams({ 
            headerTitle: 'Login',
            drawerIcon: (
                <Image
                    style={{width: 30, height: 30, backgroundColor: 'transparent'}}
                    source={require('../assets/img/login_icon.png')}
                />
            ),
        });

        // if both key exists, it will set the userName and password, hence will be displayed at the TextInput
        AsyncStorage.multiGet([USERNAME_KEY, PASSWORD_KEY]).then(response => {
            setUserName(response[0][1])
            setPassword(response[1][1])
        });

    }, [])

    const loginButtonPressed = () => {
        const infoCorrect = userName === CORRECT_USERNAME && password === CORRECT_PASSWORD;
        if (infoCorrect) {
            AsyncStorage.multiSet([
                [USERNAME_KEY, userName],
                [PASSWORD_KEY, password]
            ]);
            alert(`Welcome ${userName}`);
            setInputInvalid(false);
        } else {
            alert(`Invalid username/password`);
            setInputInvalid(true);
        }
    }

    const showInputInvalidText = () => {
        if (inputInvalid) {
            return (
                <View style={styles.inputInvalid}>
                    <Text style={styles.inputInvalidText}>Invalid username/password</Text>
                    <Text style={styles.inputInvalidText}>Please try again</Text>
                </View>
            )
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.generalView}><Text style={styles.title}>Welcome</Text></View>
                    <View style={[styles.generalView, styles.inputView]}>
                        <TextInput
                            value={userName}
                            ref={userNameInput}
                            style={styles.inputBox}
                            placeholder='Username'
                            onChangeText={setUserName}
                            onSubmitEditing={() => passwordInput.current.focus()}
                        />
                        <TextInput
                            value={password}
                            ref={passwordInput}
                            secureTextEntry={true}
                            style={styles.inputBox}
                            placeholder='Password'
                            onChangeText={setPassword}
                            onSubmitEditing={() => loginButton.current.focus()}
                        />
                        <View style={styles.generalView}>{showInputInvalidText()}</View>
                    </View>
                    <View style={[styles.generalView]}> 
                        <TouchableOpacity
                            ref={loginButton}
                            style={styles.button}
                            onPress={loginButtonPressed}
                        >
                            <Text style={styles.text}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: 'crimson'}]} onPress={() => {
                            AsyncStorage.multiRemove([USERNAME_KEY, PASSWORD_KEY]);
                        }}>
                            <Text style={styles.text}>Clear Cache</Text> 
                        </TouchableOpacity>
                    </View>
            </View>
            <StatusBar style='auto'/>
        </KeyboardAvoidingView>
    );
};

LoginScreen.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('headerTitle'),
    drawerIcon: screenProps.navigation.getParam('drawerIcon'),
});

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        paddingBottom: 10,
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
    title: {
        color: '#2196F3',
        fontSize: 30,
        paddingBottom: 10,
    },
    inputBox: {
        borderColor: '#121212',
        width: '80%',
        color: '#000',
        borderWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
        fontSize: 17,
    },
    inputView: {
        paddingBottom: 40,
    },
    inputInvalid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#059862',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
    },
    text: {
        color: '#FFFFFFE3',
        fontSize: 17,
    }
});


export default LoginScreen;