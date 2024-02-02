// iconpark图标组件
import React from 'react';

interface IconProps {
	className?: string;
	style?: React.CSSProperties;
	iconName?: string;
}

const IconPark: React.FC<IconProps> = ({ className, style, iconName }) => (
	<svg className={className} style={style} aria-hidden="true">
		<use xlinkHref={"#icon-" + iconName} />
	</svg>
);

export default IconPark;
