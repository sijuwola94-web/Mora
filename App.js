 import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

export default function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState({});

  const friends = [
    {n:'Little princess', s:'Opened · 5d', c:'👸', r:'🎃'},
    {n:'HAMZA FAREED DAR', s:'Received · 1w', c:'🧔', r:'🎃'},
    {n:'Saheed 😈💫', s:'Opened · 1d', c:'😎', r:'🦇'},
    {n:'Lexez Lekan', s:'Tap to chat', c:'👧🏾', r:'📷'},
    {n:'Sam', s:'Tap to chat', c:'🧔🏽', r:'📷'},
  ];

  if (showCamera) {
    return (
      <View style={styles.camContainer}>
        <View style={styles.cameraFake}>
          <Text style={styles.camText}>📷 MORA CAMERA</Text>
          <Text style={styles.camSub}>Real camera works in APK build</Text>
        </View>
        <TouchableOpacity style={styles.camClose} onPress={()=>setShowCamera(false)}>
          <Text style={styles.camCloseText}>✕ Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (selected) {
    const chatMsgs = messages[selected.n] || [{from:'them', text:'Yo! This is MORA 🔥'}];
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={()=>setSelected(null)}><Text style={styles.back}>←</Text></TouchableOpacity>
          <View style={styles.avatarSmall}><Text>{selected.c}</Text></View>
          <Text style={styles.chatName}>{selected.n}</Text>
        </View>
        <ScrollView style={styles.chatBody}>
          {chatMsgs.map((m,i)=>(
            <View key={i} style={m.from==='me'?styles.me:styles.them}>
              <Text style={styles.msgText}>{m.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputRow}>
          <TextInput value={msg} onChangeText={setMsg} placeholder="Send a chat" placeholderTextColor="#8a6a50" style={styles.input}/>
          <TouchableOpacity onPress={()=>{
            if(!msg) return;
            const newM = [...chatMsgs, {from:'me', text:msg}];
            setMessages({...messages, [selected.n]:newM});
            setMsg('');
          }} style={styles.send}><Text style={styles.sendText}>Send</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.chatTitle}>MORA</Text>
          <View style={styles.addBtn}><Text style={styles.addText}>👤+ 7</Text></View>
        </View>
        <ScrollView>
          {friends.map((u,i)=>(
            <TouchableOpacity key={i} style={styles.row} onPress={()=>setSelected(u)}>
              <View style={styles.avatar}><Text>{u.c}</Text></View>
              <View style={styles.middle}>
                <Text style={styles.name}>{u.n}</Text>
                <Text style={styles.status}>▷ {u.s}</Text>
              </View>
              <Text style={styles.right}>{u.r}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.bottom}>
          <Text style={styles.botIcon}>📍</Text>
          <Text style={styles.botIconActive}>💬</Text>
          <TouchableOpacity onPress={()=>setShowCamera(true)} style={styles.cameraBtn}>
            <Text style={styles.cameraBtnText}>📷</Text>
          </TouchableOpacity>
          <Text style={styles.botIcon}>👥</Text>
          <Text style={styles.botIcon}>▶️</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1, backgroundColor:'#1a0a00'},
  container:{flex:1, backgroundColor:'#231208'},
  topBar:{flexDirection:'row', justifyContent:'space-between', padding:12, paddingTop:30},
  chatTitle:{color:'#FF6B00', fontSize:24, fontWeight:'900'},
  addBtn:{backgroundColor:'#FF6B00', borderRadius:20, paddingHorizontal:8, paddingVertical:4},
  addText:{color:'white', fontWeight:'700', fontSize:12},
  row:{flexDirection:'row', alignItems:'center', padding:12, borderBottomWidth:0.5, borderColor:'#3a2010'},
  avatar:{width:50, height:50, borderRadius:25, backgroundColor:'#3a2010', justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'#FF6B00'},
  avatarSmall:{width:32, height:32, borderRadius:16, backgroundColor:'#3a2010', justifyContent:'center', alignItems:'center', marginLeft:10},
  middle:{flex:1, marginLeft:12},
  name:{color:'white', fontSize:15, fontWeight:'700'},
  status:{color:'#8a6a50', fontSize:12},
  right:{color:'white'},
  bottom:{flexDirection:'row', justifyContent:'space-around', padding:14, backgroundColor:'#1a0a00', alignItems:'center'},
  botIcon:{fontSize:22}, botIconActive:{fontSize:22},
  cameraBtn:{width:64, height:64, borderRadius:32, backgroundColor:'#FF6B00', justifyContent:'center', alignItems:'center', marginTop:-20},
  cameraBtnText:{fontSize:28},
  camContainer:{flex:1, backgroundColor:'black'},
  cameraFake:{flex:1, justifyContent:'center', alignItems:'center'},
  camText:{color:'#FF6B00', fontSize:28, fontWeight:'900'},
  camSub:{color:'white', marginTop:10},
  camClose:{position:'absolute', top:50, left:20, backgroundColor:'#FF6B00', padding:10, borderRadius:20},
  camCloseText:{color:'white', fontWeight:'700'},
  chatHeader:{flexDirection:'row', alignItems:'center', padding:12, backgroundColor:'#231208', borderBottomWidth:1, borderColor:'#3a2010'},
  back:{color:'white', fontSize:24, paddingRight:10},
  chatName:{color:'white', fontSize:16, fontWeight:'700', marginLeft:10},
  chatBody:{flex:1, padding:10, backgroundColor:'#1a0a00'},
  me:{alignSelf:'flex-end', backgroundColor:'#FF6B00', borderRadius:15, padding:10, margin:5, maxWidth:'80%'},
  them:{alignSelf:'flex-start', backgroundColor:'#3a2010', borderRadius:15, padding:10, margin:5, maxWidth:'80%'},
  msgText:{color:'white'},
  inputRow:{flexDirection:'row', padding:10, backgroundColor:'#231208', alignItems:'center'},
  input:{flex:1, backgroundColor:'#1a0a00', color:'white', borderRadius:20, paddingHorizontal:15, paddingVertical:10, borderWidth:1, borderColor:'#3a2010'},
  send:{backgroundColor:'#FF6B00', borderRadius:20, paddingHorizontal:18, paddingVertical:10, marginLeft:8},
  sendText:{color:'white', fontWeight:'700'}
});