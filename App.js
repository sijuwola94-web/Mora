 import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD2mdL9guxMrvejqfxcsVrSbpzvSjd8lgk",
  authDomain: "mora-market-praia.firebaseapp.com",
  projectId: "mora-market-praia",
  storageBucket: "mora-market-praia.firebasestorage.app",
  messagingSenderId: "575355290150",
  appId: "1:575355290150:web:4a20d0c6b44719f0155ce7",
  measurementId: "G-QRSPWDV9XM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [showPost, setShowPost] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    signInAnonymously(auth).catch(()=>{});
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const postProduct = async () => {
    if (!name || !price || !phone) return Alert.alert("Fill name, price, phone");
    try {
      await addDoc(collection(db, "products"), {
        name, price: Number(price), phone, desc, createdAt: serverTimestamp()
      });
      setName(''); setPrice(''); setPhone(''); setDesc(''); setShowPost(false);
      Alert.alert("Posted! ✅ Everyone in Praia sees it now");
    } catch(e){ Alert.alert("Error", e.message); }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MORA</Text>
      <Text style={styles.sub}>Praia Market • Live</Text>
      <TextInput style={styles.search} placeholder="Search in Praia..." value={search} onChangeText={setSearch} />
      
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        ListEmptyComponent={<Text style={{textAlign:'center', marginTop:50, color:'#888'}}>No products yet. Be first to sell! 👇</Text>}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.imgPlace}><Text style={{fontSize:30}}>🛍️</Text></View>
            <Text style={styles.pName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.pPrice}>{item.price} CVE</Text>
            <Text style={styles.pLoc} numberOfLines={1}>{item.desc}</Text>
            <TouchableOpacity style={styles.chatBtn} onPress={()=>Alert.alert("Contact Seller", `WhatsApp: ${item.phone}\n\nCopy number and chat in WhatsApp`)}><Text style={{color:'white', fontWeight:'bold', fontSize:12}}>Chat Seller</Text></TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={()=>setShowPost(true)}><Text style={styles.fabText}>+ Sell</Text></TouchableOpacity>

      <Modal visible={showPost} animationType="slide">
        <ScrollView style={{padding:20, marginTop:40}}>
          <Text style={{fontSize:24, fontWeight:'900', marginBottom:20}}>Sell in MORA</Text>
          <TextInput style={styles.input} placeholder="What are you selling? e.g iPhone 13" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Price in CVE e.g 25000" keyboardType="numeric" value={price} onChangeText={setPrice} />
          <TextInput style={styles.input} placeholder="Your WhatsApp number e.g 9912345" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          <TextInput style={[styles.input, {height:80}]} placeholder="Location + details (e.g Fazenda, like new)" multiline value={desc} onChangeText={setDesc} />
          <TouchableOpacity style={styles.postBtn} onPress={postProduct}><Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>POST NOW</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>setShowPost(false)} style={{marginTop:20}}><Text style={{textAlign:'center', color:'#666'}}>Cancel</Text></TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#fff', paddingTop:50, paddingHorizontal:12},
  logo:{fontSize:32, fontWeight:'900', letterSpacing:5, textAlign:'center'},
  sub:{textAlign:'center', color:'#666', marginBottom:15, fontSize:12},
  search:{backgroundColor:'#f0f0f0', borderRadius:10, padding:12, marginBottom:12},
  card:{flex:1, backgroundColor:'#fff', borderWidth:1, borderColor:'#eee', borderRadius:12, padding:10, margin:5},
  imgPlace:{height:90, backgroundColor:'#f8f8f8', borderRadius:10, justifyContent:'center', alignItems:'center'},
  pName:{fontWeight:'bold', marginTop:8, fontSize:13},
  pPrice:{color:'#0a0', fontWeight:'bold', marginVertical:3},
  pLoc:{fontSize:10, color:'#888'},
  chatBtn:{backgroundColor:'#000', padding:8, borderRadius:8, marginTop:6, alignItems:'center'},
  fab:{position:'absolute', bottom:25, right:20, backgroundColor:'#000', paddingHorizontal:22, paddingVertical:14, borderRadius:30, elevation:5},
  fabText:{color:'#fff', fontWeight:'bold', fontSize:16},
  input:{borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:12, marginBottom:12},
  postBtn:{backgroundColor:'#000', padding:15, borderRadius:10, marginTop:10}
});