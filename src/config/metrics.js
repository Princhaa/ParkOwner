import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const primaryColor = 'rgb(53, 73, 93)'
const primaryColorDark = 'rgb(35, 55, 75)'
const secondaryColor = 'rgb(240, 156, 43)'
const greyWhite = 'rgb(233, 233, 239)'

export default {
	DEVICE_WIDTH: width,
	DEVICE_HEIGHT: height,
	PRIMARY_COLOR: primaryColor,
	PRIMARY_COLOR_DARK: primaryColorDark,
	SECONDARY_COLOR: secondaryColor,
	GREY_WHITE: greyWhite
}