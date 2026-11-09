import React from 'react';
import { StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function Tile({ number, color, style, dark = false }) {
  return (
    <View accessible accessibilityLabel={`Ô số ${number}`} style={[styles.tile, { backgroundColor: color }, style]}>
      <Text allowFontScaling={false} style={[styles.number, dark && styles.dark]}>{number}</Text>
    </View>
  );
}

function Layout() {
  const { width, height } = useWindowDimensions();
  const canvasWidth = Math.min(Math.max(width - 28, 0), 432);
  const scale = Math.min(canvasWidth / 432, Math.max(height - 160, 1) / 504);
  const gap = 7 * scale;
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={[styles.canvas, { width: 432 * scale, gap }]}>
        <Tile number={1} color="#2B7DE9" style={{ height: 83 * scale }} />
        <Tile number={2} color="#FA393B" style={{ height: 83 * scale }} />
        <View style={[styles.row, { height: 174 * scale, gap }]}>
          <Tile number={3} color="#FFD51C" dark style={{ width: 105 * scale }} />
          <Tile number={4} color="#29AE68" style={{ width: 105 * scale }} />
          <Tile number={5} color="#7D3CE1" style={{ width: 105 * scale }} />
        </View>
        <Tile number={6} color="#FF7610" style={{ height: 143 * scale }} />
        <Text style={styles.studentInfo}>Nguyễn Hà Trung Nam - BIT240168</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return <SafeAreaProvider><Layout /></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingTop: 12 },
  canvas: { alignSelf: 'flex-start' },
  row: { flexDirection: 'row' },
  tile: { alignItems: 'center', justifyContent: 'center' },
  number: { color: '#FFFFFF', fontSize: 36, fontWeight: '700' },
  dark: { color: '#000000' },
  studentInfo: { width: '100%', marginTop: 8, color: '#000000', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
