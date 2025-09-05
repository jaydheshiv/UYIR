import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Upload: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isPlaying, setIsPlaying] = useState(false);

  // Example waveform data
  const waveformBars = [
    { h: 16, o: 1 }, { h: 28, o: 1 }, { h: 44, o: 1 }, { h: 36, o: 1 }, { h: 24, o: 1 },
    { h: 20, o: 0.9 }, { h: 16, o: 0.8 }, { h: 24, o: 0.7 }, { h: 36, o: 0.6 }, { h: 44, o: 0.5 },
    { h: 36, o: 0.4 }, { h: 28, o: 0.3 }, { h: 20, o: 0.2 }, { h: 16, o: 0.15 }, { h: 12, o: 0.1 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Upload Recording</Text>
          <Text style={styles.subtitle}>One upload. Infinite memories</Text>
        </View>

        {/* File Info */}
        <View style={styles.fileInfoContainer}>
          <Text style={styles.fileName}>My_Voice.mp3</Text>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={20} color="#B8B8B8" />
          </TouchableOpacity>
        </View>

        {/* Audio Waveform */}
        <View style={styles.waveformWrapper}>
          <View style={styles.waveformsContainer}>
            {waveformBars.map((bar, idx) => (
              <View
                key={idx}
                style={[
                  styles.waveformBar,
                  {
                    height: bar.h,
                    opacity: bar.o,
                    backgroundColor: '#A78BFA',
                    marginHorizontal: 3,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.checkButton}>
            <Ionicons name="checkmark" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#fff" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Preview Message */}
        <View style={styles.speechBubbleContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechBubbleText}>Tab the button to Preview your Audio</Text>
            <View style={styles.speechBubbleTail} />
          </View>
        </View>
      </View>
      {/* Bottom fixed Next button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: {
    position: 'absolute',
    top: 75,      // Adjust this value to move the arrow up/down
    left: 10,     // Adjust this value to move the arrow left/right
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 8,
  },
  header: {
    marginTop: 70,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Outfit' : undefined,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 64,
    fontFamily: Platform.OS === 'ios' ? 'Outfit' : undefined,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  fileName: {
    color: '#000',
    fontSize: 14,
  },
  waveformWrapper: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  waveformsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: width - 48,
    alignSelf: 'center',
  },
  waveformBar: {
    width: 14,
    borderRadius: 7,
    backgroundColor: '#A78BFA',
    marginHorizontal: 3,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 24,
  },
  checkButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  playButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  speechBubbleContainer: {
    alignItems: 'center',
    marginBottom: 140, // Increase to move it up, decrease to move it down
  },
  speechBubble: {
    backgroundColor: '#E0E0E0',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    position: 'relative',
    maxWidth: 280,
    alignItems: 'center',
  },
  speechBubbleText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  speechBubbleTail: {
    position: 'absolute',
    bottom: 43,
    left: '60%',
    marginLeft: -8,
    width: 16,
    height: 8,
    backgroundColor: 'transparent',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E0E0E0',
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 80, // Adjust as needed to match Record screen
    backgroundColor: '#fff',
  },
  nextButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#8170FF',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80, // Lower value moves content up, higher value moves it down
    paddingBottom: 32,
    justifyContent: 'flex-start',
  },
});

export default Upload;
