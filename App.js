import React, { useEffect, useState } from 'react';
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const MSSV_PATTERN = /^B[A-Za-z]{2}2[2-6][0-9]{4}$/;

function Tile({ number, color, style }) {
  return <View style={[styles.tile, { backgroundColor: color }, style]}><Text allowFontScaling={false} style={[styles.number, number === 3 && { color: '#000' }]}>{number}</Text></View>;
}

function ColorLayout() {
  const { width } = useWindowDimensions();
  const scale = Math.min(Math.max(width - 28, 1), 432) / 432;
  return (
    <View style={{ width: 432 * scale, gap: 7 * scale }}>
      <Tile number={1} color="#2B7DE9" style={{ height: 83 * scale }} />
      <Tile number={2} color="#FA393B" style={{ height: 83 * scale }} />
      <View style={{ flexDirection: 'row', height: 174 * scale, gap: 7 * scale }}>
        <Tile number={3} color="#FFD51C" style={{ width: 105 * scale }} />
        <Tile number={4} color="#29AE68" style={{ width: 105 * scale }} />
        <Tile number={5} color="#7D3CE1" style={{ width: 105 * scale }} />
      </View>
      <Tile number={6} color="#FF7610" style={{ height: 143 * scale }} />
      <Text style={styles.studentInfo}>Nguyễn Hà Trung Nam - BIT240168</Text>
    </View>
  );
}

function Screen2({ data, onBack }) {
  return (
    <View style={styles.screenTwo}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Quay về Screen 1" style={styles.back}>
        <Text style={styles.arrow}>←</Text>
      </Pressable>
      <Text style={styles.title}>Screen 2</Text>
      <Text style={styles.label}>UserName</Text>
      <Text selectable style={styles.value}>{data.userName}</Text>
      <Text style={styles.label}>MSSV</Text>
      <Text selectable style={styles.value}>{data.mssv}</Text>
    </View>
  );
}

function Application() {
  const [userName, setUserName] = useState('');
  const [mssv, setMssv] = useState('');
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (data) { setData(null); return true; }
      return false;
    });
    return () => subscription.remove();
  }, [data]);

  function submit() {
    const name = userName.trim();
    const studentId = mssv.trim();
    const nextErrors = {};
    if (!name) nextErrors.userName = 'UserName không được để trống.';
    if (!studentId) nextErrors.mssv = 'MSSV không được để trống.';
    else if (!MSSV_PATTERN.test(studentId)) nextErrors.mssv = 'MSSV phải gồm B + 2 chữ cái + năm 22–26 + 4 chữ số. Ví dụ: BIT240168.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    Keyboard.dismiss();
    setData({ userName: name, mssv: studentId });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {data ? <Screen2 data={data} onBack={() => setData(null)} /> : (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.flex} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Screen 1</Text>
            <ColorLayout />
            <View style={styles.form}>
              <Text style={styles.label}>UserName</Text>
              <TextInput accessibilityLabel="UserName" value={userName} onChangeText={text => { setUserName(text); setErrors(current => ({ ...current, userName: undefined })); }} placeholder="Nhập họ và tên" placeholderTextColor="#666" style={[styles.input, errors.userName && styles.invalid]} autoCorrect={false} returnKeyType="next" />
              {errors.userName ? <Text accessibilityLiveRegion="polite" style={styles.error}>{errors.userName}</Text> : null}
              <Text style={styles.label}>MSSV</Text>
              <TextInput accessibilityLabel="MSSV" value={mssv} onChangeText={text => { setMssv(text); setErrors(current => ({ ...current, mssv: undefined })); }} placeholder="Ví dụ: BIT240168" placeholderTextColor="#666" style={[styles.input, errors.mssv && styles.invalid]} autoCapitalize="none" autoCorrect={false} returnKeyType="go" onSubmitEditing={submit} />
              {errors.mssv ? <Text accessibilityLiveRegion="polite" style={styles.error}>{errors.mssv}</Text> : null}
              <Text style={styles.hint}>B + 2 chữ cái (hoa/thường) + năm 22–26 + 4 chữ số.</Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Pressable accessibilityRole="button" onPress={submit} style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}><Text style={styles.buttonText}>Click me</Text></Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return <SafeAreaProvider><Application /></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 14, paddingBottom: 24 },
  tile: { alignItems: 'center', justifyContent: 'center' },
  number: { color: '#FFFFFF', fontSize: 36, fontWeight: '700' },
  studentInfo: { marginTop: 8, color: '#000000', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#111', marginBottom: 16 },
  form: { marginTop: 24, width: '100%', maxWidth: 432 },
  label: { fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#777', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, color: '#111', backgroundColor: '#FFF' },
  invalid: { borderColor: '#B00020' },
  error: { color: '#B00020', fontSize: 14, marginTop: 6 },
  hint: { color: '#555', fontSize: 13, marginTop: 8 },
  footer: { alignItems: 'center', padding: 14, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
  button: { backgroundColor: '#1769CC', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 36, minHeight: 48 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  screenTwo: { flex: 1, padding: 14 },
  back: { alignSelf: 'flex-start', minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  arrow: { color: '#000', fontSize: 32 },
  value: { color: '#111', fontSize: 20, marginBottom: 16 },
});
