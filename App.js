import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';

const PEOPLE = [
  { id: '1', name: 'Alex, 22', city: 'Praia', vibe: 'Morabeza + Beach', img: 'https://i.pravatar.cc/300?img=1', flare: '🔥' },
  { id: '2', name: 'Maya, 20', city: 'Mindelo', vibe: 'Sodade + Dance', img: 'https://i.pravatar.cc/300?img=2', flare: '✨' },
  { id: '3', name: 'Jay, 23', city: 'Plateau', vibe: 'Lume + Music', img: 'https://i.pravatar.cc/300?img=3', flare: '💫' },
];

export default function App() {
  const [tab, setTab] = useState('discover');
  const [index, setIndex] = useState(0);
  const [friends, setFriends] = useState([]);
  const person = PEOPLE[index % PEOPLE.length];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>MORA</Text>
        <Text style={styles.sub}>morabeza • every connection</Text>
      </View>
      {tab === 'discover' && (
        <View style={styles.cardWrap}>
          <Image source={{ uri: person.img }} style={styles.cardImg} />
          <View style={styles.cardInfo}>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.city}>{person.city} • {person.vibe} {person.flare}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.skip]} onPress={() => setIndex(index + 1)}><Text>Skip</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.add]} onPress={() => { setFriends([...friends, person]); setIndex(index + 1); }}><Text style={{color:'white', fontWeight:'900'}}>MORA +</Text></TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setTab('discover')} style={[styles.tab, tab==='discover'&&styles.tabActive]}><Text>Discover</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('chat')} style={[styles.tab, tab==='chat'&&styles.tabActive]}><Text>Moras ({friends.length})</Text></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF6B35', paddingTop: 60, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 15 },
  logo: { fontSize: 42, fontWeight: '900', letterSpacing: 8, color: 'white' },
  sub: { fontSize: 12, fontWeight: '700', color: 'white' },
  cardWrap: { backgroundColor: 'white', width: '90%', borderRadius: 25, overflow: 'hidden' },
  cardImg: { width: '100%', height: 390 },
  cardInfo: { padding: 15 },
  name: { fontSize: 24, fontWeight: '900' },
  city: { fontSize: 14, opacity: 0.6 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 },
  btn: { paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
  skip: { backgroundColor: '#eee' },
  add: { backgroundColor: 'black' },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', position: 'absolute', bottom: 25, borderRadius: 30, padding: 6 },
  tab: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25 },
  tabActive: { backgroundColor: '#FFEB3B' },
});
