/* @flow */

import * as React from 'react';
import { COLOR_ACCENT } from './colors';

const svgs = {
};

type Props = {
	name: $Keys<typeof svgs>,
	tintColor?: string,

	opacity?: number | string,
	width?: number | string,
	height?: number | string,

	viewBox?: string,
	preserveAspectRatio?: string,
}

const Icon = (props: Props) => {
	const Target = svgs[props.name];
	return <Target {...props} />;
};

Icon.defaultProps = {
	tintColor: COLOR_ACCENT,
};

export default Icon;

export const hasIcon = (name: string): boolean => name in svgs;
