import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChaptersScreen from './screens/ChaptersScreen';
import ChapterDetailScreen from './screens/ChapterDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Chapters"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3e50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Chapters" 
          component={ChaptersScreen}
          options={{ title: 'Kitzur Shulchan Aruch' }}
        />
        <Stack.Screen 
          name="ChapterDetail" 
          component={ChapterDetailScreen}
          options={({ route }) => ({ title: `Capitolo ${route.params.chapter.Capitolo}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
