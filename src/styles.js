/* @flow */

import { StyleSheet, Platform, StatusBar } from 'react-native';
import { isIphoneX } from './assets/config/utilities';

export default StyleSheet.create({
	alert: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,

		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowRadius: 4,
				shadowOpacity: 0.4,
				shadowOffset: { height: 6 },
			},
			android: {
				elevation: 3,
				paddingTop: StatusBar.currentHeight,
			},
		}),
	},

	touchable: {
		paddingTop: Platform.OS === 'ios' ? (isIphoneX() ? 46 : 32) : 22,
		paddingBottom: 20,
	},

	container: {
		flexDirection: 'row',
		marginStart: 12,
	},

	noContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 0.001,
		height: 0.001,
	},

	textContainer: {
		flex: 1,
		marginStart: 12,
		marginEnd: 12,

		justifyContent: 'center',
	},

	title: {
		fontSize: 16,
		textAlign: 'left',
		fontWeight: 'bold',
		color: 'white',
	},
	message: {
		fontSize: 14,
		textAlign: 'left',
		fontWeight: 'normal',
		color: 'white',
	},
});
