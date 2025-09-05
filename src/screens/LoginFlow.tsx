// @ts-ignore
declare var alert: (message?: any) => void;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  LoginFlow: undefined;
  BasicDetails: undefined;
  Home: undefined;
  OTPVerificationScreen: { code: string; email?: string; mobile?: string };
  OTPVerificationScreenlogin: { code?: string; email?: string; mobile?: string };
};

const LoginFlow: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      let body: any = {};
      if (email) body.email = email;
      if (mobile) body.mobile = mobile.startsWith('+91') ? mobile : `+91${mobile}`;
      if (password) body.password = password;
      if (!email && !mobile) {
        Alert.alert('Validation', 'Please enter email or mobile number.');
        setLoading(false);
        return;
      }
      // Call FastAPI login endpoint (assume /auth/login returns OTP code)
  const response = await fetch('http://10.0.2.2:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        // Navigate to OTPVerificationScreenlogin with code and email/mobile
        navigation.navigate('OTPVerificationScreenlogin', {
          code: data.otp,
          email: email || undefined,
          mobile: mobile ? (mobile.startsWith('+91') ? mobile : `+91${mobile}`) : undefined,
        });
      } else {
        Alert.alert('Error', typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail));
      }
    } catch (err) {
      Alert.alert('Network error', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
  {/* ...removed status bar... */}

  {/* Back button and Login header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 5,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 32, alignItems: 'flex-start', zIndex: 2 }}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', position: 'absolute', left: 0, right: 0 }}>
          <Text style={{ fontSize: 18, fontWeight: '400', color: '#000', textAlign: 'center' }}>Login</Text>
        </View>
      </View>

  <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 24 }} keyboardShouldPersistTaps="handled">
        <Text style={styles.headerTitle}>Create an Uyir account</Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder=""
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
         <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
           <TextInput
             style={[styles.input, { flex: 1, marginBottom: 0, paddingRight: 36 }]}
             value={password}
             onChangeText={setPassword}
             placeholder=""
             secureTextEntry={!showPassword}
           />
           <TouchableOpacity
             onPress={() => setShowPassword((prev: boolean) => !prev)}
             style={{ position: 'absolute', right: 10, height: 48, justifyContent: 'center', alignItems: 'center', width: 28 }}
             hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
           >
             <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#A8A8A8" />
           </TouchableOpacity>
         </View>
        <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 4, marginBottom: 12 }}>
          <Text style={{ color: '#6C5CE7', fontSize: 12 }}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#000' }} />
          <Text style={{ marginHorizontal: 12, color: '#000', fontSize: 16 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#000' }} />
        </View>

        {/* Mobile number */}
        <Text style={styles.label}>Enter Mobile Number</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {/* Flag */}
          <View style={{ width: 48, height: 48, borderWidth: 1, borderColor: '#000', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 8, backgroundColor: '#fff' }}>
            {/* Indian Flag stripes */}
            <View style={{ width: 24, height: 17, borderRadius: 3, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 24, height: 5, backgroundColor: '#FF9933' }} />
              <View style={{ width: 24, height: 5, backgroundColor: '#fff' }} />
              <View style={{ width: 24, height: 5, backgroundColor: '#128807' }} />
              <View style={{ position: 'absolute', top: 6, left: 10, width: 4, height: 4, borderRadius: 2, backgroundColor: '#000088' }} />
            </View>
          </View>
          <Text style={{ fontSize: 16, color: '#A8A8A8', marginRight: 4, alignSelf: 'center' }}>+91</Text>
          <TextInput
            style={{ flex: 1, height: 48, borderWidth: 1, borderColor: '#D6D6D6', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#fff', fontSize: 16 }}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            placeholder=""
          />
        </View>
        <Text style={{ color: '#A8A8A8', fontSize: 12, marginTop: 4, marginBottom: 8 }}>Enter your mobile number we'll send you a OTP</Text>

        {/* Spacer to push buttons down */}
  <View style={{ minHeight: 50 }} />

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.loginButton, { marginTop: 0 }, loading && { opacity: 0.6 }]}
          onPress={handleContinue}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>{loading ? 'Continue...' : 'Continue'}</Text>
        </TouchableOpacity>

        {/* Social login buttons */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="#8170FF" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={22} color="#8170FF" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

  {/* ...removed home indicator... */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000', textAlign: 'left', marginBottom: 24 },
  label: { fontSize: 16, color: '#000', marginBottom: 8, marginTop: 1 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#8170FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  socialButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#8170FF',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 80,
  },
  socialIcon: {
    fontSize: 20,
    color: '#8170FF',
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  socialButtonText: {
    color: '#8170FF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginFlow;
