import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { fireCards } from '../data/fireCards';
import { Card } from '../components/Card';
import type { Card as CardType } from '../types/game';
import { FilterDropdown } from '../components/FilterDropdown';

export function CollectionScreen() {
  const [filters, setFilters] = useState({
    element: 'all',
    cost: 'all',
    sortBy: 'cost' as const,
    sortOrder: 'asc' as const,
    search: '',
    ability: 'All',
    showBackFirst: false
  });

  const filteredAndSortedCards = useMemo(() => {
    let result = fireCards.filter(card => {
      const elementMatch = filters.element === 'all' || card.element === filters.element;
      const costMatch = filters.cost === 'all' || 
        (filters.cost === '5+' ? card.cost >= 5 : card.cost === parseInt(filters.cost));
      const searchMatch = filters.search === '' || 
        card.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        card.ability?.toLowerCase().includes(filters.search.toLowerCase());
      const abilityMatch = filters.ability === 'All' || 
        card.ability?.includes(filters.ability);
      
      return elementMatch && costMatch && searchMatch && abilityMatch;
    });

    return result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'power':
          comparison = a.power - b.power;
          break;
        case 'health':
          comparison = a.health - b.health;
          break;
        case 'cost':
          comparison = a.cost - b.cost;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Collection</Text>
      </View>

      <FilterDropdown 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <View style={styles.cardGrid}>
        <FlatList
          data={filteredAndSortedCards}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Card 
                card={item} 
                size="small"
                showBackFirst={filters.showBackFirst}
              />
            </View>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No cards match your filters</Text>
            </View>
          )}
        />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff4d4d'
  },
  filters: {
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  filterText: {
    color: '#ff4d4d',
    fontSize: 16
  },
  cardGrid: {
    flex: 1,
    padding: 10
  },
  cardWrapper: {
    flex: 1/3,
    padding: 5,
    aspectRatio: 0.7
  },
  filterSection: {
    marginBottom: 15
  },
  filterLabel: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 5
  },
  filterButtons: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    marginRight: 8
  },
  filterButtonActive: {
    backgroundColor: '#ff4d4d'
  },
  filterButtonText: {
    color: '#808080',
    fontSize: 14
  },
  filterButtonTextActive: {
    color: '#ffffff'
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  emptyStateText: {
    color: '#808080',
    fontSize: 16
  }
}); 