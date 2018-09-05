import * as React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import timer from 'react-native-timer';

import {
	COLOR_INFO,
	COLOR_WARNING,
	COLOR_ERROR,
	COLOR_SUCCESS,
	COLOR_CUSTOM,
	COLOR_NO_CONNECTION,
} from './assets/colors';
import { darkenColor } from './assets/utilities';
import Icon from './assets/icons';

import styles from './styles';

// export type AlertType = 'info' | 'error' | 'warn' | 'success' | 'noConnection';

// type Props = {
// 	type: AlertType,
//
// 	title: string,
// 	titleStyle? : any,
// 	titleNumOfLines? : number,
//
// 	message? : string,
// 	messageStyle? : any,
// 	messageNumOfLines? : number,
//
// 	visible? : boolean,
// 	duration? : ? number,
//
// 	statusBarColor: string,
// 	onDismiss? : () => void | false,
// };

class DropdownAlert extends React.Component {
	static propTypes = {
		alertType: PropTypes.oneOf(['', 'info', 'error', 'warn', 'success', 'noConnection']),
	};

	static defaultProps = {
		type: 'info',

		titleNumOfLines: 1,
		messageNumOfLines: 3,

		statusBarColor: COLOR_CUSTOM,
	};

	componentDidUpdate(prevProps: Props) {
		if (prevProps.visible) {
			timer.clearInterval(this);
		}

		if (this.props.visible && this.props.duration !== 0) {
			const duration = this.getAlertDuration();

			timer.setInterval(this, 'dismissMsg', this.onTouchablePress.bind(this), duration);
		}
	}

	componentWillUnmount() {
		timer.clearInterval(this);
	}

	updateStatusBar(onScreen: boolean) {
		if (Platform.OS === 'ios') {
			const style = onScreen ? 'light-content' : 'default';
			StatusBar.setBarStyle(style, true);
		} else {
			const color = onScreen ? darkenColor(this.getAlertColor(), 25) : this.props.statusBarColor;
			StatusBar.setBackgroundColor(color, true);
		}
	}

	onTouchablePress() {
		timer.clearInterval(this);
		this.updateStatusBar(false);

		this.refs.root.fadeOutUp(400).then(() => {
			const { onDismiss } = this.props;
			if (onDismiss) {
				onDismiss();
			}
		});
	}

	getAlertColor(): string {
		switch (this.props.type) {
			case 'info':
			default:
				return COLOR_INFO;
			case 'error':
				return COLOR_ERROR;
			case 'warn':
				return COLOR_WARNING;
			case 'success':
				return COLOR_SUCCESS;
			case 'noConnection':
				return COLOR_NO_CONNECTION;
		}
	}

	getAlertDuration(): number {
		const { type, duration } = this.props;

		if (duration && duration !== 0) {
			return duration;
		}

		switch (type) {
			case 'info':
			default:
				return 1800;
			case 'error':
				return 4200;
			case 'warn':
				return 3000;
			case 'success':
				return 3800;
			case 'noConnection':
				return 1400;
		}
	}

	render() {
		if (!this.props.visible) {
			return <View style={styles.noContainer} />;
		}

		const { title, message, titleNumOfLines, messageNumOfLines } = this.props;

		const getIcon = (): React.Node => {
			const type = this.props.type;
			return <Icon name={type} tintColor='white' />;
		};

		const getTitle = (): React.Node => {
			if (title) {
				return <Text style={styles.title} numberOfLines={titleNumOfLines}>{title}</Text>;
			}
		};

		const getMessage = (): React.Node => {
			if (message) {
				return <Text style={styles.message} numberOfLines={messageNumOfLines}>{message}</Text>;
			}
		};

		const getAlertStyle = (): any => {
			const alertColor = this.getAlertColor();
			return [styles.alert, { backgroundColor: alertColor }];
		};

		const getAnimationEasing = (): string => {
			switch (this.props.type) {
				case 'info':
					return 'ease-out-expo';
				case 'error':
				case 'noConnection':
					return 'ease-in-out-quart';
				case 'warn':
					return 'ease-out-cubic';
				case 'success':
					return 'ease-in-out-back';
				default:
					return 'ease-in-out';
			}
		};

		this.updateStatusBar(true);

		return (
			<Animatable.View
				ref='root'
				style={getAlertStyle()}
				animation='fadeInDown'
				duration={400}
				easing={getAnimationEasing()}
				useNativeDriver
			>
				<TouchableOpacity style={styles.touchable} onPress={this.onTouchablePress.bind(this)}>
					<View style={styles.container}>
						{getIcon()}
						<View style={styles.textContainer}>
							{getTitle()}
							{getMessage()}
						</View>
					</View>
				</TouchableOpacity>
			</Animatable.View>
		);
	}
}

export default DropdownAlert;
