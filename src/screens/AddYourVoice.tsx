import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddYourVoice: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Add Your Voice</Text>
        <Text style={styles.subtitle}>Add the sound of you to your twin</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[styles.button, styles.filledButton]}
          onPress={() => navigation.navigate('Record')}
        >
          <Text style={styles.buttonText}>Record Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.filledButton]}
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.buttonText}>Upload Recording</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
 
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
    paddingBottom: 32,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
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
  button: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  filledButton: {
    backgroundColor: '#8170FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  homeIndicatorContainer: {
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  homeIndicator: {
    width: 139,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 2.5,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 8,
  },
});

export default AddYourVoice;
