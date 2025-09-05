import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';



const CreateAvatar1: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDefaultAvatar = () => {
    navigation.navigate('DefaultAvatar');
  };

  const handleTakePhoto = () => {
    navigation.navigate('AddYourVoice');
  };

  const handleUploadGallery = () => {
    navigation.navigate('AddYourVoice');
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.content}>
        <Text style={styles.title}>Add a Face to Your Twin</Text>
        <Text style={styles.subtitle}>Create a reflection of you</Text>
      </View>

      <View style={styles.flexGrow} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.defaultButton} onPress={handleDefaultAvatar}>
          <Text style={styles.defaultButtonText}>Use a Default Avatar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleTakePhoto}>
          <Text style={styles.actionButtonText}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleUploadGallery}>
          <Text style={styles.actionButtonText}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
 
  content: {
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Outfit' : undefined,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 32,
    fontFamily: Platform.OS === 'ios' ? 'Outfit' : undefined,
  },
  flexGrow: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  defaultButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#8170FF',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  defaultButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8170FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CreateAvatar1;
