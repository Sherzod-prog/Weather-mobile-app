import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { formatNumber, formattedTime } from './helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Forecast({ temp, dt, humidity, wind, icon }) {
	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.text}>{formattedTime(dt)} </Text>
				<Text style={styles.text}>
					<Image
						style={styles.icon}
						source={{
							uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
						}}
					/>
					{formatNumber(temp)}°{' '}
				</Text>
				<Text style={styles.text}>
					<MaterialCommunityIcons style={styles.icon} name='weather-rainy' />{' '}
					{humidity} %{' '}
				</Text>
				<Text style={styles.text}>
					<MaterialCommunityIcons style={styles.icon} name='weather-windy' />{' '}
					{wind} m/h{' '}
				</Text>
				{/* 24 hours */}

				{/* forecast 5 day */}
				{/* <View>
					<Text></Text>
					<Text>ss</Text>
				</View> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: 'white',
		marginHorizontal: 10,
		backgroundColor: `rgba(255,255,255,0.1)`,
		borderRadius: 8,
	},
	text: {
		fontWeight: '400',
		textAlign: 'left',
		marginHorizontal: 10,
		color: 'white',
		paddingVertical: 1,
	},
	icon: {
		width: 25,
		height: 25,
	},
});
