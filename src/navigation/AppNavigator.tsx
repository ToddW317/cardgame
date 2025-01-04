import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { GameScreen } from '../screens/GameScreen';
import { DeckBuilderScreen } from '../screens/DeckBuilderScreen';
import { CollectionScreen } from '../screens/CollectionScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#2a2a2a',
            borderTopColor: '#404040',
            paddingBottom: 8,
            paddingTop: 8,
            height: 60
          },
          tabBarActiveTintColor: '#ff4d4d',
          tabBarInactiveTintColor: '#808080'
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name="Play" 
          component={GameScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="game-controller" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name="Decks" 
          component={DeckBuilderScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="albums" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen 
          name="Collection" 
          component={CollectionScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 