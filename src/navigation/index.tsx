import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { CollectionScreen } from '../screens/CollectionScreen';
import { DecksScreen } from '../screens/DecksScreen';
import { CreateDeckScreen } from '../screens/CreateDeckScreen';
import { DeckBuilderScreen } from '../screens/DeckBuilderScreen';
import { DeckDetailsScreen } from '../screens/DeckDetailsScreen';

// Create the navigators
const Tab = createBottomTabNavigator();
const DeckStack = createNativeStackNavigator<RootStackParamList>();

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
    </DeckStack.Navigator>
  );
}

// Main tab navigator
export function TabNavigator() {
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