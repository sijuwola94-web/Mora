import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';

const PEOPLE = [
  { id: '1', name: 'Alex, 22', city: 'Praia', vibe: 'Morabeza + Beach', img: 'https://i.pravatar.cc/300?img=1', flare: '🔥' },
  { id: '2', name: 'Maya, 20', city: 'Mindelo', vibe: 'Sodade + Dance', img: 'https://i.pravatar.cc/300?img=2', flare: '✨' },
  { id: '3', name: 'Jay, 23', city: 'Plateau', vibe: 'Lume + Music', img: 'https://i.pravatar.cc/300?img=3', flare: '💫' },
  { id: '4', name: 'Sofia, 21', city: 'Quebra Canela', vibe: 'Kriol + Sunset', img: 'https://i.pravatar.cc/300?img=5', flare: '🌊' },
];

export default function App() {
  const [tab, setTab] = useState('discover');
  const [index, setIndex] = useState(0);
  const [friends, setFriends] = useState([]);
  const [snapped, setSnapped] = useState(false);
  const person = PEOPLE[index % PEOPLE.length];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>MORA</Text>
        <Text style={styles.sub}>morabeza • every connection</Text>
      </View>

      {tab === 'discover' && (
        <View style={styles.cardWrap}>
          <View style={styles.flareBadge}><Text>{person.flare} FLARE</Text></View>
          <Image source={{ uri: person.img }} style={styles.cardImg} />
          <View style={styles.cardInfo}>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.city}>{person.city} • {person.vibe}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.skip]} onPress={() => setIndex(index + 1)}>
              <Text style={{fontWeight:'bold'}}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.add]} onPress={() => { setFriends([...friends, person]); setIndex(index + 1); }}>
              <Text style={{ color: 'white', fontWeight: '900' }}>MORA +</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {tab === 'camera' && (
        <View style={styles.cameraWrap}>
          {!snapped ? (
            <>
              <View style={styles.cameraBox}>
                <Text style={{ fontSize: 50 }}>📸</Text>
                <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold' }}>Dual FLARE Camera</Text>
                <Text style={{ color: 'white', opacity: 0.6, fontSize: 12, marginTop: 5 }}>Front + Back at once</Text>
              </View>
              <TouchableOpacity onPress={() => setSnapped(true)} style={styles.shutter} />
              <Text style={{ marginTop: 15, fontWeight: 'bold' }}>Tap to FLARE! ✨</Text>
            </>
          ) : (
            <>
              <Image source={{ uri: 'https://i.pravatar.cc/500?img=12' }} style={styles.snapImg} />
              <Text style={{marginTop: 10, fontWeight: 'bold'}}>Your FLARE is 🔥🔥🔥</Text>
              <View style={{ flexDirection: 'row', gap: 15, marginTop: 15 }}>
                <TouchableOpacity onPress={() => setSnapped(false)} style={styles.blackBtn}><Text style={{ color: 'white' }}>Retake</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { setSnapped(false); setTab('discover'); }} style={styles.yellowBtn}><Text style={{ color: 'black', fontWeight:'bold' }}>Post FLARE!</Text></TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}

      {tab === 'chat' && (
        <View style={{ flex: 1, width: '100%', padding: 15 }}>
          <Text style={{ fontWeight: '900', fontSize: 22 }}>Your MORA ({friends.length})</Text>
          <Text style={{opacity: 0.6, marginBottom: 10}}>Real people, no ghosting</Text>
          <FlatList data={friends} keyExtractor={i => i.id} renderItem={({ item }) => (
            <View style={styles.friendRow}>
              <Image source={{ uri: item.img }} style={styles.friendImg} />
              <View><Text style={{fontWeight:'bold'}}>{item.name}</Text><Text style={{fontSize: 12, opacity: 0.6}}>{item.vibe}</Text></View>
              <View style={styles.onlineDot} />
            </View>
          )} />
          {friends.length === 0 && <Text style
