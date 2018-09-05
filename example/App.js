/* @flow */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, View } from 'react-native';
import { COLOR_ACCENT, COLOR_ACCENT_DARK } from './assets/colors';

type Props = {};

type State = {};

export default class App extends Component<Props, State> {
	static navigationOptions = {
		title: 'Profile',
		...Platform.select({
			android: {
				headerStyle: {
					backgroundColor: COLOR_ACCENT,
				},
				headerTintColor: 'white',
			},
		}),
	};

	constructor(props) {
		super(props);

		this.state = { selectedBook: 0 };
	}

	componentWillMount() {
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor(COLOR_ACCENT_DARK);
		}
	}

	render() {
		return (
			<View style={styles.container} />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fbfbfb',
	},
});
