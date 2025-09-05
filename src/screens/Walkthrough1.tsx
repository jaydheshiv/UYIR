import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BACKGROUND_IMAGE = { uri: 'https://api.builder.io/api/v1/image/assets/TEMP/25f46823c2b28165d6694296e3c1191877649205?width=786' };

type RootStackParamList = {
	Splash: undefined;
	Walkthrough1: undefined;
	Walkthrough2: undefined;
	Walkthrough3: undefined;
	OnboardingScreen1: undefined;
	Login: undefined;
	SignUp: undefined;
	Home: undefined;
	BasicDetails: undefined;
	GuardianConsent: undefined;
};

type Walkthrough1ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Walkthrough1'>;

const Walkthrough1 = () => {
	const navigation = useNavigation<Walkthrough1ScreenNavigationProp>();

	// Helper function for active dot (for demonstration, set the active index as needed)
	const isActive = (index: number) => index === 0;

	return (
		<ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
			{/* Overlay */}
			<View style={styles.overlay} />

			{/* Skip Button */}
			<TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('OnboardingScreen1')}>
				<Text style={styles.skipText}>Skip</Text>
			</TouchableOpacity>

			{/* Floating Icons */}
			<View style={styles.floatingIcons}>
				<View style={[styles.iconCircle, styles.icon1]}>
					<Feather name="message-circle" size={28} color="#fff" />
				</View>
				<View style={[styles.iconCircle, styles.icon2]}>
					<FontAwesome name="circle" size={20} color="#fff" />
				</View>
				<View style={[styles.iconCircle, styles.icon3]}>
					<FontAwesome name="circle" size={24} color="#fff" />
				</View>
				<View style={[styles.iconCircle, styles.icon4]}>
					<Feather name="user" size={32} color="#fff" />
				</View>
				<View style={[styles.iconCircle, styles.icon5]}>
					<Feather name="file-text" size={28} color="#fff" />
				</View>
			</View>

			{/* Main Content */}
			<View style={styles.content}>
				<Text style={styles.title}>Welcome to Uyir</Text>
				<Text style={styles.subtitle}>
					Start your journey of memories and emotions, a safe space to reflect, grow, and stay connected.
				</Text>

				{/* Page Indicator */}
				<View style={styles.pageIndicatorRow}>
					<View style={styles.pageIndicator}>
						<View style={[styles.pageDot, !isActive(0) && styles.pageDotInactive]} />
						<View style={[styles.pageDot, isActive(1) ? null : styles.pageDotInactive]} />
						<View style={[styles.pageDot, !isActive(2) && styles.pageDotInactive]} />
					</View>
				</View>

				{/* Continue Button */}
				<TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Walkthrough2')}>
					<Text style={styles.continueButtonText}>Continue</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: { flex: 1, justifyContent: 'flex-end' },
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	skipButton: {
		position: 'absolute',
		top: 64,
		right: 24,
		zIndex: 20,
	},
	skipText: {
		color: '#fff',
		fontSize: 15,
		fontWeight: '500',
		opacity: 0.9,
	},
	floatingIcons: {
		...StyleSheet.absoluteFillObject,
		zIndex: 5,
	},
	iconCircle: {
		position: 'absolute',
		backgroundColor: 'rgba(129,112,255,0.5)',
		borderRadius: 999,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon1: { top: '25%', left: '15%', width: 64, height: 64 },
	icon2: { top: '40%', left: '8%', width: 48, height: 48, backgroundColor: 'rgba(129,112,255,0.4)' },
	icon3: { top: '20%', right: '20%', width: 56, height: 56, backgroundColor: 'rgba(129,112,255,0.3)' },
	icon4: { top: '30%', right: '10%', width: 72, height: 72, backgroundColor: 'rgba(129,112,255,0.6)' },
	icon5: { top: '55%', right: '15%', width: 64, height: 64, backgroundColor: 'rgba(129,112,255,0.4)' },
	content: {
		paddingHorizontal: 24,
		paddingBottom: 32,
		zIndex: 20,
	},
	title: {
		color: '#fff',
		fontSize: 28,
		fontWeight: '700',
		marginBottom: 12,
	},
	subtitle: {
		color: '#fff',
		fontSize: 16,
		opacity: 0.9,
		marginBottom: 24,
	},
	pageIndicatorRow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 16,
	},
	pageIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	pageDot: {
		width: 18,
		height: 5,
		borderRadius: 3,
		backgroundColor: '#fff',
		marginHorizontal: 2,
	},
	pageDotInactive: {
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
	continueButton: {
		backgroundColor: '#8170FF',
		borderRadius: 24,
		paddingVertical: 14,
		alignItems: 'center',
		marginBottom: 16,
		shadowColor: '#8170FF',
		shadowOpacity: 0.2,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 2 },
	},
	continueButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default Walkthrough1;
