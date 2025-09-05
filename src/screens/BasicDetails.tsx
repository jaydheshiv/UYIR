import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Platform, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Make sure the file exists at the specified path, or update the path if necessary
import BasicDetailsForm from '../components/BasicDetailsForm';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const BasicDetails: React.FC = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			{/* Back Button */}
			<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
				<Ionicons name="chevron-back" size={24} color="#000" />
			</TouchableOpacity>

			{/* Mobile Layout */}
			{!isTablet && (
				<View style={styles.mobileLayout}>
					{/* Form */}
					<BasicDetailsForm />
				</View>
			)}

			{/* Tablet and Desktop Layout */}
			{isTablet && (
				<View style={styles.tabletLayout}>
					<View style={styles.formCard}>
						{/* Form */}
						<BasicDetailsForm />
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	backButton: {
		position: 'absolute',
		top: 60,
		left: 24,
		zIndex: 10,
		backgroundColor: 'transparent',
		padding: 8,
	},
	mobileLayout: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingTop: 100, // Only push content down, do not change left/right
		// Do not add or change paddingHorizontal here
	},
	tabletLayout: {
		flex: 1,
		backgroundColor: '#f8f9fa',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100%',
		paddingTop: 100, // Only push content down
	},
	formCard: {
		width: '100%',
		maxWidth: 400,
		backgroundColor: '#fff',
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.15,
		shadowRadius: 16,
		elevation: 8,
		overflow: 'hidden',
		padding: 24,
	},
	continueButton: {
		position: 'absolute',
		left: 16,
		right: 16,
		bottom: Platform.OS === 'ios' ? 4 : 2, // Lower value brings button closer to the bottom
		height: 48,
		backgroundColor: '#8170FF',
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	continueButtonText: {
		color: '#7B818A', // gray text as in your image
		fontSize: 16,
		fontWeight: '500',
	},
});

export default BasicDetails;
