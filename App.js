import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MORA</Text>
      <Text style={styles.sub}>morabeza • every connection</Text>
      
      <View style={styles.card}>
        <Image source={{uri: 'https://i.pravatar.cc/300?img=5'}} style={styles.img} />
        <Text style={styles.name}>Sofia, 21 • Quebra Canela</Text>
        <Text style={styles.vibe}>Kriol + Sunset 🌊</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>setCount(count+1)}>
          <Text style={styles.btnText}>MORA + ({count})</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Warmer than Snapchat 🔥</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF6B35', alignItems: 'center', paddingTop: 80 },
  logo: { fontSize: 48, fontWeight: '900', color: 'white', letterSpacing: 10 },
  sub: { color: 'white', fontWeight: '700', marginBottom: 30, letterSpacing: 2 },
  card: { backgroundColor: 'white', width: '85%', borderRadius: 25, padding: 15, alignItems: 'center' },
  img: { width: 200, height: 200, borderRadius: 100 },
  name: { fontSize: 20, fontWeight: '900', marginTop: 15 },
  vibe: { opacity: 0.6, marginTop: 5 },
  btn: { backgroundColor: 'black', padding: 15, borderRadius: 30, marginTop: 20, paddingHorizontal: 40 },
  btnText: { color: 'white', fontWeight: '900' },
  footer: { color: 'white', marginTop: 20, fontWeight: 'bold' }
});
