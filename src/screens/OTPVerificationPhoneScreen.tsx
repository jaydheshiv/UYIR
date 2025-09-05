import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OTPVerificationPhoneScreen: React.FC = () => {
  const navigation = useNavigation();
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

  const handleVerify = () => {
    // Verify OTP logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Enter OTP</Text>
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
      <Text style={styles.helperText}>Enter the 4-Digit code we sent to your Mobile Number</Text>
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
    paddingTop: 0,
  },
  backButton: {
    marginTop: 32,
    marginBottom: 16,
    alignSelf: 'flex-start',
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

export default OTPVerificationPhoneScreen;
