import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Learnmore from './Learnmore';

const avatarTypes = [
  {
    id: 'happy',
    text: "Pick an image that captures your happiest self 😊",
    emoji: "😊"
  },
  {
    id: 'calm',
    text: "Pick an image that captures your calmest self 😌",
    emoji: "😌"
  },
  {
    id: 'reflective',
    text: "Pick an image that shows your most reflective self 😓",
    emoji: "😓"
  },
  {
    id: 'intense',
    text: "Pick an image that captures your most intense self 😠",
    emoji: "😠"
  }
];

const CreateAvatar1: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedImages, setSelectedImages] = useState<{[key: string]: string | null}>(
    { happy: null, calm: null, reflective: null, intense: null }
  );
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleImageUpload = (type: string) => {
    setShowLearnMore(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 8 }}>
          <Ionicons name="chevron-back" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 15, marginBottom:5, paddingHorizontal: 24 }}>
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
              <TouchableOpacity
                onPress={() => handleImageUpload(type.id)}
                style={styles.imageUploadButton}
                activeOpacity={0.7}
              >
                {selectedImages[type.id] ? (
                  <Image source={{ uri: selectedImages[type.id] || undefined }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.plusCircle}><Ionicons name="add" size={20} color="#fff" /></View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.continueButton}
            disabled={true}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.defaultButton} onPress={() => navigation.navigate('DefaultAvatar')}>
            <Text style={styles.defaultButtonText}>Use default avatar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={showLearnMore} animationType="slide" transparent>
        <Learnmore onDone={() => {
          setShowLearnMore(false);
          navigation.navigate({ name: 'CreateAvathar2', params: undefined });
        }} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 0, paddingBottom: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 10, paddingHorizontal: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 8, fontFamily: 'Outfit' },
  subtitle: { fontSize: 16, color: '#000', marginBottom: 4, fontFamily: 'Outfit' },
  learnMore: { color: '#8170FF', fontSize: 15, textDecorationLine: 'underline', marginTop: 2 },
  avatarList: { marginTop: 16, paddingHorizontal: 20 },
  avatarCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8170FF', borderRadius: 22, backgroundColor: '#fff', padding: 16, marginBottom: 20, borderStyle: 'solid', minHeight: 96 },
  avatarText: { fontSize: 15, color: '#000', fontWeight: '500', textAlign: 'left' },
  imageUploadButton: { width: 80, height: 80, borderWidth: 2, borderStyle: 'dashed', borderColor: '#8170FF', backgroundColor: '#EDEBFA', borderRadius: 16, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  plusCircle: { position: 'absolute', bottom: 6, right: 6, width: 28, height: 28, borderRadius: 14, backgroundColor: '#8170FF', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  avatarImage: { width: 76, height: 76, borderRadius: 14, resizeMode: 'cover' },
  bottomButtons: { marginTop: 20, paddingHorizontal: 20, marginBottom: 4 },
  continueButton: { width: '100%', paddingVertical: 18, backgroundColor: '#888', borderRadius: 35, alignItems: 'center', marginBottom: 18 },
  continueButtonText: { color: '#fff', fontSize: 18, fontWeight: '500' },
  defaultButton: { width: '100%', paddingVertical: 18, borderRadius: 35, alignItems: 'center', backgroundColor: '#fff', marginTop: -19 },
  defaultButtonText: { color: '#8170FF', fontSize: 17, fontWeight: '500'},
});

export default CreateAvatar1;
