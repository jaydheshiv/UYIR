import React, { useState } from 'react';
// @ts-ignore
declare var alert: (message?: any) => void;
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  CreateAccountScreen: undefined;
  WelcomeBackScreen: undefined;
  OTPVerificationScreen: { code: string; email?: string; mobile?: string };
  GrantedScreen: undefined;
};

const CreateAccountScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email && !phone) {
      alert('Please enter email or phone number.');
      return;
    }
    setLoading(true);
    try {
      // Build the request body: only include fields that are filled
      const body: any = {
        consent: {
          cloud_sync: true,
          follow: true,
          family_sharing: true
        }
      };
      if (email) body.email = email;
      if (phone) body.mobile = phone.startsWith('+91') ? phone : `+91${phone}`;

      const response = await fetch('http://10.0.2.2:8000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        // Show only a success message, not the OTP
        alert('Verification code sent successfully!');
        if (email) {
          navigation.navigate('OTPVerificationScreen', { code: data.otp, email });
        } else if (phone) {
          navigation.navigate('OTPVerificationScreen', { code: data.otp, mobile: phone.startsWith('+91') ? phone : `+91${phone}` });
        }
      } else {
        alert(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail));
      }
    } catch (err) {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      {/* Main Content */}
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Title */}
          <Text style={styles.title}>Create account</Text>
          {/* Email Section */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder=""
          />
          {/* Divider with "or" */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>
          {/* Mobile Number Section */}
          <Text style={styles.label}>Enter Mobile Number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.flagBox}>
              {/* Indian Flag */}
              <View style={styles.flagContainer}>
                <View style={[styles.flagStripe, { backgroundColor: '#FF9933' }]} />
                <View style={[styles.flagStripe, { backgroundColor: '#fff' }]} />
                <View style={[styles.flagStripe, { backgroundColor: '#128807' }]} />
                <View style={styles.flagCircle} />
              </View>
            </View>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 4, borderColor: '#D6D6D6' }]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder=""
            />
          </View>
        </ScrollView>
      </View>
      {/* Already have account text at the bottom */}
      <View style={styles.accountRowFixed}>
        <Text style={styles.accountText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('WelcomeBackScreen')}>
          <Text style={styles.loginLink}>Log in</Text>
        </TouchableOpacity>
      </View>
      {/* Send Verification Code Button at the bottom */}
      <TouchableOpacity
        style={[styles.sendButtonFixed, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={handleSignup}
      >
        <Text style={styles.sendButtonText}>{loading ? 'Sending...' : 'Send Verification Code'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    backgroundColor: 'transparent',
    padding: 8,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 100, // Adjust this value to bring content further down
  },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 24, marginTop: 8 },
  label: { fontSize: 16, color: '#000', marginBottom: 8, marginTop: 12 },
  input: { height: 48, borderWidth: 1, borderColor: '#D6D6D6', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#fff', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  divider: { flex: 1, height: 1, backgroundColor: '#000' },
  orText: { marginHorizontal: 12, color: '#000', fontSize: 16 },
  phoneRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  flagBox: { width: 48, height: 48, borderWidth: 1, borderColor: '#000', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 4 },
  countryCode: { fontSize: 16, color: '#A8A8A8', marginRight: 4, alignSelf: 'center' },
  flagContainer: { width: 24, height: 17, borderRadius: 3, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  flagStripe: { width: 24, height: 5 },
  flagCircle: { position: 'absolute', top: 6, left: 10, width: 4, height: 4, borderRadius: 2, backgroundColor: '#000088' },
  accountRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  accountRowFixed: {
    position: 'absolute',
    left: 2,
    right: 2,
    bottom: Platform.OS === 'ios' ? 90 : 105, // just above the button
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  accountText: { color: '#000', fontSize: 16 },
  loginLink: { color: '#8170FF', fontSize: 16, textDecorationLine: 'underline' },
  sendButtonFixed: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'ios' ? 70 : 50,
    height: 48, // Reduced height
    backgroundColor: '#8170FF',
    borderRadius: 24, // Reduced radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' }, // Slightly smaller text
});

export default CreateAccountScreen;
