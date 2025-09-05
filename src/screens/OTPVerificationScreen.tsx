// @ts-ignore
declare var alert: (message?: any) => void;
import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


type RootStackParamList = {
  OTPVerificationScreen: { code: string };
  GrantedScreen: undefined;
};

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { code } = (route.params || {}) as { code: string; email?: string; mobile?: string };
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);
      if (text && idx < 3) {
        // @ts-ignore
        inputs[idx + 1].current.focus();
      }
      if (!text && idx > 0) {
        // @ts-ignore
        inputs[idx - 1].current.focus();
      }
    }
  };

  const handleResend = () => {
    // Resend OTP logic here
  };

  // --- UPDATED handleVerify ---
  const handleVerify = async () => {
    const entered = otp.join('');
    if (entered.length !== 4) {
  Alert.alert('Please enter the 4-digit code.');
      return;
    }
    try {
      // Get email or mobile from route params
      const email = (route.params as any)?.email;
      const mobile = (route.params as any)?.mobile;
      const body = email
        ? { email, otp: entered }
        : { mobile, otp: entered };

      const response = await fetch('http://10.0.2.2:8000/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate('GrantedScreen');
      } else {
  Alert.alert(data.detail || 'Incorrect code. Please try again.');
      }
    } catch (err) {
  Alert.alert('Network error.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Enter Code</Text>
      <View style={styles.otpRow}>
        {otp.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={inputs[idx]}
            style={styles.otpInput}
            value={digit}
            onChangeText={text => handleChange(text, idx)}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="done"
            autoFocus={idx === 0}
            onFocus={() => {
              const newOtp = [...otp];
              if (!newOtp[idx]) newOtp[idx] = '';
              setOtp(newOtp);
            }}
          />
        ))}
      </View>
      <Text style={styles.helperText}>Enter the 4-Digit code we sent to your Email</Text>
      <View style={{ flex: 1 }} />
      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn't get OTP? </Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 120, // Increased padding to push content down
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 32,
    marginLeft: 0,
    marginTop: 0, // Ensure no negative margin
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    fontSize: 32,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginRight: 16,
  },
  helperText: {
    color: '#A8A8A8',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 0,
    marginLeft: 0,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#000',
    fontSize: 18,
  },
  resendLink: {
    color: '#6C5CE7',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginLeft: 2,
  },
  verifyButton: {
    height: 56,
    backgroundColor: '#8170FF',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 32 : 24,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
