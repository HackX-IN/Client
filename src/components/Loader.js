import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Color } from '../utils';

export function Loader({ isLoading = false}) {
    
    if(!isLoading) return null

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.3)' }]} >
      <ActivityIndicator color={'#0000FF'} size='large' />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      ...StyleSheet.absoluteFill,
      zIndex: 1000,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
})