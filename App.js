 import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // AUTH - PHONE ONLY
  const [user, setUser] = useState(null);
  const [authStep, setAuthStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [realOtp, setRealOtp] = useState('');

  // APP
  const [tab, setTab] = useState('buy');
  const [items, setItems] = useState([
    { id:'1', type:'sell', title:'iPhone 11 64GB', price:'45,000 CVE', name:'Tunde', loc:'Praia', desc:'Clean' },
    { id:'2', type:'exchange', title:'EXCHANGE: Has 50€ Wants Naira', price:'Best Rate', name:'Kola', loc:'Fazenda', desc:'Can meet now' },
  ]);
  const [chats, setChats] = useState({});
  const [activeChat, setActiveChat] = useState(null);
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const sendOtp = () => {
    if(phone.length < 7){ Alert.alert('Enter phone e.g. 9812345'); return; }
    const code = Math.floor(1000 + Math.random()*9000).toString();
    setRealOtp(code);
    Alert.alert(`OTP to +238${phone}`, `DEMO CODE: ${code} - or use 1234`);
    setAuthStep('otp');
  };

  const verifyOtp = () => {
    if(otpInput === realOtp || otpInput === '1234'){
      setUser({ phone, name: `User ${phone.slice(-3)}` });
    } else {
      Alert.alert('Wrong OTP', 'Use 1234 for demo');
    }
  };

  const openChat = (item) => {
    setActiveChat(item);
    if(!chats[item.id]){
      setChats(prev=>({...prev, [item.id]: [{from:'them', text:`Hi! I'm ${item.name}. ${item.desc}`, time:'now'}]}));
    }
  };

  const sendMsg = () => {
    if(!msg.trim() || !activeChat) return;
    setChats(prev=>({...prev, [activeChat.id]: [...(prev[activeChat.id]||[]), {from:'me', text:msg}]}));
    setMsg('');
    setTimeout(()=>{
      setChats(prev=>({...prev, [activeChat.id]: [...prev[activeChat.id], {from:'them', text:'Okay bro, when we meet?'}]}));
    },800);
  };

  const addPost = (type) => {
    if(!title || !price) return;
    const newItem = { id: Date.now().toString(), type, title, price, name:user.name, loc:'Praia', desc:'Chat me!' };
    setItems([newItem, ...items]);
    setTitle(''); setPrice('');
    setTab(type==='exchange' ? 'exchange' : 'buy');
  };

  // LOGIN - PHONE ONLY
  if(!user){
    return (
      <View style={styles.authContainer}>
        <StatusBar style="light" />
        <Text style={styles.logo}>MORA</Text>
        <Text style={styles.sub}>Login with Phone Number</Text>
        
        {authStep==='phone' ? (
          <View style={styles.authBox}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneRow}><Text style={styles.prefix}>+238</Text>
              <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="9812345" style={[styles.input,{flex:1}]}/>
            </View>
            <TouchableOpacity style={styles.authBtn} onPress={sendOtp}>
              <Text style={styles.authBtnText}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.authBox}>
            <Text style={styles.label}>Enter code sent to +238{phone}</Text>
            <TextInput value={otpInput} onChangeText={setOtpInput} keyboardType="number-pad" maxLength={4} placeholder="0000" style={[styles.input,{fontSize:24, textAlign:'center', letterSpacing:10}]}/>
            <TouchableOpacity style={styles.authBtn} onPress={verifyOtp}>
              <Text style={styles.authBtnText}>VERIFY & LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setAuthStep('phone')}><Text style={{color:'#aaa', textAlign:'center', marginTop:10}}>Change Number</Text></TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  if(activeChat){
    const messages = chats[activeChat.id] || [];
    return (
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={()=>setActiveChat(null)}><Text style={styles.back}>← Back</Text></TouchableOpacity>
          <View><Text style={styles.chatName}>{activeChat.name}</Text><Text style={styles.chatSub}>{activeChat.title}</Text></View>
        </View>
        <FlatList data={messages} keyExtractor={(_,i)=>i.toString()} style={{flex:1, padding:10}}
          renderItem={({item})=>(
            <View style={[styles.msgBubble, item.from==='me' ? styles.myMsg : styles.theirMsg]}>
              <Text style={[styles.msgText, item.from==='me' && {color:'#000'}]}>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput value={msg} onChangeText={setMsg} placeholder="Type..." style={styles.chatInput}/>
          <TouchableOpacity style={styles.sendBtn} onPress={sendMsg}><Text style={{fontWeight:'bold'}}>SEND</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15}}>
        <Text style={styles.logoSmall}>MORA</Text>
        <Text style={{color:'#aaa'}}>{user.name} | {user.phone} • Logout</Text>
      </View>

      <View style={styles.tabs}>
        {[{k:'buy',l:'MARKET'},{k:'exchange',l:'EXCHANGE'},{k:'post',l:'+ POST'}].map(t=>(
          <TouchableOpacity key={t.k} onPress={()=>setTab(t.k)} style={[styles.tab, tab===t.k && styles.tabActive]}>
            <Text style={[styles.tabText, tab===t.k && {color:'#000'}]}>{t.l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {(tab==='buy' || tab==='exchange') && (
        <FlatList data={tab==='buy' ? items.filter(i=>i.type!=='exchange') : items.filter(i=>i.type==='exchange')}
          keyExtractor={i=>i.id}
          renderItem={({item})=>(
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.desc}>{item.name} - {item.loc}</Text>
              <TouchableOpacity style={styles.chatBtn} onPress={()=>openChat(item)}>
                <Text style={styles.chatBtnText}>💬 Chat with {item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {tab==='post' && (
        <ScrollView style={{padding:15}}>
          <TextInput value={title} onChangeText={setTitle} placeholder="Title e.g. iPhone for sale or Has 50€" style={styles.input}/>
          <TextInput value={price} onChangeText={setPrice} placeholder="Price" style={styles.input}/>
          <TouchableOpacity style={styles.postBtn} onPress={()=>addPost('sell')}><Text style={styles.postBtnText}>POST FOR SALE</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.postBtn,{backgroundColor:'#00ff88'}]} onPress={()=>addPost('exchange')}><Text style={[styles.postBtnText,{color:'#000'}]}>POST EXCHANGE</Text></TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer:{flex:1, backgroundColor:'#0e0e0e', paddingTop:80, paddingHorizontal:20},
  logo:{color:'#00ff88', fontSize:32, fontWeight:'bold', textAlign:'center'},
  logoSmall:{color:'#00ff88', fontSize:18, fontWeight:'bold'},
  sub:{color:'#777', textAlign:'center', marginBottom:20},
  authBox:{backgroundColor:'#1c1c1c', padding:20, borderRadius:15},
  label:{color:'#fff', marginTop:10, marginBottom:5, fontWeight:'bold'},
  phoneRow:{flexDirection:'row', alignItems:'center', gap:5},
  prefix:{color:'#fff', backgroundColor:'#333', padding:12, borderRadius:8},
  input:{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:10},
  authBtn:{backgroundColor:'#00ff88', padding:15, borderRadius:10, marginTop:10},
  authBtnText:{color:'#000', textAlign:'center', fontWeight:'bold'},
  container:{flex:1, backgroundColor:'#0e0e0e', paddingTop:50},
  tabs:{flexDirection:'row', justifyContent:'space-around', paddingHorizontal:10, marginBottom:10},
  tab:{paddingVertical:10, paddingHorizontal:18, backgroundColor:'#222', borderRadius:20},
  tabActive:{backgroundColor:'#00ff88'},
  tabText:{color:'#fff', fontWeight:'bold', fontSize:12},
  card:{backgroundColor:'#1c1c1c', padding:15, marginHorizontal:10, marginBottom:10, borderRadius:12},
  title:{color:'#fff', fontWeight:'bold', fontSize:16},
  price:{color:'#00ff88', fontWeight:'bold'},
  desc:{color:'#aaa', fontSize:12},
  chatBtn:{backgroundColor:'#fff', padding:12, borderRadius:8, marginTop:10},
  chatBtnText:{color:'#000', textAlign:'center', fontWeight:'bold'},
  chatHeader:{flexDirection:'row', alignItems:'center', padding:15, backgroundColor:'#1c1c1c', gap:15},
  back:{color:'#00ff88', fontWeight:'bold'},
  chatName:{color:'#fff', fontWeight:'bold'},
  chatSub:{color:'#aaa', fontSize:11},
  msgBubble:{maxWidth:'80%', padding:10, borderRadius:12, marginBottom:8},
  myMsg:{backgroundColor:'#00ff88', alignSelf:'flex-end'},
  theirMsg:{backgroundColor:'#222', alignSelf:'flex-start'},
  msgText:{color:'#fff'},
  inputRow:{flexDirection:'row', padding:10, backgroundColor:'#1c1c1c', gap:10},
  chatInput:{flex:1, backgroundColor:'#fff', padding:12, borderRadius:20},
  sendBtn:{backgroundColor:'#00ff88', paddingHorizontal:20, justifyContent:'center', borderRadius:20},
  postBtn:{backgroundColor:'#fff', padding:14, borderRadius:8, marginTop:10},
  postBtnText:{textAlign:'center', fontWeight:'bold'},
});