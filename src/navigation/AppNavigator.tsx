import AccountGranted from '../screens/AccountGranted';
import ApprovalStatusChecker from '../screens/ApprovalStatusChecker';
import NotGuardianGrantedScreen from '../screens/NotGuardianGrantedScreen';
import GuardianGrantedScreen from '../screens/GuardianGrantedScreen';
import GrantedScreen from '../screens/GrantedScreen';
import CreateAvatar1 from '../screens/CreateAvatar1';
import CreateAccount from '../screens/CreateAccount';
import DefaultAvatar from '../screens/DefaultAvatar';
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
import OTPVerificationScreenlogin from '../screens/OTPVerificationScreenlogin';


export type RootStackParamList = {
   Splash: undefined;
   Walkthrough1: undefined;
   Walkthrough2: undefined;
   Walkthrough3: undefined;
   OnboardingScreen1: undefined;
   LoginFlow: undefined;
   Home: undefined;
   BasicDetails: undefined;
   GuardianConsent: undefined;
	OTPVerificationScreen: { code: string; email?: string; mobile?: string };
	OTPVerificationScreenlogin: { code?: string; email?: string; mobile?: string };
	OTPVerificationPhoneScreen: { code: string; mobile?: string };
   SignupFlow: undefined;
   GrantedScreen: undefined;
   GuardianGrantedScreen: undefined;
   NotGuardianGrantedScreen: undefined;
   ApprovalStatusChecker: { guardianEmail: string };
   CreateAvatar1: undefined;
	CreateAccount: undefined;
	CreateAvathar2: undefined;
   AddYourVoice: undefined;
   AccountGranted: undefined;
	DefaultAvatar: undefined;
	Learnmore: undefined;
	   
};

const Stack = createStackNavigator<RootStackParamList>();

const fadeTransition = {
	cardStyleInterpolator: ({ current }: { current: { progress: Animated.AnimatedInterpolation<number> } }) => ({
		cardStyle: {
			opacity: current.progress,
		},
	}),
};



import LoginFlow from '../screens/LoginFlow';

import CreateAvathar2 from '../screens/CreateAvathar2';

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
			<Stack.Screen name="LoginFlow" component={LoginFlow} />
			{/* <Stack.Screen name="Login" component={LoginScreen} /> */}
			{/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="BasicDetails" component={BasicDetails} />
			<Stack.Screen name="GuardianConsent" component={GuardianConsent} />
			<Stack.Screen name="SignupFlow" component={SignupFlow} />
			<Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
			<Stack.Screen name="OTPVerificationPhoneScreen" component={OTPVerificationPhoneScreen} />
			<Stack.Screen name="OTPVerificationScreenlogin" component={OTPVerificationScreenlogin} />
			<Stack.Screen name="GrantedScreen" component={GrantedScreen} />
			<Stack.Screen name="CreateAvatar1" component={CreateAvatar1} />
			 <Stack.Screen name="CreateAccount" component={CreateAccount} />
			 <Stack.Screen name="CreateAvathar2" component={CreateAvathar2} />
			<Stack.Screen name="GuardianGrantedScreen" component={GuardianGrantedScreen} />
			<Stack.Screen name="NotGuardianGrantedScreen" component={NotGuardianGrantedScreen} />
			<Stack.Screen name="ApprovalStatusChecker" component={ApprovalStatusChecker} />
			<Stack.Screen name="AccountGranted" component={AccountGranted} />
			<Stack.Screen name="DefaultAvatar" component={DefaultAvatar} />
			<Stack.Screen name="Learnmore" component={require('../screens/Learnmore').default} />

		</Stack.Navigator>
	</NavigationContainer>
);

export default AppNavigator;
