import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Forecast from './forecast';
import axios from 'axios';
import { FlatList } from 'react-native';
import { formattedTime } from './helpers';

const API_KEY = 'b8f32b25fd23ce84f2da5e78971d7981';

const weatherOptions = {
	Clear: {
		iconName: 'weather-sunny',
		gradient: ['#56CCF2', '#2F80ED'],
		title: 'Amazing weather',
		description: 'Go for a walk, stop staying at home!',
	},
	Thunderstorm: {
		iconName: 'weather-lightning',
		gradient: ['#141E30', '#243B55'],
		title: 'Sit at home',
		description: "Do you see what's on the street?",
	},
	Drizzle: {
		iconName: 'weather-rainy',
		gradient: ['#3a7bd5', '#3a6073'],
		title: 'Take an umbrella',
		description: 'Perhaps the rain will increase soon',
	},
	Rain: {
		iconName: 'weather-pouring',
		gradient: ['#000046', '#1CB5E0'],
		title: "It's raining outside",
		description: 'So there will be a rainbow soon!',
	},
	Snow: {
		iconName: 'snowflake',
		gradient: ['#83a4d4', '#b6fbff'],
		title: "There's a snow outside!",
		description: 'Dress warmly, make snowmen',
	},
	Dust: {
		iconName: 'weather-windy-variant',
		gradient: ['#B79891', '#94716B'],
		title: 'Dusty',
		description: 'Better close the windows',
	},
	Smoke: {
		iconName: 'weather-windy',
		gradient: ['#56CCF2', '#2F80ED'],
		title: 'On the street smog :(',
		description: 'I do not advise going out unnecessarily',
	},
	Haze: {
		iconName: 'weather-hazy',
		gradient: ['#3E5151', '#DECBA4'],
		title: "There's a snow outside!",
		description: 'Dress warmly, make snowmen',
	},
	Mist: {
		iconName: 'weather-fog',
		gradient: ['#606c88', '#3f4c6b'],
		title: "You can't see a damn thing in the fog",
		description: "Do you see what's on the street?",
	},
	Clouds: {
		iconName: 'weather-cloudy',
		gradient: ['#757F9A', '#D7DDE8'],
		title: 'The clouds',
		description: 'Go for a walk, stop staying at home!',
	},
};

export default function Weather({ temp, name, condition, location }) {
	const [forecast, setForecast] = useState(null);

	const getForecast = async text => {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=${API_KEY}&units=metric`
		);
		setForecast(data.list.slice(0, 8));
	};
	useEffect(() => {
		getForecast(name);
	}, []);

	const pressure = location.main.pressure; //bosim
	const humidity = location.main.humidity; // namlik
	const update = location.dt;
	const sunrise = location.sys.sunrise;
	const sunset = location.sys.sunset;
	const wind = location.wind; // speed va deg bor

	return (
		<LinearGradient
			style={styles.container}
			colors={weatherOptions[condition].gradient}
		>
			<StatusBar style='auto' />
			<Text style={styles.update}>Last update: {formattedTime(update)}</Text>
			<View style={styles.viewContainer}>
				<MaterialCommunityIcons
					name={weatherOptions[condition].iconName}
					size={96}
					color='white'
				/>

				<View style={styles.flex}>
					<Text style={styles.temp}>{temp}° </Text>
					<Text style={styles.temp}> {name}</Text>
				</View>
			</View>
			<View style={styles.content}>
				<View style={styles.contentSun}>
					<View>
						<MaterialCommunityIcons
							name='weather-sunset-up'
							style={styles.icon}
						/>
						<Text style={styles.info}>{formattedTime(sunrise)}</Text>
					</View>
					<View>
						<MaterialCommunityIcons
							name='weather-sunset-down'
							style={styles.icon}
						/>
						<Text style={styles.info}>{formattedTime(sunset)}</Text>
					</View>
				</View>
				<View style={styles.contentInfo}>
					<View>
						<MaterialCommunityIcons
							style={styles.icon}
							name='weather-windy-variant'
						/>
						<Text style={styles.info}>{pressure} mb</Text>
					</View>
					<View>
						<MaterialCommunityIcons style={styles.icon} name='air-humidifier' />
						<Text style={styles.info}>{humidity}%</Text>
					</View>
					<View>
						<MaterialCommunityIcons style={styles.icon} name='weather-windy' />
						<Text style={styles.info}> {wind.speed} m/h</Text>
					</View>
				</View>
			</View>
			<View>
				<View>
					<FlatList
						data={forecast}
						renderItem={({ item }) => (
							<Forecast
								temp={item.main.temp}
								icon={item.weather[0].icon}
								dt={item.dt}
								wind={item.wind.speed}
								humidity={item.main.humidity}
							/>
						)}
					/>
				</View>
			</View>

			<View style={{ ...styles.container, ...styles.textContainer }}>
				<Text style={styles.title}>{weatherOptions[condition].title}</Text>
				<Text style={styles.description}>
					{weatherOptions[condition].description}
				</Text>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		margin: 10,
		borderRadius: 20,
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowRadius: 30,
	},
	contentInfo: {
		flexDirection: 'row',
		textAlign: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 40,
		paddingVertical: 5,
		margin: 5,
	},
	temp: {
		fontSize: 30,
		color: 'white',
	},
	update: {
		fontSize: 14,
		opacity: 0.5,
		textAlign: 'right',
		paddingTop: 40,
		color: 'white',
		paddingRight: 20,
	},
	flex: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textContainer: {
		flex: 1,
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
		margin: 10,
	},
	title: {
		fontSize: 20,
		color: 'white',
		fontWeight: '400',
		textAlign: 'left',
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		color: 'white',
		textAlign: 'left',
		fontWeight: '600',
	},
	searchContainer: {
		backgroundColor: '#e8e8e8',
		width: '100%',
		padding: 10,
		marginTop: 10,
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
	},
	info: {
		color: 'white',
		fontSize: 14,
		marginHorizontal: 10,
	},
	icon: {
		textAlign: 'center',
		color: 'white',
		fontSize: 30,
		marginHorizontal: 10,
	},
	contentSun: {
		flexDirection: 'row',
		textAlign: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	forecast: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		// flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10,
	},
});
