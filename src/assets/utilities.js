import { Dimensions, Platform } from 'react-native';

export function isIphoneX() {
	const dimen = Dimensions.get('window');

	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTVOS &&
		(dimen.height === 812 || dimen.width === 812)
	);
}

function shadeColor(color, percent) {
	let usePound = false;
	let col = color;

	if (col[0] === '#') {
		col = col.slice(1);
		usePound = true;
	}

	const num = parseInt(col, 16);

	let r = (num >> 16) + percent;
	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	let b = ((num >> 8) & 0x00FF) + percent;
	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	let g = (num & 0x0000FF) + percent;
	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export function lightenColor(color, percent) {
	return shadeColor(color, percent);
}

export function darkenColor(color, percent) {
	return shadeColor(color, -percent);
}
