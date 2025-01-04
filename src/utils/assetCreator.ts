// This is a temporary file to help generate placeholder assets
import { View, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';

// First, install required packages:
// expo install expo-file-system react-native-view-shot

async function createPlaceholderAssets() {
  const assets = [
    {
      name: 'temp-hero-bg.png',
      style: {
        width: 400,
        height: 800,
        backgroundColor: '#2C3E50',
        // Add some gradient-like blocks for visual interest
        borderWidth: 2,
        borderColor: '#34495E',
      }
    },
    {
      name: 'default-avatar.png',
      style: {
        width: 120,
        height: 120,
        backgroundColor: '#3498DB',
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#2980B9',
      }
    },
    {
      name: 'deck-cover.png',
      style: {
        width: 120,
        height: 160,
        backgroundColor: '#E74C3C',
        borderRadius: 16,
        borderWidth: 4,
        borderColor: '#C0392B',
      }
    },
    {
      name: 'rank-icon.png',
      style: {
        width: 120,
        height: 120,
        backgroundColor: '#F1C40F',
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#F39C12',
      }
    }
  ];

  for (const asset of assets) {
    const viewRef = React.createRef();
    const view = (
      <View
        ref={viewRef}
        style={asset.style}
      />
    );

    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      await FileSystem.copyAsync({
        from: uri,
        to: `${FileSystem.documentDirectory}${asset.name}`
      });

      console.log(`Created ${asset.name}`);
    } catch (error) {
      console.error(`Failed to create ${asset.name}:`, error);
    }
  }
} 