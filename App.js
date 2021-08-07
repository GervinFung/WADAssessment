import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';

// I structured the following files into 'src' folder so it's easier to handle for me
import LoginScreen from './src/LoginScreen';
import ShowInMapScreen from './src/ShowInMapScreen';

const App = (props) => {

	const style = StyleSheet.create({
		view: {
			flex: 1,
			flexDirection: 'row',
			backgroundColor: '#121212',
		},
		logo: {
			margin: 10,
			width: 100,
			height: 50,
		},
		text: {
			fontSize: 20,
			alignItems: 'center',
			margin: 10,
			color: '#FFF',
		}
	});

	return (
		<ScrollView>
			<View style={style.view}>
				<Image style={style.logo} source={require('./assets/img/utar-logo.png')}/>
				<Text style={style.text}>{'Universiti Tunku\nAbdul Rahman'}</Text>
			</View>
			<SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
				<DrawerItems {...props} />
			</SafeAreaView>
		</ScrollView>
	);
};

const navigatorProps = {
	drawerWidth: 300,
	drawerPosition: 'left',
	useNativeAnimations: true,
	drawerBackgroundColor: '#FEFEFE',
	initialRouteName: 'Login',
	order: ['Login', 'Map'],
	backBehavior: 'initialRoute',
	contentComponent: App,
	contentOptions: {
		labelStyle: {
			fontSize: 20,
		},
	},
};

const navigator = createDrawerNavigator({
	Login: {
		screen: LoginScreen,
	},
	Map: {
		screen: ShowInMapScreen,
	}
}, navigatorProps);

export default createAppContainer(navigator);