import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native'

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEEAD', // Yellow
  '#D4A5A5', // Pink
  '#9B59B6', // Purple
  '#E67E22', // Orange
]

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Deck Color</Text>
      <View style={styles.colorsGrid}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => onColorChange(color)}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor,
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#fff',
    transform: [{ scale: 1.1 }],
  },
}) 