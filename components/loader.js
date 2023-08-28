import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Loader() {
	return (
		<View style={styles.container}>
			<Text>Loader...</Text>
		</View>
		// <AnimatedLoader
		// 	visible={true}
		// 	overlayColor='#FDF6AA'
		// 	source={require('../assets/loader.json')}
		// 	animationStyle={styles.lottie}
		// 	speed={2}
		// ></AnimatedLoader>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
