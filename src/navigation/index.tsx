import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { CollectionScreen } from '../screens/CollectionScreen';
import { DecksScreen } from '../screens/DecksScreen';
import { CreateDeckScreen } from '../screens/CreateDeckScreen';
import { DeckBuilderScreen } from '../screens/DeckBuilderScreen';
import { DeckDetailsScreen } from '../screens/DeckDetailsScreen';
import { GameScreen } from '../screens/GameScreen';

// First, create a Root Stack that will contain both Tab Navigator and Game Screen
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Move the TabNavigator to its own component
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1a1a1a' },
        tabBarActiveTintColor: '#ff4d4d',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Collection" 
        component={CollectionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Decks" 
        component={DeckStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack navigator for the Decks tab
function DeckStackNavigator() {
  return (
    <DeckStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
          borderBottomWidth: 1,
          borderBottomColor: '#333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerShadowVisible: false,
      }}
    >
      <DeckStack.Screen 
        name="DecksList" 
        component={DecksScreen}
        options={({ route }) => ({
          title: 'My Decks',
          headerLeft: route.params?.hideBackButton ? () => null : undefined
        })}
      />
      <DeckStack.Screen 
        name="CreateDeck" 
        component={CreateDeckScreen}
        options={{ title: 'Create Deck' }}
      />
      <DeckStack.Screen 
        name="DeckBuilder" 
        component={DeckBuilderScreen}
        options={{ 
          title: 'Add Cards',
          headerBackVisible: false,
          headerLeft: () => null,
          gestureEnabled: false
        }}
      />
      <DeckStack.Screen 
        name="DeckDetails" 
        component={DeckDetailsScreen}
        options={{ title: 'Deck Details' }}
      />
      <DeckStack.Screen 
        name="Game" 
        component={GameScreen}
        options={{ 
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false
        }}
      />
    </DeckStack.Navigator>
  );
}

// Export the Root Navigator instead of Tab Navigator
export function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <RootStack.Screen 
        name="Game" 
        component={GameScreen}
        options={{ 
          headerShown: false,
          animation: 'fade',
          gestureEnabled: false
        }}
      />
    </RootStack.Navigator>
  );
} 