// @ts-ignore
declare var alert: (message?: any) => void;
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  OTPVerificationScreenlogin: { code?: string; email?: string; mobile?: string };
  GrantedScreen: undefined;
};

const OTPVerificationScreenlogin: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { code, email, mobile } = (route.params || {}) as { code?: string; email?: string; mobile?: string };
  const codeArray = code && code.length === 4 ? code.split('') : ['', '', '', ''];
  const [otp, setOtp] = useState<string[]>(codeArray);
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

  const handleResend = async () => {
    try {
      const body = email
        ? { email }
        : { mobile };
      const resendEndpoint = '/auth/login';
      const backendUrl = Platform.OS === 'android'
        ? `http://10.0.2.2:8000${resendEndpoint}`
        : `http://localhost:8000${resendEndpoint}`;
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        alert('OTP resent successfully!');
      } else {
        alert(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail));
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  const handleVerify = async () => {
    const entered = otp.join('');
    if (entered.length !== 4) {
      alert('Please enter the 4-digit code.');
      return;
    }
    try {
      const body = email
        ? { email, otp: entered }
        : { mobile, otp: entered };

      const backendUrl = Platform.OS === 'android'
        ? 'http://10.0.2.2:8000/auth/login/verify'
        : 'http://localhost:8000/auth/login/verify';

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate('GrantedScreen');
      } else {
        alert(data.detail || 'Incorrect code. Please try again.');
      }
    } catch (err) {
      alert('Network error.');
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
            autoFocus={idx === 0 && digit === ''}
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
    paddingTop: 120,
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
    marginTop: 0,
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
    marginBottom: Platform.OS === 'ios' ? 32 : 60,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default OTPVerificationScreenlogin;
