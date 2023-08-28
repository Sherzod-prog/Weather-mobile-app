import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	TextInput,
	Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
//==
export default function Weather({ temp, name, condition, setWeather }) {
	const [query, setQuery] = useState('');

	return (
		<LinearGradient
			style={styles.container}
			colors={weatherOptions[condition].gradient}
		>
			<StatusBar barStyle='light-content' />
			<View style={styles.viewContainer}>
				<MaterialCommunityIcons
					name={weatherOptions[condition].iconName}
					size={96}
					color='white'
				/>

				<View style={styles.flex}>
					<Text style={styles.temp}>{temp} ° </Text>
					<Text style={styles.temp}> {name}</Text>
				</View>
			</View>
			<View style={{ ...styles.container, ...styles.textContainer }}>
				<Text style={styles.title}>{weatherOptions[condition].title}</Text>
				<Text style={styles.description}>
					{weatherOptions[condition].description}
				</Text>
				<View style={styles.searchContainer}>
					<TextInput
						placeholder='City'
						style={styles.input}
						value={query}
						onChangeText={text => setQuery(text)}
					/>
					<Button
						title='Search'
						style={styles.btn}
						color='#9ce5f7'
						onPress={() => setWeather(query)}
					/>
				</View>
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
	temp: {
		fontSize: 38,
		color: 'white',
	},
	flex: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textContainer: {
		flex: 1,
		paddingHorizontal: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
		margin: 10,
	},
	title: {
		fontSize: 40,
		color: 'white',
		fontWeight: '400',
		textAlign: 'left',
		marginBottom: 10,
	},
	description: {
		fontSize: 20,
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
	input: { width: '65%' },
	btn: { width: '33%' },
});
