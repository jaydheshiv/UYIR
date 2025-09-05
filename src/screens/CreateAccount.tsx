import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  AccountGranted: undefined;
  // ...other screens if needed
};
const CreateAccount: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('Ravi');
  const [preferredName, setPreferredName] = useState('');
  const insets = useSafeAreaInsets();

  return (
  <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Back Button */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Give Your Twin a Name</Text>
        <Text style={styles.subtitle}>This is how your twin will introduce themselves to you.</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ravi"
          placeholderTextColor="#BDBDBD"
        />
        <Text style={styles.label}>Preferred Name</Text>
        <TextInput
          style={styles.input}
          value={preferredName}
          onChangeText={setPreferredName}
          placeholder=""
          placeholderTextColor="#BDBDBD"
        />
      </ScrollView>
      {/* Bottom fixed buttons */}
      <View style={[styles.bottomButtonsContainer, { paddingBottom: 24 + insets.bottom }]}> 
        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('AccountGranted')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('AccountGranted')}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
    backgroundColor: '#fff',
  },
  statusTime: { fontSize: 17, fontWeight: '600', color: '#000' },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  signalBars: { flexDirection: 'row', alignItems: 'flex-end', marginRight: 8 },
  signalBar: {
    width: 4,
    backgroundColor: '#000',
    borderRadius: 2,
    marginRight: 2,
  },
  backButton: {
    position: 'absolute',
    top: -5,      // Adjust this value to move the arrow up/down
    left: -8,      // Adjust this value to move the arrow left/right
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 0,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    marginTop: -15, // Increase this value for more space above the title
    fontFamily: Platform.OS === 'ios' ? 'Outfit' : undefined,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 32,
    fontFamily: Platform.OS === 'ios' ? 'Outfit' : undefined,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    marginBottom: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  skipButton: {
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
  skipButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  doneButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8170FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  // Removed home indicator styles
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20, // Increase this value to move all content further down
    paddingBottom: 24,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', height: 54, marginBottom: 8 },
  bottomButtonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
});

export default CreateAccount;
