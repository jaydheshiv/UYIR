// @ts-ignore
declare var alert: (message?: any) => void;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Splash: undefined;
  Walkthrough1: undefined;
  Walkthrough2: undefined;
  Walkthrough3: undefined;
  OnboardingScreen1: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  BasicDetails: undefined;
  GuardianConsent: undefined;
  WelcomeBackScreen: undefined;
  ApprovalStatusChecker: { guardianEmail: string };
};

type GuardianConsentNavigationProp = StackNavigationProp<RootStackParamList, 'GuardianConsent'>;

// Arrow Left Icon Component
const ArrowLeftIcon = () => (
  <Text style={styles.backArrow}>←</Text>
);

// Chevron Down Icon Component
const ChevronDownIcon = () => (
  <Text style={styles.chevronDown}>⌄</Text>
);

const GuardianConsent: React.FC = () => {
  const navigation = useNavigation<GuardianConsentNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [relation, setRelation] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const relationOptions = ['Parent', 'Guardian', 'Siblings'];

  const validateEmail = (email: string) => {
    // Simple email regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSendConsentForm = async () => {
    setError('');
    if (!fullName.trim()) {
      setError("Please enter the guardian's full name.");
      return;
    }
    if (!contact.trim()) {
      setError("Please enter the guardian's email.");
      return;
    }
    if (!validateEmail(contact.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!relation) {
      setError('Please select the relation.');
      return;
    }
  setLoading(true);
  console.log('Email entered in app:', contact);
  const consent_link = `http://192.168.1.2:3001/consent-approval.html?email=${encodeURIComponent(contact)}`;
  console.log('Consent link sent in email:', consent_link);
    try {
  const response = await fetch('http://192.168.1.2:3001/send-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contact,
          name: fullName || 'Guardian',
          consent_link,
        }),
      });
      if (response.ok) {
        setLoading(false);
        alert('Consent email sent to guardian!');
  console.log('Navigating to ApprovalStatusChecker with email:', contact);
  navigation.navigate('ApprovalStatusChecker', { guardianEmail: contact });
      } else {
        setLoading(false);
        setError('Failed to send email. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to send email. Please check your connection and try again.');
      console.error('Backend error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Back Arrow */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>

          {/* Title and Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Guardian Consent</Text>
            <Text style={styles.subtitle}>Parental Consent Required to Continue</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            {/* Guardian's Full Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Guardian's Full Name</Text>
              <TextInput
                style={[
                  styles.input,
                  fullName !== '' ? styles.inputFilled : styles.inputEmpty
                ]}
                value={fullName}
                onChangeText={setFullName}
                placeholder=""
                autoCapitalize="words"
              />
            </View>

            {/* Guardian's Phone Number/Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Guardian's Phone Number/Email</Text>
              <TextInput
                style={[styles.input, styles.inputFilled]}
                value={contact}
                onChangeText={setContact}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Relation Dropdown */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Relation</Text>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    relation !== '' ? styles.inputFilled : styles.inputEmpty
                  ]}
                  onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Text style={[
                    styles.dropdownText,
                    relation ? styles.dropdownTextFilled : styles.dropdownTextEmpty
                  ]}>
                    {relation || 'Relation'}
                  </Text>
                  <ChevronDownIcon />
                </TouchableOpacity>

                {isDropdownOpen && (
                  <View style={styles.dropdownMenu}>
                    {relationOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setRelation(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <View style={styles.radioButton} />
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Disclaimer Text */}
        <Text style={styles.disclaimerText}>
          Because you're under 18, we need your guardian's approval to create your personal avatar and continue using{' '}
          <Text style={styles.appName}>Uyir</Text> responsibly.
        </Text>

        {/* Error Message */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {/* Send Consent Form Button */}
        <TouchableOpacity
          style={[styles.sendButton, loading && { opacity: 0.6 }]}
          onPress={handleSendConsentForm}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>
            {loading ? 'Sending...' : 'Send Consent Form'}
          </Text>
        </TouchableOpacity>

        {/* Home Indicator */}
        <View style={styles.homeIndicator}>
          <View style={styles.homeIndicatorBar} />
        </View>
  </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  backButton: {
    marginBottom: 24,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#000',
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#898A8D',
  },
  formSection: {
    marginBottom: 40,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
    fontWeight: '400',
  },
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  inputEmpty: {
    borderColor: '#D6D6D6',
  },
  inputFilled: {
    borderColor: '#8170FF',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
  },
  dropdownTextEmpty: {
    color: '#CCC',
  },
  dropdownTextFilled: {
    color: '#000',
  },
  chevronDown: {
    fontSize: 20,
    color: '#8170FF',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#121212',
    borderRadius: 8,
    padding: 16,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#121212',
    borderRadius: 8,
    marginBottom: 8,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#121212',
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#121212',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#898A8D',
    lineHeight: 16,
    marginBottom: 24,
  },
  appName: {
    fontSize: 14,
    fontWeight: '500',
  },
  sendButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#8170FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  homeIndicator: {
    alignItems: 'center',
  },
  homeIndicatorBar: {
    width: 139,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 2.5,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default GuardianConsent;
