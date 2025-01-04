import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Hero } from '../types/game';
import { heroes } from '../data/heroes';

interface HeroSelectorProps {
  selectedHero: Hero | null;
  onHeroSelect: (hero: Hero) => void;
}

export function HeroSelector({ selectedHero, onHeroSelect }: HeroSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Hero</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={heroes}
        renderItem={({ item }) => (
          <Pressable 
            style={[
              styles.heroCard,
              selectedHero?.id === item.id && styles.heroCardSelected
            ]}
            onPress={() => onHeroSelect(item)}
          >
            <View style={styles.heroImagePlaceholder}>
              <Ionicons 
                name="person-circle-outline" 
                size={48} 
                color="#666" 
              />
            </View>
            <Text style={styles.heroName}>{item.name}</Text>
            <Text style={styles.heroAbility}>{item.ability.name}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: '#808080',
    fontSize: 16,
    marginBottom: 12,
  },
  heroCard: {
    width: 120,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  heroCardSelected: {
    borderColor: '#ff4d4d',
    borderWidth: 2,
  },
  heroImagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroAbility: {
    color: '#808080',
    fontSize: 12,
  },
}); 