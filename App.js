import { Alert } from 'react-native';
import Loader from './components/loader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Weather from './components/weather';
import * as Location from 'expo-location';

const API_KEY = 'b8f32b25fd23ce84f2da5e78971d7981';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [location, setLocation] = useState(null);

	const getWeather = async (latitude, longitude) => {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
		);
		setLocation(data);
		setIsLoading(false);
	};
	const setWeather = async query => {
		setIsLoading(true);
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
		);
		setLocation(data);
		setIsLoading(false);
	};

	const getLocation = async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Permission to access location was denied');
				return;
			}
			const {
				coords: { latitude, longitude },
			} = await Location.getCurrentPositionAsync({});

			getWeather(latitude, longitude);
		} catch (error) {
			Alert.alert('I can not find you location');
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<Weather
			setWeather={setWeather}
			temp={Math.round(location.main.temp)}
			name={location.name}
			condition={location.weather[0].main}
		/>
	);
}
