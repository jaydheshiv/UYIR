import AccountGranted from '../screens/AccountGranted';
import ApprovalStatusChecker from '../screens/ApprovalStatusChecker';
import Record from '../screens/Record';
import Upload from '../screens/Upload';
import NotGuardianGrantedScreen from '../screens/NotGuardianGrantedScreen';
import GuardianGrantedScreen from '../screens/GuardianGrantedScreen';
import GrantedScreen from '../screens/GrantedScreen';
import CreateAvatar1 from '../screens/CreateAvatar1';
import CreateAccount from '../screens/CreateAccount';
import DefaultAvatar from '../screens/DefaultAvatar';
import AddYourVoice from '../screens/AddYourVoice';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated } from 'react-native';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import Walkthrough1 from '../screens/Walkthrough1';
import Walkthrough2 from '../screens/Walkthrough2';
import Walkthrough3 from '../screens/Walkthrough3';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
// import LoginScreen from '../screens/LoginScreen';
// import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import BasicDetails from '../screens/BasicDetails';
import GuardianConsent from '../screens/GuardianConsent';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import OTPVerificationPhoneScreen from '../screens/OTPVerificationPhoneScreen';

import SignupFlow from '../screens/SignupFlow';


export type RootStackParamList = {
	Splash: undefined;
	Walkthrough1: undefined;
	Walkthrough2: undefined;
	Walkthrough3: undefined;
	OnboardingScreen1: undefined;
	Home: undefined;
	BasicDetails: undefined;
	GuardianConsent: undefined;
		WelcomeBackScreen: undefined;
	CreateAccountScreen: undefined;
	OTPVerificationScreen: undefined;
		OTPVerificationPhoneScreen: undefined;
		SignupFlow: undefined;
	GrantedScreen: undefined;
	GuardianGrantedScreen: undefined;
	NotGuardianGrantedScreen: undefined;
	ApprovalStatusChecker: { guardianEmail: string };
	CreateAvatar1: undefined;
	CreateAccount: undefined;
	AddYourVoice: undefined;
	Record: undefined;
	Upload: undefined;
	AccountGranted: undefined;
	DefaultAvatar: undefined;
		Edit_profile: undefined;
		Profile_page: undefined;
		Profile_status: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const fadeTransition = {
	cardStyleInterpolator: ({ current }: { current: { progress: Animated.AnimatedInterpolation<number> } }) => ({
		cardStyle: {
			opacity: current.progress,
		},
	}),
};


const AppNavigator: React.FC = () => (
	<NavigationContainer>
		<Stack.Navigator
			initialRouteName="Splash"
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}
		>
			<Stack.Screen name="Splash" component={SplashScreen} />
			<Stack.Screen
				name="Walkthrough1"
				component={Walkthrough1}
				options={fadeTransition}
			/>
			<Stack.Screen
				name="Walkthrough2"
				component={Walkthrough2}
				options={fadeTransition}
			/>
			<Stack.Screen
				name="Walkthrough3"
				component={Walkthrough3}
				options={fadeTransition}
			/>
			<Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
			{/* <Stack.Screen name="Login" component={LoginScreen} /> */}
			{/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="BasicDetails" component={BasicDetails} />
			<Stack.Screen name="GuardianConsent" component={GuardianConsent} />
			<Stack.Screen name="CreateAccountScreen" component={require('../screens/CreateAccountScreen').default} />
			<Stack.Screen name="SignupFlow" component={SignupFlow} />
			<Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
			<Stack.Screen name="OTPVerificationPhoneScreen" component={OTPVerificationPhoneScreen} />
			<Stack.Screen name="GrantedScreen" component={GrantedScreen} />
			<Stack.Screen name="CreateAvatar1" component={CreateAvatar1} />
			<Stack.Screen name="CreateAccount" component={CreateAccount} />
			<Stack.Screen name="AddYourVoice" component={AddYourVoice} />
			<Stack.Screen name="Record" component={Record} />
			<Stack.Screen name="Upload" component={Upload} />
			<Stack.Screen name="GuardianGrantedScreen" component={GuardianGrantedScreen} />
			<Stack.Screen name="NotGuardianGrantedScreen" component={NotGuardianGrantedScreen} />
			<Stack.Screen name="ApprovalStatusChecker" component={ApprovalStatusChecker} />
			<Stack.Screen name="AccountGranted" component={AccountGranted} />
			<Stack.Screen name="DefaultAvatar" component={DefaultAvatar} />
		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNavigator;
