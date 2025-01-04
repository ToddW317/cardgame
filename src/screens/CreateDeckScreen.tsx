import { useState } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ColorPicker from '../components/ColorPicker'

interface DeckDetails {
  name: string
  color: string
}

export function CreateDeckScreen() {
  const navigation = useNavigation()
  const [deckDetails, setDeckDetails] = useState<DeckDetails>({
    name: '',
    color: '#000000'
  })

  function handleNext() {
    if (!deckDetails.name.trim()) {
      // Maybe show an error message
      return
    }
    
    navigation.navigate('DeckBuilder', { 
      deckDetails
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create New Deck</Text>
        
        <TextInput
          placeholder="Deck Name"
          placeholderTextColor="#666"
          value={deckDetails.name}
          onChangeText={(text) => setDeckDetails(prev => ({ ...prev, name: text }))}
          style={styles.input}
        />

        <ColorPicker
          selectedColor={deckDetails.color}
          onColorChange={(color) => setDeckDetails(prev => ({ ...prev, color }))}
        />

        <TouchableOpacity 
          onPress={handleNext}
          style={[
            styles.nextButton,
            !deckDetails.name.trim() && styles.nextButtonDisabled
          ]}
          disabled={!deckDetails.name.trim()}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  content: {
    padding: 16,
    gap: 16
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#333',
    color: '#fff',
    backgroundColor: '#222',
    fontSize: 16
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  nextButtonDisabled: {
    backgroundColor: '#1f5f22',
    opacity: 0.7
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
}) 