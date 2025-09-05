import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  GuardianGrantedScreen: undefined;
  NotGuardianGrantedScreen: undefined;
};

interface Props {
  route: {
    params: {
      guardianEmail: string;
    };
  };
}

const ApprovalStatusChecker: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkCount, setCheckCount] = useState(0);
  const [approved, setApproved] = useState<boolean | null>(null);


  // Check approval on mount and poll every 5 seconds
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    let isMounted = true;
    const checkApproval = async () => {
      setLoading(true);
      try {
  const res = await fetch(`http://192.168.1.2:3001/approval-status?email=${encodeURIComponent(route.params.guardianEmail)}`);
        const data = await res.json();
        if (data.approved) {
          navigation.replace('GuardianGrantedScreen');
          return;
        } else {
          if (isMounted) setApproved(false);
        }
      } catch (e) {
        if (isMounted) setError('Failed to check approval status.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    checkApproval();
    intervalRef.current = setInterval(checkApproval, 5000);
    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [route.params.guardianEmail, navigation]);

  // Handler for Check Again button
  const handleCheckAgain = async () => {
    setLoading(true);
    setError('');
    try {
      setCheckCount((prev) => prev + 1);
  const res = await fetch(`http://192.168.1.2:3001/approval-status?email=${encodeURIComponent(route.params.guardianEmail)}`);
      const data = await res.json();
      console.log('Check Again approval status response:', data);
      if (data.approved) {
        navigation.replace('GuardianGrantedScreen');
        return;
      } else {
        setApproved(false);
        if (checkCount + 1 >= 3) {
          navigation.replace('NotGuardianGrantedScreen');
          return;
        }
      }
    } catch (e) {
      setError('Failed to check approval status.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8170FF" />
        <Text style={{ marginTop: 16 }}>Checking approval status...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }
  // If not approved, show Check Again button and info
  if (approved === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 24 }}>Guardian has not approved yet.</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#8170FF', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 24, marginBottom: 12 }}
          onPress={handleCheckAgain}
          disabled={loading}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Check Again</Text>
        </TouchableOpacity>
        <Text style={{ color: '#898A8D', fontSize: 12 }}>Attempts left: {3 - checkCount}</Text>
      </View>
    );
  }
  return null;
};

export default ApprovalStatusChecker;
