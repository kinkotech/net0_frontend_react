// 左侧菜单栏的图标组件
export default function({color, iconName, size}) {
    return (
        <iconpark-icon size={size || 18} color={color} name={iconName} style={{marginRight: '.1rem'}}></iconpark-icon>
    )
}