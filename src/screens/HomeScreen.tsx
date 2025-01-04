import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Elemental Snap</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Welcome back!</Text>
        {/* We can add daily quests, news, or other content here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff4d4d'
  },
  content: {
    flex: 1,
    padding: 20
  },
  subtitle: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20
  }
}); 