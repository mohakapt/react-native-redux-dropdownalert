import * as React from 'react';
import { Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import info from './info.png';
import warn from './warn.png';
import error from './error.png';
import success from './success.png';
import noConnection from './noConnection.png';

const icons = {
	info,
	warn,
	error,
	success,
	noConnection,
};

const Icon = (props) => {
	const style = {};
	if (props.tintColor) {
		style.tintColor = props.tintColor;
	}

	return (
		<Image
			style={[props.style, style]}
			source={icons[props.name]} />
	);
};

Icon.propTypes = {
	name: PropTypes.oneOf(Object.keys(icons)).isRequired,
	tintColor: PropTypes.string,
	style: ViewPropTypes.style,
};

Icon.defaultProps = {};

export default Icon;
