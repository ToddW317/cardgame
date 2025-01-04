import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function GameScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.locations}>
        {/* Location components will go here */}
      </View>
      <View style={styles.hand}>
        {/* Card components will go here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locations: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  hand: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 