import 'react-native-gesture-handler'
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular,Inter_500Medium } from '@expo-google-fonts/inter';
import  Widget from './components/Widget';
import { theme } from './theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    enabled
  >
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>

      <StatusBar style="light" backgroundColor='transparent'/>
      <Widget />
    </View>
    </KeyboardAvoidingView>
  );
}
