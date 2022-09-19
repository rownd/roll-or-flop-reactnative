import React from 'react';
import { SafeAreaView, Text, View, Button } from 'react-native';
import { RowndProvider } from '@rownd/react-native__native-modules';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';


import Screen2Container from './src/screens/Screen2/Screen2Container';
import HomeContainer from './src/screens/Home/HomeContainer';
import GameContainer from './src/screens/Game/GameContainer';
import LeaderBoardContainer from './src/screens/Leaderboard/LeaderBoardContainer';
import ErrorBoundary from 'react-native-error-boundary';

const Stack = createNativeStackNavigator();

const CustomFallback = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Something happened!</Text>
      <Text>{props.error.toString()}</Text>
      <Button onPress={props.resetError} title={'Try again'} />
    </View>
  );
};

function App() {

  const [loaded] = useFonts({
    VeneerCleanReg: require('./assets/fonts/VeneerCleanReg.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
    <View style={{ flex: 1 }}>
      <RowndProvider
        config={{ appKey: '17331884-13e8-454f-843e-a823111f23d9' }}
      >
        {/* <Main /> */}
         <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeContainer}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Screen2"
                component={Screen2Container}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Leaderboard"
                component={LeaderBoardContainer}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Game"
                component={GameContainer}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
      </RowndProvider>
    </View>
    </ErrorBoundary>
  );
};

export default App;
