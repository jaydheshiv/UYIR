import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen1'>;

const OnboardingScreen1: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();

	return (
			<SafeAreaView style={styles.container}>
				{/* Logo at the top */}
				<View style={styles.logoContainer}>
					<Image
						source={require('../assets/uyir-logo.png')}
						style={styles.logo}
						resizeMode="contain"
					/>
				</View>
				{/* Main Content */}
				<View style={styles.content}>
					{/* Buttons */}
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.outlinedButton]}
							onPress={() => navigation.navigate('LoginFlow')}
						>
							<Text style={[styles.buttonText, styles.outlinedButtonText]}>Log in</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.filledButton]}
							onPress={() => navigation.navigate('SignupFlow')}
						>
							<Text style={styles.buttonText}>Sign Up</Text>
						</TouchableOpacity>
					</View>

					{/* Continue as Guest */}
					<TouchableOpacity style={styles.guestButton} onPress={() => {}}>
						<Text style={styles.guestButtonText}>Continue as Guest</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignSelf: 'center',
		width: '100%',
		maxWidth: 393,
	},
	logoContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 224,
		height: 76,
	},
	content: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingBottom: 48,
	},
	buttonContainer: {
		width: '100%',
		maxWidth: 345,
		marginBottom: 0,
	},
	button: {
		height: 48,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},
	outlinedButton: {
		borderWidth: 1,
		borderColor: '#8170FF',
		backgroundColor: 'transparent',
	},
	outlinedButtonText: {
		color: '#8170FF',
	},
	filledButton: {
		backgroundColor: '#8170FF',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '500',
	},
	guestButton: {
		marginTop: 32,
		marginBottom: 32,
		backgroundColor: 'transparent',
	},
	guestButtonText: {
		color: '#8170FF',
		fontSize: 16,
		fontWeight: '500',
		textDecorationLine: 'underline',
	},
});

export default OnboardingScreen1;
