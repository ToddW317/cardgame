import { View, Text, StyleSheet, Pressable, Animated, TextInput, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface FilterDropdownProps {
  filters: {
    element: string;
    cost: string;
    sortBy: 'power' | 'health' | 'cost' | 'name';
    sortOrder: 'asc' | 'desc';
    search: string;
    ability: string;
    showBackFirst: boolean;
  };
  onFilterChange: (key: string, value: any) => void;
}

const abilityTypes = [
  'All',
  'Haste',
  'Flying',
  'Taunt',
  'Double Strike',
  'Overwhelm',
  'Elusive',
  'Stealth',
  'First Strike'
] as const;

export function FilterDropdown({ filters, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  const sortOptions = [
    { label: 'Power', value: 'power' },
    { label: 'Health', value: 'health' },
    { label: 'Cost', value: 'cost' },
    { label: 'Name', value: 'name' },
  ];

  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], // adjust based on content
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.headerText}>Filters</Text>
        <Ionicons 
          name={isOpen ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color="#ff4d4d" 
        />
      </Pressable>

      <Animated.View style={[styles.content, { maxHeight: dropdownHeight }]}>
        <ScrollView>
          <View style={[styles.section, styles.topSection]}>
            <Text style={styles.sectionTitle}>View Mode</Text>
            <View style={styles.viewModeContainer}>
              <Pressable
                style={[
                  styles.viewModeButton,
                  !filters.showBackFirst && styles.viewModeButtonActive
                ]}
                onPress={() => onFilterChange('showBackFirst', false)}
              >
                <Text style={[
                  styles.viewModeText,
                  !filters.showBackFirst && styles.viewModeTextActive
                ]}>
                  Show Art
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.viewModeButton,
                  filters.showBackFirst && styles.viewModeButtonActive
                ]}
                onPress={() => onFilterChange('showBackFirst', true)}
              >
                <Text style={[
                  styles.viewModeText,
                  filters.showBackFirst && styles.viewModeTextActive
                ]}>
                  Show Abilities
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search</Text>
            <TextInput
              style={styles.searchInput}
              value={filters.search}
              onChangeText={(text) => onFilterChange('search', text)}
              placeholder="Search cards..."
              placeholderTextColor="#666"
              selectionColor="#ff4d4d"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ability</Text>
            <View style={styles.optionsGrid}>
              {abilityTypes.map((ability) => (
                <Pressable
                  key={ability}
                  style={[
                    styles.option,
                    filters.ability === ability && styles.optionActive
                  ]}
                  onPress={() => onFilterChange('ability', ability)}
                >
                  <Text style={[
                    styles.optionText,
                    filters.ability === ability && styles.optionTextActive
                  ]}>
                    {ability}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            <View style={styles.optionsGrid}>
              {sortOptions.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.option,
                    filters.sortBy === option.value && styles.optionActive
                  ]}
                  onPress={() => onFilterChange('sortBy', option.value)}
                >
                  <Text style={[
                    styles.optionText,
                    filters.sortBy === option.value && styles.optionTextActive
                  ]}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort Order</Text>
            <View style={styles.optionsRow}>
              <Pressable
                style={[
                  styles.option,
                  filters.sortOrder === 'asc' && styles.optionActive
                ]}
                onPress={() => onFilterChange('sortOrder', 'asc')}
              >
                <Text style={[
                  styles.optionText,
                  filters.sortOrder === 'asc' && styles.optionTextActive
                ]}>
                  Ascending
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.option,
                  filters.sortOrder === 'desc' && styles.optionActive
                ]}
                onPress={() => onFilterChange('sortOrder', 'desc')}
              >
                <Text style={[
                  styles.optionText,
                  filters.sortOrder === 'desc' && styles.optionTextActive
                ]}>
                  Descending
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  headerText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    overflow: 'hidden'
  },
  section: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#404040'
  },
  sectionTitle: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 10
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    minWidth: 80,
    alignItems: 'center'
  },
  optionActive: {
    backgroundColor: '#ff4d4d'
  },
  optionText: {
    color: '#808080',
    fontSize: 14
  },
  optionTextActive: {
    color: '#ffffff'
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14
  },
  viewModeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  viewModeButtonActive: {
    backgroundColor: '#ff4d4d',
  },
  viewModeText: {
    color: '#808080',
    fontSize: 14,
  },
  viewModeTextActive: {
    color: '#ffffff',
  },
  topSection: {
    borderTopWidth: 0,
  },
}); 