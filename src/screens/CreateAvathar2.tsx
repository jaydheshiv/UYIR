import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


const avatarTypes = [
	{
		id: 'happy',
		text: 'Pick an image that captures your happiest self 😊',
		borderColor: '#FFF19A',
		bgColor: '#D6D0FF',
		image: { uri: 'https://media.istockphoto.com/id/987669502/photo/playful-mom-and-daughter-in-the-park.jpg?s=612x612&w=0&k=20&c=F-Soyb7zePNn6djMaRmqybhkRtSa7UgPP_glAlt_jls=' }, // Example remote image
		hasImage: true,
		icon: 'pencil',
	},
	{
		id: 'calm',
		text: 'Pick an image that captures your calmest self 😌',
		borderColor: '#82FFAC',
		bgColor: '#E0E0E0',
		hasImage: false,
		icon: 'add',
	},
	{
		id: 'reflective',
		text: 'Pick an image that shows your most reflective self 😓',
		borderColor: '#80E5F7',
		bgColor: '#E0E0E0',
		hasImage: false,
		icon: 'add',
	},
	{
		id: 'intense',
		text: 'Pick an image that captures your most intense self 😠',
		borderColor: '#D34E4E',
		bgColor: '#E0E0E0',
		hasImage: false,
		icon: 'add',
	},
];

const styles = StyleSheet.create({
	root: { flex: 1, backgroundColor: '#fff' },
	scrollContent: { padding: 0, paddingBottom: 24 },
	headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 64, marginBottom: 18, paddingHorizontal: 24 },
	title: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 8, fontFamily: 'Outfit' },
	subtitle: { fontSize: 16, color: '#000', marginBottom: 4, fontFamily: 'Outfit' },
	learnMore: { color: '#8170FF', fontSize: 15, textDecorationLine: 'underline', marginTop: 2 },
	avatarList: { marginTop: 16, paddingHorizontal: 20 },
	avatarCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8170FF', borderRadius: 22, backgroundColor: '#fff', padding: 16, marginBottom: 20, borderStyle: 'solid', minHeight: 96 },
	avatarText: { fontSize: 15, color: '#000', fontWeight: '500', textAlign: 'left' },
	imageUploadButton: { width: 80, height: 80, borderWidth: 2, borderStyle: 'dashed', borderColor: '#8170FF', backgroundColor: '#EDEBFA', borderRadius: 16, justifyContent: 'center', alignItems: 'center', position: 'relative' },
	plusCircle: { position: 'absolute', bottom: 6, right: 6, width: 28, height: 28, borderRadius: 14, backgroundColor: '#8170FF', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
	avatarImage: { width: 76, height: 76, borderRadius: 14, resizeMode: 'cover' },
	editCircle: { position: 'absolute', bottom: 6, right: 6, width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#8170FF' },
	bottomButtons: { marginTop: 20, paddingHorizontal: 20, marginBottom: 4 },
	continueButton: { width: '100%', paddingVertical: 18, backgroundColor: '#8170FF', borderRadius: 35, alignItems: 'center', marginBottom: 18 },
	continueButtonText: { color: '#fff', fontSize: 18, fontWeight: '500' },
	defaultButton: { width: '100%', paddingVertical: 18, borderRadius: 35, alignItems: 'center', backgroundColor: '#fff', marginTop: -19 },
	defaultButtonText: { color: '#8170FF', fontSize: 17, fontWeight: '500' },
});

type RootStackParamList = {
	CreateAccount: undefined;
	// add other routes here if needed
};

const CreateAvathar2: React.FC = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	return (
		<View style={styles.root}>
			<View style={styles.headerRow}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 8 }}>
					<Ionicons name="chevron-back" size={20} color="#000" />
				</TouchableOpacity>
			</View>
			<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				<View style={{ marginTop: 10, marginBottom: 5, paddingHorizontal: 24 }}>
					<Text style={styles.title}>Add photos to create your avatar</Text>
					<Text style={styles.subtitle}>This improves your avatar’s expressiveness</Text>
					<TouchableOpacity>
						<Text style={styles.learnMore}>Learn more</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.avatarList}>
					{avatarTypes.map((type) => (
						<View key={type.id} style={styles.avatarCard}>
							<View style={{ flex: 1 }}>
								<Text style={styles.avatarText}>{type.text}</Text>
							</View>
							<View style={styles.imageUploadButton}>
								{type.hasImage ? (
									<>
										<Image source={type.image} style={styles.avatarImage} />
										<View style={styles.editCircle}>
											<Ionicons name="pencil" size={18} color="#8170FF" />
										</View>
									</>
								) : (
									<View style={styles.plusCircle}>
										<Ionicons name="add" size={20} color="#fff" />
									</View>
								)}
							</View>
						</View>
					))}
				</View>
				<View style={styles.bottomButtons}>
					<TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('CreateAccount')}>
						<Text style={styles.continueButtonText}>Continue</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.defaultButton}>
						<Text style={styles.defaultButtonText}>Use default avatar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

export default CreateAvathar2;
