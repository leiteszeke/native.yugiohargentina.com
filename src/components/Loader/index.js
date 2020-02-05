// Dependencies
import React from 'react';
import { View } from 'react-native';
import { AnimatedSVGPath } from 'react-native-svg-animations';
import { SafeAreaView } from 'react-native-safe-area-context';
// Contexts
import { useLoader } from '#contexts/Loader';

const Loader = () => {
  const { show } = useLoader();

  if (!show) return null;

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
      }}
    >
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <AnimatedSVGPath
          fill="none"
          strokeColor="#000000"
          strokeWidth={4}
          duration={500}
          height={284}
          scale={0.7}
          d="M60.73,242.35l113.58-11.54c1.5-0.15,2.87-0.89,3.82-2.06l0,0c0.66-0.81,0.89-1.88,0.62-2.89v0 c-0.62-2.3,1.12-4.56,3.5-4.56l10.15,0.02c2.58,0.01,4.83,1.75,5.47,4.24l0,0c0.17,0.64,0.65,1.15,1.29,1.34l109.85,33.22 c1.44,0.44,2.99,0.28,4.32-0.43v0c0.94-0.5,1.64-1.36,1.94-2.37L368.08,82.7c0.44-1.44,0.28-2.99-0.43-4.32v0 c-0.5-0.94-1.36-1.64-2.37-1.94L252.81,42.6h0c-2.11,0-3.81-1.71-3.81-3.81V34.4c0-1.5-0.6-2.95-1.66-4.01v0 c-0.75-0.75-1.77-1.17-2.83-1.17H130.33c-1.5,0-2.95,0.6-4.01,1.66v0c-0.75,0.75-1.17,1.77-1.17,2.83v3.86c0,2.91-2.2,5.35-5.1,5.64 l-78.07,7.93c-1.5,0.15-2.87,0.89-3.82,2.06h0c-0.67,0.82-0.99,1.88-0.88,2.94l18.45,181.5c0.15,1.5,0.89,2.87,2.06,3.82h0 C58.61,242.14,59.67,242.46,60.73,242.35z"
        />
      </SafeAreaView>
    </View>
  )
}

export default Loader;
