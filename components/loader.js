import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default function Loader() {
	return (
		<View style={styles.container}>
			<Text>Loader...</Text>
			<AnimatedLoader
				visible={true}
				overlayColor='#FDF6AA'
				source={require('../assets/loader.json')}
				animationStyle={styles.lottie}
				speed={1}
			></AnimatedLoader>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
