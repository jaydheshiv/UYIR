import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  CreateAccount: undefined;
  // ...other screens if needed
};
const Record: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('0:35');

  // Generate random waveform bars
  const waveformBars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: Math.random() * 24 + 16, // 16-40px
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      {/* Main Content */}
      <View style={styles.content}>
        {/* Greeting text */}
        <View style={styles.greetingContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
            <Text style={styles.greetingHi}>Hi</Text>
            <Text style={styles.greetingName}>I'm Ravi</Text>
          </View>
          <Text style={styles.greetingLove}>I love</Text>
        </View>
        {/* Microphone button */}
        <View style={styles.micContainer}>
          <TouchableOpacity
            onPress={() => setIsRecording(!isRecording)}
            style={styles.micButton}
            activeOpacity={0.8}
          >
            <View style={styles.micOuter} />
            <View style={styles.micMiddle} />
            <View style={styles.micInner} />
            <Ionicons name="mic" size={64} color="#fff" style={styles.micIcon} />
          </TouchableOpacity>
        </View>
        {/* Recording message */}
        <View style={styles.recordingMsgContainer}>
          <View style={styles.recordingMsgBubble}>
            <Text style={styles.recordingMsgText}>Tap the button to start Recording</Text>
          </View>
        </View>
        {/* Audio controls */}
        <View style={styles.audioControls}>
          {/* Play button */}
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={24} color="#000" />
          </TouchableOpacity>
          {/* Waveform */}
          <View style={styles.waveformContainer}>
            {waveformBars.map((bar, index) => (
              <View
                key={bar.id}
                style={[
                  styles.waveformBar,
                  {
                    height: bar.height,
                    opacity: index < 8 ? 1 : 0.6,
                  },
                ]}
              />
            ))}
          </View>
          {/* Time */}
          <Text style={styles.timeText}>{recordingTime}</Text>
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
    top: 60,
    left: 24,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 180,
    paddingBottom: 32,
    justifyContent: 'flex-start',
  },
  greetingContainer: { marginBottom: 32 },
  greetingHi: {
    color: '#8170FF',
    fontSize: 56,
    fontWeight: 'bold',
    marginRight: 8,
  },
  greetingName: {
    color: '#E5E7EB',
    fontSize: 56,
    fontWeight: 'bold',
  },
  greetingLove: {
    color: '#E5E7EB',
    fontSize: 56,
    fontWeight: 'bold',
  },
  micContainer: { alignItems: 'center', marginBottom: 32 },
  micButton: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  micOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#8170FF',
    opacity: 1,
  },
  micMiddle: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 208,
    height: 208,
    borderRadius: 104,
    backgroundColor: '#C4B5FD',
    opacity: 1,
  },
  micInner: {
    position: 'absolute',
    top: 48,
    left: 48,
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: '#EDE9FE',
    opacity: 1,
  },
  micIcon: { zIndex: 10 },
  recordingMsgContainer: { alignItems: 'center', marginBottom: 32 },
  recordingMsgBubble: {
    backgroundColor: '#E5E7EB',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    position: 'relative',
  },
  recordingMsgText: { color: '#000', fontSize: 14, textAlign: 'center' },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  playButton: {
    width: 48,
    height: 48,
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: 40,
  },
  waveformBar: {
    width: 4,
    backgroundColor: '#8170FF',
    borderRadius: 2,
  },
  timeText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    width: 32,
    textAlign: 'right',
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#8170FF',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
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
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 80, // Increase this value to move the button higher above the bottom
    backgroundColor: '#fff',
  },
});

export default Record;
