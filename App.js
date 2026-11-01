 import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

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
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState('feed');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [contact, setContact] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    signInAnonymously(auth).catch(e => Alert.alert("Auth error", e.message));
    const unsubAuth = onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubProducts = onSnapshot(q, snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => { unsubAuth(); unsubProducts(); };
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      aspect: [1,1], 
      quality: 0.3,
      base64: true 
    });
    if (!result.canceled) {
      setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const postProduct = async () => {
    if(!title || !price) { Alert.alert("Preenche titulo e preço"); return; }
    if(!imageBase64) { Alert.alert("Escolhe foto primeiro!"); return; }
    setPosting(true);
    try {
      await addDoc(collection(db, "products"), {
        title, price: Number(price), desc, contact, imageUrl: imageBase64, createdAt: serverTimestamp(), uid: user?.uid || "anon"
      });
      setTitle(''); setPrice(''); setDesc(''); setContact(''); setImageBase64(null);
      setTab('feed');
      Alert.alert("🔥 MORA com foto publicado!");
    } catch(e){ Alert.alert("Erro", e.message); }
    setPosting(false);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.productImage} /> : null}
      <View style={styles.cardHeader}>
        <View style={styles.avatar}><Text style={{fontWeight:'900', color:'white'}}>M</Text></View>
        <View><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardTime}>Praia • agora</Text></View>
        <Text style={styles.price}>{item.price} CVE</Text>
      </View>
      {item.desc ? <Text style={styles.desc}>{item.desc}</Text> : null}
      <View style={styles.contactRow}>
        <Text style={styles.contact}>📱 {item.contact || "Contacta"}</Text>
        <TouchableOpacity style={styles.buyBtn}><Text style={{color:'white', fontWeight:'900'}}>Comprar</Text></TouchableOpacity>
      </View>
    </View>
  );

  if(loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF6B35"/><Text style={{marginTop:10, fontWeight:'700'}}>Ligando MORA...</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>MORA</Text>
        <Text style={styles.sub}>MARKET • PRAIA • COM FOTOS FREE</Text>
        <Text style={styles.online}>{products.length} produtos • online</Text>
      </View>

      {tab === 'feed' && (
        <FlatList data={products} keyExtractor={i=>i.id} renderItem={renderProduct} style={{width:'100%', paddingHorizontal:15}} ListEmptyComponent={<Text style={{textAlign:'center', marginTop:50, color:'white', fontWeight:'700'}}>Nenhum produto ainda. Sê o primeiro!</Text>} />
      )}

      {tab === 'sell' && (
        <ScrollView style={{width:'100%', paddingHorizontal:20}} contentContainerStyle={{paddingBottom:100}}>
          <Text style={styles.sellTitle}>Vender com Foto</Text>
          <TouchableOpacity onPress={pickImage} style={styles.photoBtn}>
            {imageBase64 ? <Image source={{uri: imageBase64}} style={{width:'100%', height:200, borderRadius:15}}/> : <Text style={{fontWeight:'900'}}>📸 Escolher Foto (Galeria)</Text>}
          </TouchableOpacity>
          <TextInput placeholder="O que vendes? ex: Tenis Nike" style={styles.input} value={title} onChangeText={setTitle}/>
          <TextInput placeholder="Preço CVE - ex: 5500" style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice}/>
          <TextInput placeholder="Descrição" style={[styles.input, {height:80}]} multiline value={desc} onChangeText={setDesc}/>
          <TextInput placeholder="WhatsApp - ex: 9912345" style={styles.input} keyboardType="phone-pad" value={contact} onChangeText={setContact}/>
          <TouchableOpacity onPress={postProduct} style={styles.postBtn} disabled={posting}>
            {posting ? <ActivityIndicator color="white"/> : <Text style={{color:'white', fontWeight:'900', fontSize:16}}>PUBLICAR COM FOTO • {price ? price+' CVE' : ''}</Text>}
          </TouchableOpacity>
          <Text style={{color:'white', marginTop:10, fontSize:11, opacity:0.8, textAlign:'center'}}>Foto fica salva gratis no Firestore - sem pagar!</Text>
        </ScrollView>
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={()=>setTab('feed')} style={[styles.tab, tab==='feed' && styles.tabActive]}><Text style={{fontWeight: tab==='feed'?'900':'600'}}>🛒 Feed</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setTab('sell')} style={[styles.tab, tab==='sell' && styles.tabActive, {backgroundColor: tab==='sell' ? '#FF6B35' : 'black'}]}><Text style={{fontWeight:'900', color:'white'}}>+ Vender</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF6B35', paddingTop: 50, alignItems: 'center' },
  center: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#FF6B35' },
  header: { alignItems:'center', marginBottom:15, width:'100%' },
  logo: { fontSize: 38, fontWeight:'900', letterSpacing:8, color:'white' },
  sub: { fontSize:11, fontWeight:'700', color:'white', letterSpacing:3, opacity:0.9, marginTop:2 },
  online: { fontSize:12, color:'#FFEB3B', fontWeight:'700', marginTop:6, backgroundColor:'black', paddingHorizontal:10, paddingVertical:3, borderRadius:10 },
  card: { backgroundColor:'white', borderRadius:20, padding:0, marginBottom:12, width:'100%', overflow:'hidden' },
  productImage: { width:'100%', height:240 },
  cardHeader: { flexDirection:'row', alignItems:'center', gap:10, padding:12 },
  avatar: { width:38, height:38, backgroundColor:'black', borderRadius:19, justifyContent:'center', alignItems:'center' },
  cardTitle: { fontWeight:'900', fontSize:16, maxWidth:140 },
  cardTime: { fontSize:11, opacity:0.5, fontWeight:'600' },
  price: { marginLeft:'auto', fontWeight:'900', fontSize:16, backgroundColor:'#FFEB3B', paddingHorizontal:10, paddingVertical:4, borderRadius:12 },
  desc: { paddingHorizontal:12, fontSize:13, lineHeight:18, opacity:0.8 },
  contactRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:12 },
  contact: { fontSize:12, fontWeight:'700' },
  buyBtn: { backgroundColor:'black', paddingHorizontal:18, paddingVertical:8, borderRadius:20 },
  tabBar: { flexDirection:'row', backgroundColor:'white', position:'absolute', bottom:20, borderRadius:30, padding:6, gap:6 },
  tab: { paddingVertical:14, paddingHorizontal:28, borderRadius:25, backgroundColor:'#eee' },
  tabActive: { backgroundColor:'#FFEB3B' },
  sellTitle: { fontSize:22, fontWeight:'900', color:'white', marginBottom:15, marginTop:10 },
  input: { backgroundColor:'white', borderRadius:15, padding:15, marginBottom:10, fontWeight:'600' },
  postBtn: { backgroundColor:'black', padding:18, borderRadius:20, alignItems:'center', marginTop:10 },
  photoBtn: { backgroundColor:'#FFEB3B', borderRadius:15, padding:15, alignItems:'center', marginBottom:10, minHeight:60, justifyContent:'center' }
});